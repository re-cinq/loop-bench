import { describe, expect, it } from "vitest";
import { costOf } from "./pricing.js";
import { EMPTY_USAGE } from "./usage.js";

const million = 1_000_000;

describe("costOf", () => {
  it("prices claude from tokens even when the CLI reported its own cost: opus-5-5 1M out is $20", () => {
    expect(costOf("claude", "claude-opus-5-5", { ...EMPTY_USAGE, output_tokens: million, reported_cost_usd: 1 })).toEqual({ usd: 20, basis: "list" });
  });

  it("claude cache writes cost 1.25x input and reads $0.20 on opus-5-5: 1M of each is $5.20", () => {
    expect(costOf("claude", "claude-opus-5-5", { ...EMPTY_USAGE, cache_write_tokens: million, cache_read_tokens: million }).usd).toBeCloseTo(5.2, 9);
  });

  it("gemini-4-argon at its December price: 1M input of which 1M cached plus 1M output is $20.20", () => {
    expect(costOf("gemini", "gemini-4-argon", { ...EMPTY_USAGE, input_tokens: million, cache_read_tokens: million, output_tokens: million }).usd).toBeCloseTo(20.2, 9);
  });

  it("gemini-4-carbon at Argon's December price: 1M input of which 1M cached plus 1M output is $20.20", () => {
    expect(costOf("gemini", "gemini-4-carbon", { ...EMPTY_USAGE, input_tokens: million, cache_read_tokens: million, output_tokens: million }).usd).toBeCloseTo(20.2, 9);
  });

  it("gemini-3.8-flash at its January 2027 price: 1M input of which 1M cached plus 1M output is $7.65", () => {
    expect(costOf("gemini", "gemini-3.8-flash", { ...EMPTY_USAGE, input_tokens: million, cache_read_tokens: million, output_tokens: million }).usd).toBeCloseTo(7.65, 9);
  });

  it("gpt-5.6-sol at its pre-promotion price: 1M uncached input plus 1M reasoning is $35", () => {
    expect(costOf("codex", "gpt-5.6-sol", { ...EMPTY_USAGE, input_tokens: million, reasoning_tokens: million }).usd).toBeCloseTo(35, 9);
  });

  it("glm-5.3 through the claude CLI: 1M uncached input, 1M cache reads and 1M output is $6.06", () => {
    expect(costOf("claude", "glm-5.3", { ...EMPTY_USAGE, input_tokens: million, cache_read_tokens: million, output_tokens: million }).usd).toBeCloseTo(6.06, 9);
  });

  it("an unknown model costs 0 with basis unknown-model", () => {
    expect(costOf("gemini", "gemini-9", { ...EMPTY_USAGE, input_tokens: 10 })).toEqual({ usd: 0, basis: "unknown-model" });
  });
});
