// Token usage read off each CLI's terminal stream line. Only claude reports a dollar cost and a duration.
import { z } from "zod";
import type { Harness } from "./harness-names.js";
import { streamLines } from "./result-line.js";

export const UsageSchema = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  cache_read_tokens: z.number().int().nonnegative(),
  cache_write_tokens: z.number().int().nonnegative(),
  reasoning_tokens: z.number().int().nonnegative(),
  reported_cost_usd: z.number().nullable(),
  reported_duration_ms: z.number().nullable(),
  tool_calls: z.number().int().nullable(),
});
export type Usage = z.infer<typeof UsageSchema>;

export const EMPTY_USAGE: Usage = {
  input_tokens: 0,
  output_tokens: 0,
  cache_read_tokens: 0,
  cache_write_tokens: 0,
  reasoning_tokens: 0,
  reported_cost_usd: null,
  reported_duration_ms: null,
  tool_calls: null,
};

const ClaudeResult = z.object({
  type: z.literal("result"),
  total_cost_usd: z.number().optional(),
  duration_ms: z.number().optional(),
  usage: z.object({
    input_tokens: z.number(),
    output_tokens: z.number(),
    cache_creation_input_tokens: z.number().optional(),
    cache_read_input_tokens: z.number().optional(),
  }),
});

const GeminiResult = z.object({
  type: z.literal("result"),
  stats: z.object({
    input_tokens: z.number(),
    output_tokens: z.number(),
    cached: z.number().optional(),
    duration_ms: z.number().optional(),
    tool_calls: z.number().optional(),
  }),
});

const CodexTurn = z.object({
  type: z.literal("turn.completed"),
  usage: z.object({
    input_tokens: z.number(),
    cached_input_tokens: z.number().optional(),
    output_tokens: z.number(),
    reasoning_output_tokens: z.number().optional(),
  }),
});

const ClaudeToolUse = z.object({
  type: z.literal("assistant"),
  message: z.object({ content: z.array(z.object({ type: z.string() })) }),
});

export function usageFromStream(harness: Harness, stdout: string): Usage {
  const lines = streamLines(stdout);

  return { claude: claudeUsage, gemini: geminiUsage, codex: codexUsage }[harness](lines);
}

function claudeUsage(lines: readonly unknown[]): Usage {
  const result = lines.map((line) => ClaudeResult.safeParse(line)).findLast((parsed) => parsed.success)?.data;

  if (!result) {
    return EMPTY_USAGE;
  }
  const toolCalls = lines
    .map((line) => ClaudeToolUse.safeParse(line))
    .filter((parsed) => parsed.success)
    .reduce((count, parsed) => count + parsed.data.message.content.filter((part) => part.type === "tool_use").length, 0);

  return {
    input_tokens: result.usage.input_tokens,
    output_tokens: result.usage.output_tokens,
    cache_read_tokens: result.usage.cache_read_input_tokens ?? 0,
    cache_write_tokens: result.usage.cache_creation_input_tokens ?? 0,
    reasoning_tokens: 0,
    reported_cost_usd: result.total_cost_usd ?? null,
    reported_duration_ms: result.duration_ms ?? null,
    tool_calls: toolCalls,
  };
}

function geminiUsage(lines: readonly unknown[]): Usage {
  const result = lines.map((line) => GeminiResult.safeParse(line)).findLast((parsed) => parsed.success)?.data;

  if (!result) {
    return EMPTY_USAGE;
  }

  return {
    ...EMPTY_USAGE,
    input_tokens: result.stats.input_tokens,
    output_tokens: result.stats.output_tokens,
    cache_read_tokens: result.stats.cached ?? 0,
    reported_duration_ms: result.stats.duration_ms ?? null,
    tool_calls: result.stats.tool_calls ?? null,
  };
}

// Codex reports one usage block per turn; a run with several turns is their sum.
function codexUsage(lines: readonly unknown[]): Usage {
  const turns = lines.map((line) => CodexTurn.safeParse(line)).filter((parsed) => parsed.success);

  if (turns.length === 0) {
    return EMPTY_USAGE;
  }
  const sum = (pick: (usage: z.infer<typeof CodexTurn>["usage"]) => number | undefined): number =>
    turns.reduce((total, turn) => total + (pick(turn.data.usage) ?? 0), 0);
  const commandCalls = lines.filter(
    (line) => z.object({ type: z.literal("item.completed"), item: z.object({ type: z.literal("command_execution") }) }).safeParse(line).success,
  ).length;

  return {
    ...EMPTY_USAGE,
    input_tokens: sum((usage) => usage.input_tokens),
    output_tokens: sum((usage) => usage.output_tokens),
    cache_read_tokens: sum((usage) => usage.cached_input_tokens),
    reasoning_tokens: sum((usage) => usage.reasoning_output_tokens),
    tool_calls: commandCalls,
  };
}
