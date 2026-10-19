import { describe, expect, it } from "vitest";
import { costOf } from "./pricing.js";
import { EMPTY_USAGE } from "./usage.js";

describe("costOf", () => {
  it("uses the reported claude cost 0.0021 when the stream carries one", () => {
    expect(costOf("claude", "claude-sonnet-4-6", { ...EMPTY_USAGE, reported_cost_usd: 0.0021 })).toEqual({
      usd: 0.0021,
      basis: "reported",
    });
  });

  it("gemini-3.1-pro-preview: 1M input + 1M output is $14 at list", () => {
    const usage = { ...EMPTY_USAGE, input_tokens: 1_000_000, output_tokens: 1_000_000 };

    expect(costOf("gemini", "gemini-3.1-pro-preview", usage)).toEqual({ usd: 14, basis: "list" });
  });

  it("codex counts cached input at the cached rate: gpt-5.6-terra 1M input of which 1M cached is $0.125", () => {
    const usage = { ...EMPTY_USAGE, input_tokens: 1_000_000, cache_read_tokens: 1_000_000 };

    expect(costOf("codex", "gpt-5.6-terra", usage).usd).toBeCloseTo(0.125, 9);
  });

  it("gemini counts cached input at a tenth: 1M input of which 1M cached on gemini-3.1-pro-preview is $0.20", () => {
    const usage = { ...EMPTY_USAGE, input_tokens: 1_000_000, cache_read_tokens: 1_000_000 };

    expect(costOf("gemini", "gemini-3.1-pro-preview", usage).usd).toBeCloseTo(0.2, 9);
  });

  it("an unknown model costs 0 with basis unknown-model", () => {
    expect(costOf("gemini", "gemini-9", { ...EMPTY_USAGE, input_tokens: 10 })).toEqual({ usd: 0, basis: "unknown-model" });
  });
});
