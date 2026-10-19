import { describe, expect, it } from "vitest";
import type { LoopRecord } from "./records.js";
import { cellsOf, renderResultsTable } from "./report.js";
import { EMPTY_USAGE } from "./usage.js";

const loop = (overrides: Partial<LoopRecord>): LoopRecord => ({
  kind: "loop",
  experiment_id: "e",
  loop_id: "x",
  cell_path: "p",
  ticket: 93,
  mode: "ofat",
  varied_station: "dod",
  assignments: { dod: { harness: "claude", model: "opus" }, "tdd-round": { harness: "claude", model: "sonnet" }, "repair-build": { harness: "gemini", model: "pro" } },
  prompt_variant: "baseline",
  context_mode: "none",
  replicate: 1,
  end_reason: "green",
  rounds: 2,
  repairs: 0,
  reached_green: true,
  total_cost_usd: 1,
  total_wall_ms: 60_000,
  total_usage: EMPTY_USAGE,
  structural: null,
  dod_check: null,
  judge: null,
  final_head_sha: null,
  started_at: "",
  finished_at: "",
  ...overrides,
});

describe("renderResultsTable", () => {
  it("folds two replicates of one cell into 1/2 green, rounds 3.0 (2.0–4.0, sd 1.0), cost $1.50", () => {
    const cells = cellsOf([loop({ replicate: 1 }), loop({ replicate: 2, rounds: 4, total_cost_usd: 2, reached_green: false, end_reason: "round_budget" })]);

    expect(cells).toHaveLength(1);
    const row = renderResultsTable(cells).split("\n")[2] ?? "";

    expect(row).toContain("| 2 | 1/2 | 3.0 (2.0–4.0, sd 1.0) | $1.50 ($1.00–$2.00, sd $0.50) |");
    expect(row).toContain("`claude/opus`");
  });
});
