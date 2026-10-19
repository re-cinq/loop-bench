// The effort a run used, named the same way for every CLI.
import type { Harness } from "./harness-names.js";

// What codex runs a model at when told nothing: default_reasoning_level in the models list codex 0.163.0 fetches (2026-10-19).
const CODEX_DEFAULT_EFFORT: Record<string, string> = {
  "gpt-5.6-terra": "medium",
  "gpt-5.6-sol": "low",
  "gpt-5.6-luna": "medium",
  "gpt-6-sol": "medium",
  "gpt-6-astra": "low",
  "gpt-6-luna": "medium",
  "gpt-6.1-sol": "low",
};

// What claude code runs a model at when told nothing (code.claude.com/docs/en/model-config, read 2026-10-19): high, except medium on Opus 5.5, Sonnet 5.5 and Haiku 5.5. Haiku 4.5 does not support effort and runs without thinking.
const CLAUDE_DEFAULT_EFFORT: Record<string, string> = {
  "claude-fable-5-1": "high",
  "claude-opus-5-5": "medium",
  "claude-sonnet-5-5": "medium",
  "claude-haiku-5-5": "medium",
  "claude-sonnet-4-6": "high",
  "claude-haiku-4-5-20251001": "none (no thinking)",
};

// gemini-cli 0.62.0 sends thinkingLevel HIGH for the models it lists as gemini-3 and nothing for others, which then run at the API default (ai.google.dev/gemini-api/docs/thinking: medium on gemini-4-argon).
const GEMINI_DEFAULT_EFFORT: Record<string, string> = {
  "gemini-3.1-pro-preview": "high",
  "gemini-3-flash-preview": "high",
  "gemini-4-argon": "medium",
};

const DEFAULTS: Record<Harness, { table: Record<string, string>; source: string }> = {
  claude: { table: CLAUDE_DEFAULT_EFFORT, source: "claude CLI default" },
  gemini: { table: GEMINI_DEFAULT_EFFORT, source: "gemini-cli default" },
  codex: { table: CODEX_DEFAULT_EFFORT, source: "codex default" },
};

export function effortLabel(harness: Harness, model: string, effort: string | undefined): string {
  if (effort !== undefined) {
    return effort;
  }
  const { table, source } = DEFAULTS[harness];

  return `${table[model] ?? "unknown"} (${source})`;
}
