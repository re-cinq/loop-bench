// What an agent said last, and the LORE_NODE_RESULT line that decides its outcome. Ported from lore's agent-output.ts and node-result-line.ts.
import { z } from "zod";
import type { Harness } from "./harness-names.js";

export const OutcomeSchema = z.enum(["success", "changes_requested", "failed"]);
export type Outcome = z.infer<typeof OutcomeSchema>;

export interface NodeResult {
  outcome: Outcome;
  extras: Record<string, string>;
}

const MARKER = /^LORE_NODE_RESULT:[ \t]*(.*)$/gm;

export function parseNodeResult(text: string): NodeResult | null {
  const last = [...text.matchAll(MARKER)].at(-1);

  return last === undefined ? null : nodeResultOf(last[1]?.trim() ?? "");
}

function nodeResultOf(payload: string): NodeResult | null {
  const bare = OutcomeSchema.safeParse(payload);

  if (bare.success) {
    return { outcome: bare.data, extras: {} };
  }
  const parsed = z
    .object({ outcome: OutcomeSchema, extras: z.record(z.unknown()).optional() })
    .safeParse(parseJson(payload));

  return parsed.success
    ? { outcome: parsed.data.outcome, extras: stringEntries(parsed.data.extras ?? {}) }
    : null;
}

function stringEntries(extras: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(extras).filter((pair): pair is [string, string] => typeof pair[1] === "string"),
  );
}

function parseJson(line: string): unknown {
  try {
    return JSON.parse(line);
  } catch {
    return undefined;
  }
}

export function streamLines(stdout: string): unknown[] {
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseJson)
    .filter((value) => value !== undefined);
}

const ClaudeResultLine = z.object({ type: z.literal("result"), result: z.string() });
const GeminiAssistantChunk = z.object({ type: z.literal("message"), role: z.literal("assistant"), content: z.string() });
const GeminiResultLine = z.object({ type: z.literal("result"), status: z.string() });
const CodexAgentMessage = z.object({
  type: z.literal("item.completed"),
  item: z.object({ type: z.literal("agent_message"), text: z.string() }),
});

export function finalText(harness: Harness, stdout: string): string {
  const lines = streamLines(stdout);
  const text = { claude: claudeFinalText, gemini: geminiFinalText, codex: codexFinalText }[harness](lines);

  return text ?? stdout;
}

function claudeFinalText(lines: readonly unknown[]): string | null {
  return lastMatch(lines, ClaudeResultLine)?.result ?? null;
}

// The gemini result line carries stats only; the text is the run of assistant delta chunks right before it, concatenated with no separator.
function geminiFinalText(lines: readonly unknown[]): string | null {
  const resultIndex = lines.findLastIndex((line) => GeminiResultLine.safeParse(line).success);

  if (resultIndex < 0) {
    return null;
  }
  const chunks: string[] = [];

  for (let i = resultIndex - 1; i >= 0; i--) {
    const chunk = GeminiAssistantChunk.safeParse(lines[i]);

    if (!chunk.success) {
      break;
    }
    chunks.unshift(chunk.data.content);
  }

  return chunks.length > 0 ? chunks.join("") : null;
}

function codexFinalText(lines: readonly unknown[]): string | null {
  return lastMatch(lines, CodexAgentMessage)?.item.text ?? null;
}

function lastMatch<T>(lines: readonly unknown[], schema: z.ZodType<T>): T | null {
  for (let i = lines.length - 1; i >= 0; i--) {
    const parsed = schema.safeParse(lines[i]);

    if (parsed.success) {
      return parsed.data;
    }
  }

  return null;
}
