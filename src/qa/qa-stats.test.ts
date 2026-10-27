import { describe, expect, it } from "vitest";
import { coefficientOfVariation, mcnemarExact, percentile } from "./qa-stats.js";

describe("percentile", () => {
  it("returns 2.5 as the median of 1, 2, 3, 4 and 4 as their p100", () => {
    expect([percentile([4, 1, 3, 2], 50), percentile([4, 1, 3, 2], 100)]).toEqual([2.5, 4]);
  });

  it("returns null for no values", () => {
    expect(percentile([], 50)).toBeNull();
  });
});

describe("coefficientOfVariation", () => {
  it("returns 0.5 for 1 and 3", () => {
    expect(coefficientOfVariation([1, 3])).toBe(0.5);
  });

  it("returns null for one value", () => {
    expect(coefficientOfVariation([5])).toBeNull();
  });
});

describe("mcnemarExact", () => {
  it("returns 1 with no discordant pairs", () => {
    expect(mcnemarExact(0, 0)).toBe(1);
  });

  it("returns 0.0117 for 10 discordant pairs against 1", () => {
    expect(mcnemarExact(10, 1)).toBeCloseTo(0.01172, 4);
  });
});
