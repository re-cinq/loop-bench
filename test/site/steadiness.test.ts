import { describe, expect, it } from "vitest";
import { failureCounts, groupSetups, knowledgeSentence, steadinessSentences, type SteadyRun } from "../../site/js/steadiness.js";

const run = (setup: string, replicate: number, over: Partial<SteadyRun> = {}): SteadyRun => ({
  setup, task: "tdd-round", knowledgeBase: "none", ticket: 93, size: "small", replicate, success: true, costUsd: 1, minutes: 10, endReason: "green", ...over,
});

describe("groupSetups", () => {
  it("orders the runs of a setup by run number and keeps setups apart", () => {
    const groups = groupSetups([run("a", 3), run("b", 1), run("a", 1), run("a", 2)]);
    const labelsOf = (group: { runs: SteadyRun[] }) => group.runs.map((item) => `${item.setup}${item.replicate}`);
    expect(groups.map(labelsOf)).toEqual([["a1", "a2", "a3"], ["b1"]]);
  });
});

describe("steadinessSentences", () => {
  it("says steadiness cannot be judged when every setup has one run", () => {
    expect(steadinessSentences(groupSetups([run("a", 1), run("b", 1)]))).toEqual(["No setup was run more than once, so how steady this model is cannot be judged yet."]);
  });

  it("counts always-worked, never-worked and flipped setups among setups with 2+ runs", () => {
    const runs = [
      run("always", 1), run("always", 2),
      run("never", 1, { success: false }), run("never", 2, { success: false }),
      run("flips", 1), run("flips", 2, { success: false }),
      run("single", 1),
    ];
    expect(steadinessSentences(groupSetups(runs))[0]).toEqual("Of 3 setups run 2 or more times, every run ended the same way in 2 (1 always worked, 1 never did), and the result flipped between working and not working in 1.");
  });

  it("says no setup gave the same result when all flipped", () => {
    const runs = [run("flips", 1), run("flips", 2, { success: false })];
    expect(steadinessSentences(groupSetups(runs))[0]).toEqual("Of 1 setup run 2 or more times, no setup gave the same result every time, and the result flipped between working and not working in 1.");
  });

  it("reports the usual and widest cost and time ratio between repeats", () => {
    const runs = [
      run("a", 1, { costUsd: 1, minutes: 10 }), run("a", 2, { costUsd: 2, minutes: 30 }),
      run("b", 1, { costUsd: 1, minutes: 10 }), run("b", 2, { costUsd: 4, minutes: 20 }),
      run("c", 1, { costUsd: 1, minutes: 10 }), run("c", 2, { costUsd: 3, minutes: 10 }),
    ];
    expect(steadinessSentences(groupSetups(runs)).slice(1)).toEqual([
      "The dearest repeat of a setup usually costs about 3.0x the cheapest (widest gap 4.0x).",
      "The slowest repeat of a setup usually takes about 2.0x as long as the fastest (widest gap 3.0x).",
    ]);
  });

  it("says cost barely changes when repeats cost the same", () => {
    const runs = [run("a", 1), run("a", 2)];
    expect(steadinessSentences(groupSetups(runs)).slice(1)).toEqual(["Cost barely changes between repeats of the same setup.", "Time barely changes between repeats of the same setup."]);
  });

  it("skips the cost sentence when repeats have no known cost", () => {
    const runs = [run("a", 1, { costUsd: null }), run("a", 2, { costUsd: 2 }), run("a", 3, { costUsd: null })];
    expect(steadinessSentences(groupSetups(runs)).length).toEqual(2);
  });
});

describe("failureCounts", () => {
  it("counts end reasons of runs that did not work, per task", () => {
    const runs = [
      run("a", 1), run("a", 2, { success: false, endReason: "retry_budget" }), run("a", 3, { success: false, endReason: "retry_budget" }),
      run("b", 1, { task: "dod", success: false, endReason: "dod_scoped_out" }),
    ];
    expect(failureCounts(runs)).toEqual({ "tdd-round": { retry_budget: 2 }, dod: { dod_scoped_out: 1 } });
  });
});

describe("knowledgeSentence", () => {
  const difference = (success: number, cost: number, minutes: number) => ({
    runsWithout: 25, runsWithKb: 5,
    successRate: { without: 0.72, withKb: 0.8, delta: success }, medianCostUsd: { without: 1, withKb: 1, delta: cost }, medianMinutes: { without: 10, withKb: 10, delta: minutes },
  });

  it("says works 8 points more often and cheaper and faster when all deltas improve", () => {
    expect(knowledgeSentence(difference(0.08, -0.4, -3), "Lore")).toEqual("With Lore it works 8 points more often (80% against 72%); a usual run is $0.40 cheaper and 3 min faster.");
  });

  it("says works about as often with no extras when differences round to zero", () => {
    expect(knowledgeSentence(difference(0.001, 0.001, 0.2), "Utopia")).toEqual("With Utopia it works about as often (80%).");
  });
});
