import { describe, expect, it } from "vitest";
import type { StationRunRecord } from "./records.js";
import { renderStationSummary } from "./station-report.js";
import { EMPTY_USAGE } from "./usage.js";

const visit = (overrides: Partial<StationRunRecord>): StationRunRecord => ({
  kind: "station_run", experiment_id: "e", loop_id: "l", run_id: "r", ticket: 93, station: "dod", round: 0, attempt: 0,
  harness: "claude", model: "sonnet", prompt_variant: "baseline", context_mode: "none", outcome: "success", extras: {},
  failure_class: "none", exit_code: 0, usage: EMPTY_USAGE, cost_usd: 1, cost_basis: "reported", wall_ms: 60_000, head_sha_before: "a", head_sha_after: "b",
  pushed: true, ci: null, prompt_sha256_verbatim: "", prompt_sha256_sent: "", prompts_lore_sha: "", cli_version: "", started_at: "",
  ...overrides,
});

describe("renderStationSummary", () => {
  it("folds two dod visits of claude/sonnet into 1/2 success, 2/2 pushed, cost $2.00 ($1.00–$3.00, sd $1.00)", () => {
    const row = renderStationSummary([
      { record: visit({}), analysis: null, cellPath: "c" },
      { record: visit({ run_id: "r2", outcome: "failed", cost_usd: 3 }), analysis: null, cellPath: "c" },
    ]).split("\n")[2];

    expect(row).toContain("| dod | `claude/sonnet` | none | baseline | 2 | 1/2 | 2/2 | — | $2.00 ($1.00–$3.00, sd $1.00) |");
  });
});
