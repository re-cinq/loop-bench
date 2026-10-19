// Standard market prices per million tokens, the same way for every vendor: no launch discounts, no promotions, so a decision made on them holds after the promotion ends.
// Read 2026-10-19 from:
//   Anthropic: the Claude API model table (claude.com pricing).
//   Google: https://ai.google.dev/gemini-api/docs/pricing (gemini-4-argon at its price from 2026-12-01, not the launch price).
//   OpenAI: https://developers.openai.com/api/docs/pricing, Standard tier, <=272K input (gpt-5.6-sol at its pre-promotion $5/$30, not the promotion running through 2026-11-21).
import type { Harness } from "./harness-names.js";
import type { Usage } from "./usage.js";

interface PricePerMillion {
  input: number;
  output: number;
  cacheRead: number;
  /** Anthropic charges for writing the cache; the others do not. */
  cacheWrite?: number;
}

const anthropic = (input: number, output: number, cacheRead: number): PricePerMillion => ({ input, output, cacheRead, cacheWrite: input * 1.25 });

export const MARKET_PRICES: Record<Harness, Record<string, PricePerMillion>> = {
  claude: {
    "claude-fable-5-1": anthropic(10, 50, 0.25),
    "claude-opus-5-5": anthropic(4, 20, 0.2),
    "claude-sonnet-5-5": anthropic(2, 10, 0.2),
    // $0.10/$0.50 up to 100K-token prompts, $0.50/$2.50 above; the bench sees a run's total tokens, not each request's, so it takes the higher tier.
    "claude-haiku-5-5": anthropic(0.5, 2.5, 0.05),
    "claude-sonnet-4-6": anthropic(3, 15, 0.3),
    "claude-haiku-4-5-20251001": anthropic(1, 5, 0.1),
  },
  gemini: {
    "gemini-4-argon": { input: 4, output: 20, cacheRead: 0.2 },
    "gemini-3.1-pro-preview": { input: 2, output: 12, cacheRead: 0.2 },
    "gemini-3-flash-preview": { input: 0.5, output: 3, cacheRead: 0.05 },
  },
  codex: {
    "gpt-5.6-terra": { input: 2, output: 12, cacheRead: 0.2 },
    "gpt-5.6-sol": { input: 5, output: 30, cacheRead: 0.5 },
    "gpt-5.6-luna": { input: 0.2, output: 1.2, cacheRead: 0.02 },
    "gpt-6-sol": { input: 2, output: 10, cacheRead: 0.2 },
    "gpt-6-astra": { input: 10, output: 50, cacheRead: 1 },
    "gpt-6-luna": { input: 0.1, output: 0.5, cacheRead: 0.01 },
    "gpt-6.1-sol": { input: 2, output: 10, cacheRead: 0.1 },
  },
};

export interface Cost {
  usd: number;
  basis: "list" | "unknown-model";
}

export function costOf(harness: Harness, model: string, usage: Usage): Cost {
  const price = MARKET_PRICES[harness][model];

  if (!price) {
    return { usd: 0, basis: "unknown-model" };
  }
  const perToken = (perMillion: number): number => perMillion / 1_000_000;
  // Codex and gemini count their cache hits inside input_tokens; claude reports them apart.
  const uncachedInput = harness === "claude" ? usage.input_tokens : usage.input_tokens - usage.cache_read_tokens;

  return {
    usd:
      uncachedInput * perToken(price.input) +
      usage.cache_read_tokens * perToken(price.cacheRead) +
      usage.cache_write_tokens * perToken(price.cacheWrite ?? price.input) +
      (usage.output_tokens + usage.reasoning_tokens) * perToken(price.output),
    basis: "list",
  };
}
