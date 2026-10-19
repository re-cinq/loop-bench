// List prices per million tokens. Claude runs report their own cost; gemini and codex are priced from tokens.
import type { Harness } from "./harness-names.js";
import type { Usage } from "./usage.js";

interface PricePerMillion {
  input: number;
  output: number;
  cachedInput?: number;
}

// Copied from lore libs/shared/src/outbound/llm/anthropic-pricing.ts (2026-10-19). Cache writes 1.25x, reads 0.1x.
const CLAUDE: Record<string, PricePerMillion> = {
  "claude-fable-5": { input: 10, output: 50 },
  "claude-opus-5": { input: 5, output: 25 },
  "claude-opus-5-5": { input: 5, output: 25 },
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-sonnet-5": { input: 2, output: 10 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5-20251001": { input: 0.8, output: 4 },
  "claude-haiku-5-5": { input: 1, output: 5 },
};

// Copied from lore libs/shared/src/outbound/llm/gemini-pricing.ts (read off ai.google.dev 2026-09-01).
const GEMINI: Record<string, PricePerMillion> = {
  "gemini-2.5-pro": { input: 1.25, output: 10 },
  "gemini-2.5-flash": { input: 0.3, output: 2.5 },
  "gemini-2.5-flash-lite": { input: 0.1, output: 0.4 },
  "gemini-3.1-pro-preview": { input: 2, output: 12 },
  "gemini-3-flash-preview": { input: 0.5, output: 3 },
  "gemini-4-argon": { input: 2, output: 10 },
  "gemini-3.7-flash": { input: 0.75, output: 3.75 },
  "gemini-3.1-flash-lite": { input: 0.25, output: 1.5 },
};

// OpenAI list prices; verify against platform.openai.com/pricing before a write-up (filled in 2026-10-19 from the models codex lists).
const OPENAI: Record<string, PricePerMillion> = {
  "gpt-5.6-terra": { input: 1.25, output: 10, cachedInput: 0.125 },
  "gpt-5.6-sol": { input: 2.5, output: 20, cachedInput: 0.25 },
  "gpt-5.6-luna": { input: 0.25, output: 2, cachedInput: 0.025 },
  "gpt-6-sol": { input: 5, output: 30, cachedInput: 0.5 },
  "gpt-6-astra": { input: 10, output: 60, cachedInput: 1 },
  "gpt-6-luna": { input: 0.5, output: 4, cachedInput: 0.05 },
  "gpt-6.1-sol": { input: 5, output: 30, cachedInput: 0.5 },
};

const TABLES: Record<Harness, Record<string, PricePerMillion>> = { claude: CLAUDE, gemini: GEMINI, codex: OPENAI };

export interface Cost {
  usd: number;
  basis: "reported" | "list" | "unknown-model";
}

export function knownModels(harness: Harness): string[] {
  return Object.keys(TABLES[harness]);
}

export function costOf(harness: Harness, model: string, usage: Usage): Cost {
  if (usage.reported_cost_usd !== null) {
    return { usd: usage.reported_cost_usd, basis: "reported" };
  }
  const price = TABLES[harness][model];

  if (!price) {
    return { usd: 0, basis: "unknown-model" };
  }

  return { usd: listCost(harness, price, usage), basis: "list" };
}

function listCost(harness: Harness, price: PricePerMillion, usage: Usage): number {
  const perToken = (perMillion: number): number => perMillion / 1_000_000;
  const cachedRate = price.cachedInput ?? (harness === "claude" ? price.input * 0.1 : price.input);
  const uncachedInput = harness === "codex" ? usage.input_tokens - usage.cache_read_tokens : usage.input_tokens;

  return (
    uncachedInput * perToken(price.input) +
    usage.cache_read_tokens * perToken(cachedRate) +
    usage.cache_write_tokens * perToken(price.input) * 1.25 +
    (usage.output_tokens + usage.reasoning_tokens) * perToken(price.output)
  );
}
