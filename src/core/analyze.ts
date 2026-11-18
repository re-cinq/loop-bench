// What a transcript says about how a run spent its time and tokens: the deterministic signals behind "what would make this cheaper".
import { z } from "zod";
import type { Harness } from "./harness-names.js";
import { streamLines } from "./result-line.js";

export interface ToolCall {
  kind: "shell" | "read" | "edit" | "search" | "mcp" | "other";
  name: string;
  detail: string;
}

export interface TranscriptAnalysis {
  turns: number;
  tool_calls: number;
  by_kind: Record<ToolCall["kind"], number>;
  shell_commands: string[];
  guard_blocked: number;
  reinstalls_or_builds: number;
  test_runs: number;
  repeated_reads: number;
  lore_calls: string[];
  first_edit_index: number | null;
}

const ClaudeAssistant = z.object({
  type: z.literal("assistant"),
  message: z.object({ content: z.array(z.object({ type: z.string(), name: z.string().optional(), input: z.unknown().optional() })) }),
});
const ClaudeToolResult = z.object({
  type: z.literal("user"),
  message: z.object({ content: z.array(z.object({ type: z.string(), content: z.unknown().optional(), is_error: z.boolean().optional() })) }),
});
const GeminiToolUse = z.object({ type: z.literal("tool_use"), tool_name: z.string(), parameters: z.record(z.unknown()).optional() });
const GeminiToolResult = z.object({ type: z.literal("tool_result"), status: z.string().optional(), output: z.unknown().optional() });
const CodexItem = z.object({
  type: z.literal("item.completed"),
  item: z.object({ type: z.string(), command: z.string().optional(), aggregated_output: z.string().optional(), changes: z.unknown().optional(), server: z.string().optional(), tool: z.string().optional() }),
});

export const TEST_RUN_PATTERN = /\b(vitest|jest|pytest|npm test|npm run test|go test|cargo test)\b/;

export function analyzeTranscript(harness: Harness, stdout: string): TranscriptAnalysis {
  const lines = streamLines(stdout);
  const calls = { claude: claudeCalls, gemini: geminiCalls, codex: codexCalls }[harness](lines);
  const blocked = countBlocked(lines);
  const reads = calls.filter((call) => call.kind === "read").map((call) => call.detail);

  return {
    turns: calls.length === 0 ? lines.length : turnsOf(harness, lines),
    tool_calls: calls.length,
    by_kind: countByKind(calls),
    shell_commands: calls.filter((call) => call.kind === "shell").map((call) => call.detail),
    guard_blocked: blocked,
    reinstalls_or_builds: calls.filter((call) => call.kind === "shell" && /\b(npm (ci|i|install)|npm run build|tsc -b|pip install|cargo build|go build)\b/.test(call.detail)).length,
    test_runs: calls.filter((call) => call.kind === "shell" && TEST_RUN_PATTERN.test(call.detail)).length,
    repeated_reads: reads.length - new Set(reads).size,
    lore_calls: calls.filter((call) => call.kind === "mcp").map((call) => call.name),
    first_edit_index: firstIndex(calls, (call) => call.kind === "edit"),
  };
}

function turnsOf(harness: Harness, lines: readonly unknown[]): number {
  const marker = { claude: (line: unknown) => ClaudeAssistant.safeParse(line).success, gemini: (line: unknown) => z.object({ type: z.literal("message"), role: z.literal("assistant") }).safeParse(line).success, codex: (line: unknown) => z.object({ type: z.literal("turn.started") }).safeParse(line).success }[harness];

  return lines.filter(marker).length;
}

function claudeCalls(lines: readonly unknown[]): ToolCall[] {
  return lines.flatMap((line) => {
    const parsed = ClaudeAssistant.safeParse(line);

    return parsed.success
      ? parsed.data.message.content.filter((part) => part.type === "tool_use").map((part) => classify(part.name ?? "", part.input))
      : [];
  });
}

function geminiCalls(lines: readonly unknown[]): ToolCall[] {
  return lines.flatMap((line) => {
    const parsed = GeminiToolUse.safeParse(line);

    return parsed.success ? [classify(parsed.data.tool_name, parsed.data.parameters)] : [];
  });
}

function codexCalls(lines: readonly unknown[]): ToolCall[] {
  return lines.flatMap((line): ToolCall[] => {
    const parsed = CodexItem.safeParse(line);

    if (!parsed.success) {
      return [];
    }
    const item = parsed.data.item;

    if (item.type === "command_execution") {
      return [{ kind: "shell", name: "command", detail: item.command ?? "" }];
    }
    if (item.type === "file_change") {
      return [{ kind: "edit", name: "file_change", detail: JSON.stringify(item.changes ?? "") }];
    }
    if (item.type === "mcp_tool_call") {
      return [{ kind: "mcp", name: `${item.server ?? ""}/${item.tool ?? ""}`, detail: "" }];
    }

    return [];
  });
}

function classify(name: string, input: unknown): ToolCall {
  const params = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const text = (key: string): string => (typeof params[key] === "string" ? (params[key] as string) : "");
  const lower = name.toLowerCase();

  if (lower.startsWith("mcp__") || lower.startsWith("mcp_") || lower.startsWith("lore")) {
    return { kind: "mcp", name, detail: "" };
  }
  if (lower === "bash" || lower === "run_shell_command" || lower === "shell") {
    return { kind: "shell", name, detail: text("command") };
  }
  if (lower === "read" || lower === "read_file" || lower === "read_many_files") {
    return { kind: "read", name, detail: text("file_path") || text("absolute_path") || text("path") };
  }
  if (["edit", "write", "multiedit", "notebookedit", "replace", "write_file", "edit_file"].includes(lower)) {
    return { kind: "edit", name, detail: text("file_path") || text("absolute_path") || text("path") };
  }
  if (["grep", "glob", "search_file_content", "glob_search", "list_directory", "ls"].includes(lower)) {
    return { kind: "search", name, detail: text("pattern") };
  }

  return { kind: "other", name, detail: "" };
}

function countBlocked(lines: readonly unknown[]): number {
  return lines.filter((line) => {
    const claude = ClaudeToolResult.safeParse(line);

    if (claude.success) {
      return claude.data.message.content.some((part) => JSON.stringify(part.content ?? "").includes("[lore] blocked"));
    }
    const gemini = GeminiToolResult.safeParse(line);

    return gemini.success && JSON.stringify(gemini.data.output ?? "").includes("[lore] blocked");
  }).length;
}

function countByKind(calls: readonly ToolCall[]): Record<ToolCall["kind"], number> {
  const counts: Record<ToolCall["kind"], number> = { shell: 0, read: 0, edit: 0, search: 0, mcp: 0, other: 0 };

  for (const call of calls) {
    counts[call.kind] += 1;
  }

  return counts;
}

function firstIndex<T>(items: readonly T[], predicate: (item: T) => boolean): number | null {
  const index = items.findIndex(predicate);

  return index < 0 ? null : index;
}
