import { describe, expect, it } from "vitest";
import { percentile } from "./stats.js";

describe("percentile", () => {
  it("returns 2.5 as the median of 1, 2, 3, 4 and 4 as their p100", () => {
    expect([percentile([4, 1, 3, 2], 50), percentile([4, 1, 3, 2], 100)]).toEqual([2.5, 4]);
  });

  it("returns null for no values", () => {
    expect(percentile([], 50)).toBeNull();
  });
});
