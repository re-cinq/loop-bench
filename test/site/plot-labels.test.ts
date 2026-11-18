import { describe, expect, it } from "vitest";
import { distinctLabels, separateLabels } from "../../site/js/plot.js";

describe("separateLabels", () => {
  it("moves the lower of two overlapping labels down by one line height", () => {
    const labels = [{ x: 100, y: 50, width: 60, anchor: "start" }, { x: 110, y: 52, width: 60, anchor: "start" }];
    expect(separateLabels(labels, 13).map((label) => label.y)).toEqual([50, 63]);
  });

  it("leaves labels that do not overlap horizontally where they are", () => {
    const labels = [{ x: 100, y: 50, width: 40, anchor: "start" }, { x: 300, y: 50, width: 40, anchor: "start" }];
    expect(separateLabels(labels, 13).map((label) => label.y)).toEqual([50, 50]);
  });
});

describe("distinctLabels", () => {
  it("drops a label equal to the one before it", () => {
    expect(distinctLabels([0.121, 0.122, 0.2, 0.2], (value) => `$${value.toFixed(2)}`)).toEqual(["$0.12", null, "$0.20", null]);
  });
});
