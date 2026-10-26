import { describe, expect, it } from "vitest";
import { loopTotals } from "./loop-totals.js";
import type { StationRunRecord } from "./records.js";
import { EMPTY_USAGE } from "./usage.js";

const visit = (costUsd: number, wallMs: number, ciWallMs: number | null, outputTokens: number): Pick<StationRunRecord, "cost_usd" | "wall_ms" | "ci" | "usage"> => ({
  cost_usd: costUsd,
  wall_ms: wallMs,
  ci: ciWallMs === null ? null : { green: true, failed_checks: [], head_sha: "a", wall_ms: ciWallMs },
  usage: { ...EMPTY_USAGE, output_tokens: outputTokens, reported_cost_usd: costUsd },
});

describe("loopTotals", () => {
  it("adds cost, wall time with CI time, and usage over the visits", () => {
    expect(loopTotals([visit(1.5, 1000, 200, 10), visit(0.5, 3000, null, 5)])).toEqual({
      total_cost_usd: 2,
      total_wall_ms: 4200,
      total_usage: { ...EMPTY_USAGE, output_tokens: 15, reported_cost_usd: 2 },
    });
  });

  it("returns zero totals and empty usage for no visits", () => {
    expect(loopTotals([])).toEqual({ total_cost_usd: 0, total_wall_ms: 0, total_usage: EMPTY_USAGE });
  });
});
