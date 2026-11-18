import { describe, expect, it } from "vitest";
import type { RunRow } from "./model-stats.js";
import { cellsOf, renderReport } from "./report.js";
import type { LoopRecord } from "./records.js";
import { EMPTY_USAGE } from "./usage.js";

const run = (overrides: Partial<RunRow>): RunRow => ({
  loopId: "l", task: "tdd-round", harness: "claude", model: "alpha", knowledgeBase: "none", ticket: 1, size: "small", setup: "s", replicate: 1, success: true, costUsd: 1, minutes: 2, rounds: 1, correctness: 4, completeness: 4, closeness: 4, endReason: "green", ...overrides,
});
const FORBIDDEN = /station|\bcell\b|\bdod\b|tdd-round|repair-build|lore-mcp|dominated|Jaccard|\bsd\b|OFAT|replicate|\bloop|harness/i;
const siteUrl = "https://example.test/bench/";
const generatedAt = "2026-11-18 10:00 UTC";

describe("renderReport", () => {
  const runs = [
    ...[1, 2].flatMap((ticket) => ["alpha", "beta"].map((model) => run({ model, ticket, setup: `${model}${ticket}`, costUsd: model === "alpha" ? 0.4 : 2 }))),
    run({ task: "dod", model: "alpha", ticket: 1, setup: "d", success: false, costUsd: null }),
  ];
  const report = renderReport({ runs, generatedAt, siteUrl });

  it("opens with the title, run, model and ticket counts, the date, the spend and the website address", () => {
    expect(report.split("\n\n").slice(0, 2)).toEqual([
      "# Which AI model should do which job",
      `As of 2026-11-18, we measured 5 runs by 2 AI models on 2 tickets, each run being one model doing one job: writing the tests, writing the code, or fixing a broken build. A run works when the project's checks pass on what the model delivered. Together the runs cost $4.80 at list prices. The full results are on the website: ${siteUrl}`,
    ]);
  });

  it("names the recommended model for writing the code with its numbers", () => {
    expect(report).toContain("Recommended: **alpha**. It works in 2 of 2 runs (100%), about $0.40 and 2 minutes a run. Only 2 runs so far, so treat it as a hint.");
  });

  it("shows the table of the top models for writing the code with its cost per working result", () => {
    expect(report).toContain("| alpha | 2 of 2 runs (100%) | $0.40 | 2 min | 4.0 of 5 | $0.40 |");
  });

  it("leaves the AI reviewer score out of the table for writing the tests", () => {
    expect(report.split("## Write the tests")[1]?.split("## Write the code")[0]).toContain("| Model | Works | Usual cost | Usual time | Cost per working result |");
  });

  it("states the website address is missing when none is given", () => {
    expect(renderReport({ runs, generatedAt, siteUrl: null })).toContain("<website address not set: pass --site-url or set LOOP_BENCH_SITE_URL>");
  });

  it("counts the run with no cost in the limits", () => {
    expect(report).toContain("- 1 run of 5 have no recorded cost and are left out of the cost figures.");
  });

  it("uses none of the bench jargon", () => {
    expect(report.match(FORBIDDEN)).toEqual(null);
  });

  it("says no runs have finished when there are none", () => {
    expect(renderReport({ runs: [], generatedAt, siteUrl })).toEqual("# Which AI model should do which job\n\nNo runs have finished yet.\n");
  });
});

describe("cellsOf", () => {
  const loop = (replicate: number): LoopRecord => ({
    kind: "loop", experiment_id: "e", loop_id: `x${replicate}`, cell_path: "p", ticket: 93, mode: "ofat", varied_station: "dod",
    assignments: { dod: { harness: "claude", model: "opus" }, "tdd-round": { harness: "claude", model: "sonnet" }, "repair-build": { harness: "gemini", model: "pro" } },
    prompt_variant: "baseline", context_mode: "none", replicate, end_reason: "green", rounds: 2, repairs: 0, reached_green: true, total_cost_usd: 1, total_wall_ms: 60_000,
    total_usage: EMPTY_USAGE, structural: null, dod_check: null, judge: null, final_head_sha: null, started_at: "", finished_at: "",
  });

  it("folds two repeats of one setup into one cell holding both", () => {
    expect(cellsOf([loop(1), loop(2)]).map((cell) => cell.loops.length)).toEqual([2]);
  });
});
