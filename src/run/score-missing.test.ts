import { describe, expect, it } from "vitest";
import type { LoopRecord } from "../core/records.js";
import { needsJudge, parseShard, toDodCheck, toJudge } from "./score-missing.js";

const loop = (id: string, judged: boolean) => ({
  cellDir: `/r/${id}`,
  record: { loop_id: id, judge: judged ? { model: "m", correctness: 4, completeness_vs_ticket: 4, closeness_to_reference: 4, rationale: "" } : null } as LoopRecord,
});

describe("toJudge", () => {
  it("skips the judged loop b and deals the other four out between two shards alternately", () => {
    const loops = ["a", "b", "c", "d", "e"].map((id) => loop(id, id === "b"));

    expect(toJudge(loops, { index: 0, count: 2 }).map((l) => l.record.loop_id)).toEqual(["a", "d"]);
    expect(toJudge(loops, { index: 1, count: 2 }).map((l) => l.record.loop_id)).toEqual(["c", "e"]);
  });

  it("a loop with no judge needs one, a judged loop does not", () => {
    expect([needsJudge(loop("a", false).record), needsJudge(loop("b", true).record)]).toEqual([true, false]);
  });
});

describe("toDodCheck", () => {
  const dodLoop = (id: string, overrides: Partial<LoopRecord>) => ({ cellDir: `/r/${id}`, record: { loop_id: id, mode: "ofat", varied_station: "dod", dod_check: null, ...overrides } as LoopRecord });

  it("keeps the unchecked dod loop a and whole loop c, and skips checked loop b and tdd-round loop d", () => {
    const loops = [
      dodLoop("a", {}),
      dodLoop("b", { dod_check: { acceptance_files: [], red_on_base: true, green_with_reference: true, detail: "" } }),
      dodLoop("c", { mode: "whole_loop", varied_station: null }),
      dodLoop("d", { varied_station: "tdd-round" }),
    ];

    expect(toDodCheck(loops, { index: 0, count: 1 }).map((l) => l.record.loop_id)).toEqual(["a", "c"]);
  });
});

describe("parseShard", () => {
  it("reads 1/3, defaults to the whole set, and refuses 3/3", () => {
    expect(parseShard("1/3")).toEqual({ index: 1, count: 3 });
    expect(parseShard(undefined)).toEqual({ index: 0, count: 1 });
    expect(() => parseShard("3/3")).toThrow("--shard takes i/n");
  });
});
