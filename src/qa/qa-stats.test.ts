import { describe, expect, it } from "vitest";
import { coefficientOfVariation, mcnemarExact } from "./qa-stats.js";

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
