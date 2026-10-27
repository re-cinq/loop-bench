// What one fresh claude did with a question, read off its stream-json: the answer, what it cost in tokens and time, and what its MCP server handed it.
import { z } from "zod";
import { parseJson, streamLines } from "../core/result-line.js";
import { usageFromStream, type Usage } from "../core/usage.js";

export interface QaTranscript {
  /** The answer the JSON reply carried, or the whole reply when it carried none: the judge grades what was said, not its format. */
  answer: string | null;
  /** Whether the reply was the JSON object the prompt asked for. */
  answered_as_json: boolean;
  sources: string[];
  usage: Usage;
  duration_ms: number | null;
  duration_api_ms: number | null;
  /** Wall time the model was not generating: MCP calls and the CLI's own work. */
  non_model_ms: number | null;
  num_turns: number | null;
  mcp_calls: number;
  mcp_tools: string[];
  mcp_errors: number;
  /** Tokens the MCP results put into the context, at four characters a token. */
  mcp_result_tokens: number;
  /** What the run was started with, to prove it saw nothing but its arm. */
  init: { tools: string[]; mcp_servers: Array<{ name: string; status: string }> } | null;
  is_error: boolean;
}

const InitLine = z.object({
  type: z.literal("system"),
  subtype: z.literal("init"),
  tools: z.array(z.string()).default([]),
  mcp_servers: z.array(z.object({ name: z.string(), status: z.string() })).default([]),
});

const ResultLine = z.object({
  type: z.literal("result"),
  result: z.string().optional(),
  is_error: z.boolean().default(false),
  duration_ms: z.number().optional(),
  duration_api_ms: z.number().optional(),
  num_turns: z.number().optional(),
});

const ContentLine = z.object({
  type: z.enum(["assistant", "user"]),
  message: z.object({ content: z.union([z.string(), z.array(z.record(z.unknown()))]) }),
});

const ToolUse = z.object({ type: z.literal("tool_use"), name: z.string() });
const ToolResult = z.object({
  type: z.literal("tool_result"),
  is_error: z.boolean().optional(),
  content: z.union([z.string(), z.array(z.object({ type: z.string(), text: z.string().optional() }))]).optional(),
});

const AnswerSchema = z.object({ answer: z.string(), sources: z.array(z.string()).default([]) });

export function readTranscript(stdout: string): QaTranscript {
  const lines = streamLines(stdout);
  const init = lines.map((line) => InitLine.safeParse(line)).find((parsed) => parsed.success)?.data ?? null;
  const result = lines.map((line) => ResultLine.safeParse(line)).findLast((parsed) => parsed.success)?.data;
  const parts = lines
    .map((line) => ContentLine.safeParse(line))
    .flatMap((parsed) => (parsed.success && Array.isArray(parsed.data.message.content) ? parsed.data.message.content : []));
  const toolUses = parts.map((part) => ToolUse.safeParse(part)).flatMap((parsed) => (parsed.success && parsed.data.name.startsWith("mcp__") ? [parsed.data.name] : []));
  const toolResults = parts.map((part) => ToolResult.safeParse(part)).flatMap((parsed) => (parsed.success ? [parsed.data] : []));
  const finalText = result?.result ?? "";
  const answer = parseAnswer(finalText);
  const durationMs = result?.duration_ms ?? null;
  const durationApiMs = result?.duration_api_ms ?? null;

  return {
    answer: answer?.answer ?? (finalText.trim() === "" ? null : finalText.trim()),
    answered_as_json: answer !== null,
    sources: answer?.sources ?? [],
    usage: usageFromStream("claude", stdout),
    duration_ms: durationMs,
    duration_api_ms: durationApiMs,
    non_model_ms: durationMs !== null && durationApiMs !== null ? Math.max(0, durationMs - durationApiMs) : null,
    num_turns: result?.num_turns ?? null,
    mcp_calls: toolUses.length,
    mcp_tools: [...new Set(toolUses)].sort(),
    mcp_errors: toolResults.filter((toolResult) => toolResult.is_error === true).length,
    mcp_result_tokens: toolResults.reduce((tokens, toolResult) => tokens + Math.ceil(resultText(toolResult.content).length / 4), 0),
    init: init ? { tools: init.tools, mcp_servers: init.mcp_servers } : null,
    is_error: result?.is_error ?? true,
  };
}

/** The JSON object the prompt asked for, found inside whatever the model wrapped it in; null when there is none. */
export function parseAnswer(text: string): z.infer<typeof AnswerSchema> | null {
  const parsed = AnswerSchema.safeParse(firstJsonObject(text));

  return parsed.success ? parsed.data : null;
}

/** The span from the first `{` to the last `}`, parsed; undefined when it is not JSON. Models wrap their JSON in fences and prose. */
export function firstJsonObject(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  return start < 0 || end <= start ? undefined : parseJson(text.slice(start, end + 1));
}

function resultText(content: z.infer<typeof ToolResult>["content"]): string {
  if (content === undefined) {
    return "";
  }

  return typeof content === "string" ? content : content.map((part) => part.text ?? "").join("");
}
