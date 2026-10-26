import { describe, expect, it } from "vitest";
import type { Station } from "./harness-names.js";
import type { Outcome } from "./result-line.js";
import { cutBeforeOtherStations, initialState, nextStep, type LoopState, type StationEvent } from "./routing.js";

const agent = (station: Station, outcome: Outcome): StationEvent => ({
  kind: "agent",
  station,
  outcome,
});
const ci = (green: boolean, headSha: string): StationEvent => ({ kind: "ci", green, headSha });

function walk(events: readonly StationEvent[], start: LoopState = initialState("dod")) {
  return events.reduce(
    (acc, event) => {
      const { state, step } = nextStep(acc.state, event);

      return { state, steps: [...acc.steps, step] };
    },
    { state: start, steps: [] as ReturnType<typeof nextStep>["step"][] },
  );
}

describe("nextStep", () => {
  it("dod success runs tdd-round; a green CI after it ends the loop as green", () => {
    expect(walk([agent("dod", "success"), agent("tdd-round", "success"), ci(true, "a1")]).steps).toEqual([
      { kind: "run", station: "tdd-round" },
      { kind: "ci" },
      { kind: "done", reason: "green" },
    ]);
  });

  it("dod changes_requested ends the loop as dod_scoped_out", () => {
    expect(walk([agent("dod", "changes_requested")]).steps).toEqual([{ kind: "done", reason: "dod_scoped_out" }]);
  });

  it("a failed station retries itself once, then ends on retry_budget", () => {
    expect(walk([agent("dod", "failed"), agent("dod", "failed")]).steps).toEqual([
      { kind: "run", station: "dod" },
      { kind: "done", reason: "retry_budget" },
    ]);
  });

  it("red CI on a new head sends the loop back to tdd-round and counts a round", () => {
    const { state, steps } = walk([agent("dod", "success"), agent("tdd-round", "changes_requested"), ci(false, "b2")]);

    expect(steps.at(-1)).toEqual({ kind: "run", station: "tdd-round" });
    expect(state).toMatchObject({ rounds: 1, repairs: 0, lastRedSha: "b2" });
  });

  it("red CI on the same head twice goes to repair-build, and a third time ends on repair_budget", () => {
    const start = { ...initialState("tdd-round"), lastRedSha: "same" };
    const events = [
      agent("tdd-round", "success"), ci(false, "same"),
      agent("repair-build", "success"), ci(false, "same"),
      agent("repair-build", "success"), ci(false, "same"),
    ];

    expect(walk(events, start).steps.filter((step) => step.kind !== "ci")).toEqual([
      { kind: "run", station: "repair-build" },
      { kind: "run", station: "repair-build" },
      { kind: "done", reason: "repair_budget" },
    ]);
  });

  it("the thirteenth red round ends on round_budget", () => {
    const start = { ...initialState("tdd-round"), rounds: 12 };

    expect(walk([agent("tdd-round", "success"), ci(false, "new")], start).steps.at(-1)).toEqual({
      kind: "done",
      reason: "round_budget",
    });
  });
});

describe("cutBeforeOtherStations", () => {
  it("ends a dod-varied loop as station_done when the next step is tdd-round", () => {
    expect(cutBeforeOtherStations({ kind: "run", station: "tdd-round" }, "dod")).toEqual({ kind: "done", reason: "station_done" });
  });

  it("keeps a tdd-round-varied loop going when the next step is tdd-round", () => {
    expect(cutBeforeOtherStations({ kind: "run", station: "tdd-round" }, "tdd-round")).toEqual({ kind: "run", station: "tdd-round" });
  });

  it("ends a tdd-round-varied loop as station_done when the next step is repair-build", () => {
    expect(cutBeforeOtherStations({ kind: "run", station: "repair-build" }, "tdd-round")).toEqual({ kind: "done", reason: "station_done" });
  });

  it("keeps the CI step and a finished loop as they are", () => {
    expect([cutBeforeOtherStations({ kind: "ci" }, "dod"), cutBeforeOtherStations({ kind: "done", reason: "green" }, "dod")]).toEqual([
      { kind: "ci" },
      { kind: "done", reason: "green" },
    ]);
  });

  it("never cuts a loop that varies no station", () => {
    expect(cutBeforeOtherStations({ kind: "run", station: "repair-build" }, null)).toEqual({ kind: "run", station: "repair-build" });
  });
});
