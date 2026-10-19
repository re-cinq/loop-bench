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

export function effortLabel(harness: Harness, model: string, effort: string | undefined): string {
  if (effort !== undefined) {
    return effort;
  }
  if (harness === "codex") {
    return `${CODEX_DEFAULT_EFFORT[model] ?? "unknown"} (codex default)`;
  }
  // gemini-cli has no effort setting: the model sizes its own thinking. claude does not report the level it chose.
  return harness === "gemini" ? "dynamic (gemini-cli has no setting)" : "claude CLI default";
}
