import { describe, expect, it } from "vitest";
import { compactMinutes, isSortKey, leaderSentence, segmentCounts, sortEntries, trackPositions, type CardEntry } from "../../site/js/modelcards.js";
import type { SteadyRun } from "../../site/js/steadiness.js";

const run = (setup: string, replicate: number, success: boolean): SteadyRun => ({ setup, task: "dod", knowledgeBase: "none", ticket: 93, size: "small", replicate, success, costUsd: 1, minutes: 1, endReason: "green" });
const figures = (share: number, cost: number | null = 1, ranked = true) => ({ share, cost, minutes: cost, ranked });
const entry = (model: string, maker: string, tasks: CardEntry["tasks"]): CardEntry => ({ key: model, model, maker, tasks });
const names = (entries: CardEntry[]) => entries.map((item) => item.model);

describe("segmentCounts", () => {
  it("counts always-working, flipping and never-working setups, a single run counting by its result", () => {
    const runs = [run("a", 1, true), run("a", 2, true), run("b", 1, true), run("b", 2, false), run("c", 1, false), run("c", 2, false), run("d", 1, true), run("e", 1, false)];
    expect(segmentCounts(runs)).toEqual({ always: 2, flips: 1, never: 2 });
  });
});

describe("trackPositions", () => {
  it("places the smallest at 0, the largest at 1 and the geometric middle at 0.5", () => {
    expect(trackPositions([0.1, 1, 10]).map((place) => Math.round((place ?? 0) * 100) / 100)).toEqual([0, 0.5, 1]);
  });

  it("keeps null as null and puts equal values in the middle", () => {
    expect(trackPositions([2, null, 2])).toEqual([0.5, null, 0.5]);
  });
});

describe("sortEntries", () => {
  const entries = [
    entry("b", "Google", { "tdd-round": figures(0.5, 2) }),
    entry("a", "Google", { "tdd-round": figures(0.9, 5) }),
    entry("c", "Anthropic", { dod: figures(1) }),
  ];

  it("puts the highest share first and models without the task last", () => {
    expect(names(sortEntries(entries, "works:tdd-round"))).toEqual(["a", "b", "c"]);
  });

  it("puts the cheapest first for cost", () => {
    expect(names(sortEntries(entries, "cost:tdd-round"))).toEqual(["b", "a", "c"]);
  });

  it("orders by maker and then name", () => {
    expect(names(sortEntries(entries, "name"))).toEqual(["c", "a", "b"]);
  });

  it("breaks a tie by name", () => {
    const tied = [entry("z", "Google", { dod: figures(1) }), entry("y", "Google", { dod: figures(1) })];
    expect(names(sortEntries(tied, "works:dod"))).toEqual(["y", "z"]);
  });
});

describe("isSortKey", () => {
  it.each([["works:dod", true], ["time:repair-build", true], ["name", true], ["price", false], [undefined, false]])("%s gives %s", (key, expected) => {
    expect(isSortKey(key)).toEqual(expected);
  });
});

describe("leaderSentence", () => {
  it("names the model that works most often per task, skipping models that were not fully tested", () => {
    const entries = [
      entry("a", "Google", { dod: figures(0.7), "tdd-round": figures(0.9) }),
      entry("b", "Google", { dod: figures(0.8), "tdd-round": figures(0.95, 1, false) }),
    ];
    expect(leaderSentence(entries)).toEqual("For writing the tests, b works most often, 80% of the time; for writing the code, a works most often, 90% of the time. Models that skipped a ticket are left out of this.");
  });

  it("says when models are level", () => {
    const entries = [entry("a", "Google", { dod: figures(1) }), entry("b", "Google", { dod: figures(1) })];
    expect(leaderSentence(entries)).toContain("(level with 1 other)");
  });

  it("says nothing to compare when no model is ranked", () => {
    expect(leaderSentence([entry("a", "Google", { dod: figures(1, 1, false) })])).toEqual("There are no results to compare yet.");
  });
});

describe("compactMinutes", () => {
  it.each([[null, "–"], [0.4, "under 1 min"], [15.6, "16 min"]])("%s gives %s", (value, text) => {
    expect(compactMinutes(value)).toEqual(text);
  });
});
