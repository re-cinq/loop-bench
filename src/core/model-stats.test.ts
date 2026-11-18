import { describe, expect, it } from "vitest";
import { modelStatsOf, strengthOf } from "./model-stats.js";
import type { LoopRecord, StationRunRecord } from "./records.js";
import { EMPTY_USAGE } from "./usage.js";

const loop = (overrides: Partial<LoopRecord>): LoopRecord => ({
  kind: "loop",
  experiment_id: "e",
  loop_id: "x",
  cell_path: "p",
  ticket: 93,
  mode: "ofat",
  varied_station: "tdd-round",
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
  judge: { correctness: 4, completeness_vs_ticket: 2, closeness_to_reference: 3, rationale: "", model: "j" },
  final_head_sha: null,
  started_at: "",
  finished_at: "",
  ...overrides,
});

const repairVisit = (loopId: string, green: boolean | null, runId = `${loopId}-v`): StationRunRecord =>
  ({ kind: "station_run", loop_id: loopId, run_id: runId, station: "repair-build", wall_ms: 0, usage: EMPTY_USAGE, ci: green === null ? null : { green, failed_checks: [], head_sha: "", wall_ms: 0 } }) as StationRunRecord;

const tiers = { 93: "small", 37: "medium" } as const;
const statsOf = (loops: LoopRecord[], stationRuns: StationRunRecord[] = []) => modelStatsOf({ loops, stationRuns, tiers });

const fiveRuns = [1, 2, 3, 4, 5].map((n) => loop({ loop_id: `l${n}`, replicate: n, reached_green: n <= 4, total_cost_usd: n, total_wall_ms: n * 60_000, rounds: n, end_reason: n <= 4 ? "green" : "round_budget" }));

describe("modelStatsOf", () => {
  it("counts 4 of 5 green runs as success 4 with medians 3 and quartiles 2 to 4", () => {
    const [setup] = statsOf(fiveRuns).setups;

    expect(setup).toEqual({
      task: "tdd-round",
      harness: "claude",
      model: "sonnet",
      knowledgeBase: "none",
      ticket: 93,
      size: null,
      runs: 5,
      successes: 4,
      successRate: 0.8,
      costUsd: { median: 3, p25: 2, p75: 4 },
      minutes: { median: 3, p25: 2, p75: 4 },
      correctness: 4,
      completeness: 2,
      closeness: 3,
      roundsMedian: 3,
      endReasons: { green: 4, round_budget: 1 },
      costUnknownRuns: 0,
      costPerSuccessUsd: 15 / 4,
      strength: "measured",
    });
  });

  it("scores a dod run as success only when red on base and green with the reference", () => {
    const check = (red: boolean | null, green: boolean | null) => ({ acceptance_files: [], red_on_base: red, green_with_reference: green, detail: "" });
    const loops = [check(true, true), check(true, false), check(false, true), check(null, null)].map((dod_check, index) => loop({ loop_id: `d${index}`, varied_station: "dod", dod_check }));

    expect(statsOf(loops).runs.map((run) => run.success)).toEqual([true, false, false, false]);
  });

  it("scores a repair-build run by the last repair visit that got a CI result and leaves out a loop with no repair visit", () => {
    const loops = ["a", "b", "c", "d"].map((id) => loop({ loop_id: id, varied_station: "repair-build" }));
    const visits = [repairVisit("a", true), repairVisit("b", false, "b1"), repairVisit("b", true, "b2"), repairVisit("b", null, "b3"), repairVisit("c", false)];
    const stats = statsOf(loops, visits);

    expect({ ran: stats.runs.map((run) => [run.loopId, run.success]), leftOut: stats.leftOut }).toEqual({
      ran: [["a", true], ["b", true], ["c", false]],
      leftOut: { otherPromptVariant: 0, repairNeverRan: 1 },
    });
  });

  it("keeps a non-baseline prompt variant out of the numbers and counts it as left out", () => {
    const stats = statsOf([loop({ loop_id: "a" }), loop({ loop_id: "b", prompt_variant: "short", varied_station: "dod" })]);

    expect({ runs: stats.runs.length, leftOut: stats.leftOut }).toEqual({ runs: 1, leftOut: { otherPromptVariant: 1, repairNeverRan: 0 } });
  });

  it("rolls 3 tickets of 2 sizes up to a small row of 2 runs, a medium row of 1 and one model row of 3", () => {
    const loops = [loop({ loop_id: "a", ticket: 93 }), loop({ loop_id: "b", ticket: 93 }), loop({ loop_id: "c", ticket: 37 }), loop({ loop_id: "u", ticket: 999 })];
    const stats = statsOf(loops);

    expect({ sizes: stats.sizes.map((row) => [row.size, row.runs]), models: stats.models.map((row) => [row.knowledgeBase, row.ticket, row.runs]) }).toEqual({
      sizes: [["small", 2], ["medium", 1]],
      models: [[null, null, 4]],
    });
  });

  it("gives no cost per success for a setup without any success", () => {
    expect(statsOf([loop({ reached_green: false })]).setups[0]?.costPerSuccessUsd).toBeNull();
  });
  it("counts a visit for the 1 minute its CLI reports, not its 12 minutes of wall time, and a visit with no report for its 2 minutes of wall time", () => {
    const visit = (runId: string, wallMs: number, reportedMs: number | null) =>
      ({ kind: "station_run", loop_id: "x", run_id: runId, station: "tdd-round", wall_ms: wallMs, usage: { ...EMPTY_USAGE, reported_duration_ms: reportedMs }, ci: null }) as StationRunRecord;

    expect(statsOf([loop({ total_wall_ms: 2_400_000 })], [visit("v1", 720_000, 60_000), visit("v2", 120_000, null)]).runs[0]?.minutes).toBe(3);
  });

  it("leaves a run with cost 0 out of the cost figures and counts it as 1 unknown", () => {
    const row = statsOf([loop({ total_cost_usd: 0 }), loop({ total_cost_usd: 2 })]).setups[0];

    expect({ median: row?.costUsd?.median, costUnknownRuns: row?.costUnknownRuns, costPerSuccessUsd: row?.costPerSuccessUsd }).toEqual({ median: 2, costUnknownRuns: 1, costPerSuccessUsd: 2 });
  });


  it("compares Lore with none over the one shared ticket only", () => {
    const loops = [
      loop({ loop_id: "n1", ticket: 93, total_cost_usd: 2 }),
      loop({ loop_id: "n2", ticket: 37, total_cost_usd: 100 }),
      loop({ loop_id: "l1", ticket: 93, context_mode: "lore-mcp", total_cost_usd: 3, reached_green: false }),
    ];

    expect(statsOf(loops).knowledgeDifferences).toEqual([
      {
        task: "tdd-round",
        harness: "claude",
        model: "sonnet",
        knowledgeBase: "lore-mcp",
        tickets: [93],
        runsWithout: 1,
        runsWithKb: 1,
        successRate: { without: 1, withKb: 0, delta: -1 },
        medianCostUsd: { without: 2, withKb: 3, delta: 1 },
        medianMinutes: { without: 1, withKb: 1, delta: 0 },
      },
    ]);
  });
});

describe("strengthOf", () => {
  it("labels 0 runs none, 4 runs few and 5 runs measured", () => {
    expect([0, 4, 5].map(strengthOf)).toEqual(["none", "few", "measured"]);
  });
});
