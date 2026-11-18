import { describe, expect, it } from "vitest";
import { cheapnessScores, costPerWorkingResult, lowestBy, minutesPerWorkingResult, rank, ranked, reliableChoices, splitByCoverage, summarizeModels, ticketAveragedSuccessRate, worksAsOftenAsBest, type ModelSummary, type RankableRun } from "./ranking.js";
import * as siteRank from "../../site/js/rank.js";

const run = (model: string, overrides: Partial<RankableRun> = {}): RankableRun => ({
  task: "tdd-round", ticket: 1, harness: "claude", model, success: true, costUsd: 1, minutes: 2, correctness: 4, completeness: 2, closeness: 3, ...overrides,
});
const summary = (model: string, overrides: Partial<ModelSummary> = {}): ModelSummary => ({
  task: "tdd-round", harness: "claude", model, runs: 10, successes: 10, successRate: 1, tickets: [1], costUsd: { median: 1, p25: 1, p75: 1 }, costUnknownRuns: 0, minutes: { median: 10, p25: 10, p75: 10 }, review: null, costPerSuccessUsd: 1, minutesPerSuccess: 10, strength: "measured", ...overrides,
});
const names = (rows: readonly { model: string }[]): string[] => rows.map((row) => row.model);

describe("summarizeModels", () => {
  it("summarises two runs of one model into counts, median cost and mean reviewer score", () => {
    expect(summarizeModels([run("m", { costUsd: 1 }), run("m", { success: false, costUsd: 3 })])).toEqual([{
      task: "tdd-round", harness: "claude", model: "m", runs: 2, successes: 1, successRate: 0.5, tickets: [1],
      costUsd: { median: 2, p25: 1.5, p75: 2.5 }, costUnknownRuns: 0, minutes: { median: 2, p25: 2, p75: 2 }, review: 3, costPerSuccessUsd: 4, minutesPerSuccess: 4, strength: "few",
    }]);
  });

  it("counts a run with no recorded cost and leaves it out of the median", () => {
    const [row] = summarizeModels([run("m", { costUsd: null }), run("m", { costUsd: 2 }), run("m", { costUsd: 4 })]);

    expect([row?.costUnknownRuns, row?.costUsd?.median]).toEqual([1, 3]);
  });

  it("drops the reviewer score when reviewed is false", () => {
    expect(summarizeModels([run("m")], { reviewed: false }).map((row) => row.review)).toEqual([null]);
  });
});

describe("ticketAveragedSuccessRate", () => {
  it("averages a share of 1 on one ticket and 0 on another into 0.5 however often each ran", () => {
    const runs = [run("m"), run("m"), run("m"), run("m", { ticket: 2, success: false })];

    expect(ticketAveragedSuccessRate(runs)).toEqual(0.5);
  });
});

describe("per working result", () => {
  const runs = [run("m", { costUsd: 2, minutes: 10 }), run("m", { costUsd: 4, minutes: 20, success: false }), run("m", { costUsd: null, success: false }), run("m", { costUsd: null, success: true })];

  it("multiplies the mean known cost by all runs and divides by working runs", () => {
    expect(costPerWorkingResult(runs)).toEqual(6);
  });

  it("multiplies the mean minutes by all runs and divides by working runs", () => {
    expect(minutesPerWorkingResult(runs)).toEqual(17);
  });

  it("is empty when no run worked", () => {
    expect(costPerWorkingResult([run("m", { success: false })])).toEqual(null);
  });
});

describe("splitByCoverage", () => {
  it("lists a model with no run on the large ticket as not run on the large ticket", () => {
    const rows = [summary("all", { tickets: [1, 3] }), summary("partial", { tickets: [1] })];
    const { fullyTested, notFullyTested } = splitByCoverage(rows, { 1: "small", 3: "large" });

    expect([names(fullyTested), notFullyTested.map((row) => row.missingText)]).toEqual([["all"], ["not run on the large ticket"]]);
  });

  it("names two missing small tickets by count", () => {
    const { notFullyTested } = splitByCoverage([summary("all", { tickets: [1, 2, 3] }), summary("partial", { tickets: [3] })], { 1: "small", 2: "small", 3: "large" });

    expect(notFullyTested.map((row) => row.missingText)).toEqual(["not run on 2 small tickets"]);
  });
});

describe("ranked", () => {
  it("puts the cheaper of two equally reliable models first when only price counts", () => {
    const rows = [summary("dear", { costUsd: { median: 4, p25: 4, p75: 4 } }), summary("cheap", { costUsd: { median: 0.5, p25: 0.5, p75: 0.5 } })];

    expect(names(ranked(rows, { quality: 0, price: 1, speed: 0 }))).toEqual(["cheap", "dear"]);
  });

  it("puts a model that never worked after one that did even when it is cheapest", () => {
    const rows = [summary("broken", { successes: 0, successRate: 0, costUsd: { median: 0.01, p25: 0.01, p75: 0.01 } }), summary("works", { costUsd: { median: 5, p25: 5, p75: 5 } })];

    expect(names(ranked(rows, { quality: 0, price: 1, speed: 0 }))).toEqual(["works", "broken"]);
  });

  it("puts a few-runs model after a measured one even when it scores higher", () => {
    const rows = [summary("lucky", { runs: 1, strength: "few" }), summary("proven", { costUsd: { median: 5, p25: 5, p75: 5 } })];

    expect(names(ranked(rows, { quality: 1, price: 1, speed: 1 }))).toEqual(["proven", "lucky"]);
  });

  it("scores a model with no cost 0 on price", () => {
    expect(rank([summary("known"), summary("unknown", { costUsd: null, minutes: null })], { quality: 1, price: 1, speed: 1 }).map((row) => row.score)).toEqual([1, 1 / 3]);
  });

  it("scores 1 for the cheapest and 0 for the dearest of three models", () => {
    expect(cheapnessScores([0.1, 1, 10]).map((score) => Math.round(score * 100) / 100)).toEqual([1, 0.5, 0]);
  });
});

describe("reliableChoices", () => {
  const rows = [
    summary("reliable", { successRate: 0.9, costPerSuccessUsd: 5, minutesPerSuccess: 20 }),
    summary("thrifty", { successRate: 0.7, costPerSuccessUsd: 1, minutesPerSuccess: 30 }),
    summary("quick", { successRate: 0.68, costPerSuccessUsd: 3, minutesPerSuccess: 4 }),
    summary("unreliable", { successRate: 0.3, costPerSuccessUsd: 0.1, minutesPerSuccess: 1 }),
  ];

  it("picks the cheapest and the fastest among models that work at least three quarters as often as the best", () => {
    const { best, cheapest, fastest } = reliableChoices(rows);

    expect([best?.model, cheapest?.model, fastest?.model]).toEqual(["reliable", "thrifty", "quick"]);
  });

  it("leaves out a model with no working run from those that still work", () => {
    expect(names(worksAsOftenAsBest([summary("never", { successRate: 0 }), summary("sometimes", { successRate: 0.1 })], (row) => row.successRate))).toEqual(["sometimes"]);
  });

  it("finds no lowest value when none is known", () => {
    expect(lowestBy([summary("a", { costPerSuccessUsd: null })], (row) => row.costPerSuccessUsd)).toEqual(null);
  });
});

describe("agreement with site/js/rank.js", () => {
  const ticketRuns: RankableRun[] = [
    run("alpha", { ticket: 1, costUsd: 0.5, minutes: 3 }), run("alpha", { ticket: 1, success: false, costUsd: 0.7, minutes: 4 }), run("alpha", { ticket: 2, costUsd: 0.6 }),
    run("beta", { ticket: 1, costUsd: 4, minutes: 1, correctness: 5, completeness: 5, closeness: 4 }), run("beta", { ticket: 2, costUsd: 5, minutes: 2 }), run("beta", { ticket: 2, success: false, costUsd: null }),
    run("gamma", { ticket: 1, costUsd: 0.05, minutes: 9, success: false }), run("gamma", { ticket: 2, costUsd: 0.07, minutes: 12, success: false, correctness: null }),
    run("delta", { ticket: 1, costUsd: 1, minutes: 5, correctness: 1, completeness: 2, closeness: 1 }),
  ];
  const weightings = [{ quality: 6, price: 2, speed: 2 }, { quality: 0, price: 1, speed: 0 }, { quality: 1, price: 0, speed: 3 }, { quality: 0, price: 0, speed: 0 }];

  it.each(weightings)("orders and scores four models the same for weights %o", (weights) => {
    const ours = ranked(summarizeModels(ticketRuns), weights).map(({ model, score }) => ({ model, score }));
    const theirs = siteRank.ranked(siteRank.summarizeModels(ticketRuns), weights).map(({ model, score }) => ({ model, score }));

    expect(ours).toEqual(theirs);
  });

  it("picks the same cheapest and fastest model that still works", () => {
    const pick = (choices: { cheapest: { model: string } | null; fastest: { model: string } | null }): (string | undefined)[] => [choices.cheapest?.model, choices.fastest?.model];

    expect(pick(reliableChoices(summarizeModels(ticketRuns)))).toEqual(pick(siteRank.reliableChoices(siteRank.summarizeModels(ticketRuns))));
  });

  it("summarises runs into the same per-model numbers", () => {
    expect(summarizeModels(ticketRuns)).toEqual(siteRank.summarizeModels(ticketRuns));
  });
});
