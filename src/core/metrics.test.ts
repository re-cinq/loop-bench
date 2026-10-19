import { describe, expect, it } from "vitest";
import { parseNumstat, structuralMetrics } from "./metrics.js";

const TEST_FILE = /\.(test|spec)\.[cm]?[jt]sx?$/;

describe("structuralMetrics", () => {
  it("3 additions and 1 deletion over two files, one of them a test, Jaccard 1/3 against a reference sharing one file", () => {
    const candidate = parseNumstat("2\t1\tsrc/a.ts\n1\t0\tsrc/a.test.ts\n");
    const reference = parseNumstat("5\t0\tsrc/a.ts\n-\t-\timg.png\n");

    expect(structuralMetrics(candidate, reference, TEST_FILE)).toEqual({
      additions: 3,
      deletions: 1,
      files: 2,
      production_files: 1,
      test_files: 1,
      jaccard_files: 1 / 3,
    });
  });

  it("two empty diffs have Jaccard 1", () => {
    expect(structuralMetrics([], [], TEST_FILE).jaccard_files).toBe(1);
  });
});
