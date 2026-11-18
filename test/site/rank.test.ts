import { describe, expect, it } from "vitest";
import { cheapnessScores, lowestBy, minutesPerWorkingResult, reliableChoices, worksAsOftenAsBest, costPerWorkingResult, missingText, splitByCoverage, ticketAveragedSuccessRate, normalizeWeights, qualityOf, rank, ranked, summarizeModels } from "../../site/js/rank.js";

const spread = (median: number) => ({ median, p25: median, p75: median });
const modelRow = (name: string, over: Record<string, unknown> = {}) => ({
  harness: "claude", model: name, tickets: [1], costUnknownRuns: 0, costPerSuccessUsd: null, minutesPerSuccess: null, runs: 10, successes: 10, successRate: 1, costUsd: spread(1), minutes: spread(10), review: null, strength: "measured", ...over,
});
const names = (rows: { model: string }[]) => rows.map((row) => row.model);

describe("rank", () => {
  it("ranks the cheaper of two equally reliable models first when price weight is 1", () => {
    const rows = [modelRow("dear", { costUsd: spread(4) }), modelRow("cheap", { costUsd: spread(0.5) })];
    expect(names(ranked(rows, { quality: 0, price: 1, speed: 0 }))).toEqual(["cheap", "dear"]);
  });

  it("ranks the more reliable of two equally priced models first when quality weight is 1", () => {
    const rows = [modelRow("flaky", { successes: 4, successRate: 0.4 }), modelRow("steady")];
    expect(names(ranked(rows, { quality: 1, price: 0, speed: 0 }))).toEqual(["steady", "flaky"]);
  });

  it("ranks the faster of two equally reliable models first when speed weight is 1", () => {
    const rows = [modelRow("slow", { minutes: spread(30) }), modelRow("quick", { minutes: spread(2) })];
    expect(names(ranked(rows, { quality: 0, price: 0, speed: 1 }))).toEqual(["quick", "slow"]);
  });

  it("scores 1 for the cheapest and 0 for the dearest of three models", () => {
    expect(cheapnessScores([0.1, 1, 10]).map((score) => Math.round(score * 100) / 100)).toEqual([1, 0.5, 0]);
  });

  it("scores 1 for every model when all costs are equal", () => {
    expect(cheapnessScores([2, 2])).toEqual([1, 1]);
  });

  it("scores a model with no cost 0 and keeps scores finite", () => {
    const scores = rank([modelRow("known"), modelRow("unknown", { costUsd: null, minutes: null })], { quality: 1, price: 1, speed: 1 }).map((row) => row.score);
    expect(scores).toEqual([1, 1 / 3]);
  });

  it("scores the same for weights 1, 1, 1 and 5, 5, 5", () => {
    const rows = [modelRow("a", { costUsd: spread(3) }), modelRow("b")];
    expect(rank(rows, { quality: 5, price: 5, speed: 5 })).toEqual(rank(rows, { quality: 1, price: 1, speed: 1 }));
  });

  it("normalises all-zero weights to equal thirds", () => {
    expect(normalizeWeights({ quality: 0, price: 0, speed: 0 })).toEqual({ quality: 1 / 3, price: 1 / 3, speed: 1 / 3 });
  });

  it("never ranks a model with no working run first even when it is the cheapest", () => {
    const rows = [modelRow("broken", { successes: 0, successRate: 0, costUsd: spread(0.01) }), modelRow("works", { costUsd: spread(5) })];
    expect(names(ranked(rows, { quality: 0, price: 1, speed: 0 }))).toEqual(["works", "broken"]);
  });

  it("ranks a few-runs model after a measured one even when it scores higher", () => {
    const rows = [modelRow("lucky", { runs: 1, successes: 1, strength: "few", costUsd: spread(0.1) }), modelRow("proven", { costUsd: spread(5) })];
    expect(names(ranked(rows, { quality: 1, price: 1, speed: 1 }))).toEqual(["proven", "lucky"]);
  });

  it("blends a perfect success rate with a reviewer score of 3 into a quality of 0.85", () => {
    expect(qualityOf(modelRow("a", { review: 3 }))).toBeCloseTo(0.85);
  });

  it("scores 1 for the best and 0 for the worst quality among the compared models", () => {
    const scores = rank([modelRow("good"), modelRow("poor", { successes: 5, successRate: 0.5 })], { quality: 1, price: 0, speed: 0 }).map((row) => row.score);
    expect(scores).toEqual([1, 0]);
  });
});

describe("summarizeModels", () => {
  const run = (model: string, success: boolean, costUsd: number | null, ticket = 1) => ({ task: "dod", ticket, harness: "claude", model, success, costUsd, minutes: 2, correctness: 4, completeness: 2, closeness: 3 });

  it("summarises two runs of one model into counts, median cost and mean reviewer score", () => {
    expect(summarizeModels([run("m", true, 1), run("m", false, 3)])).toEqual([{
      task: "dod", harness: "claude", model: "m", runs: 2, successes: 1, successRate: 0.5, tickets: [1],
      costUsd: { median: 2, p25: 1.5, p75: 2.5 }, costUnknownRuns: 0, minutes: { median: 2, p25: 2, p75: 2 }, review: 3, costPerSuccessUsd: 4, minutesPerSuccess: 4, strength: "few",
    }]);
  });

  it("leaves cost per working result empty when no run worked", () => {
    expect(summarizeModels([run("m", false, 1)]).map((row) => row.costPerSuccessUsd)).toEqual([null]);
  });

  it("counts runs with no recorded cost and leaves them out of the median", () => {
    const [row] = summarizeModels([run("m", true, null), run("m", true, 2), run("m", true, 4)]);
    expect([row?.costUnknownRuns, row?.costUsd?.median]).toEqual([1, 3]);
  });

  it("drops the reviewer score when reviewed is false", () => {
    expect(summarizeModels([run("m", true, 1)], { reviewed: false }).map((row) => row.review)).toEqual([null]);
  });
});

describe("ticketAveragedSuccessRate", () => {
  const onTicket = (ticket: number, success: boolean) => ({ ticket, success });

  it("averages per-ticket shares of 1 for three runs on one ticket and 0 for one run on another into 0.5", () => {
    expect(ticketAveragedSuccessRate([onTicket(1, true), onTicket(1, true), onTicket(1, true), onTicket(2, false)])).toEqual(0.5);
  });
});

describe("costPerWorkingResult", () => {
  it("multiplies the mean known cost by all runs and divides by working runs", () => {
    const runs = [{ costUsd: 2, success: true }, { costUsd: 4, success: false }, { costUsd: null, success: false }, { costUsd: null, success: true }];
    expect(costPerWorkingResult(runs)).toEqual(6);
  });
});

describe("splitByCoverage", () => {
  const sizes = { 1: "small", 2: "small", 3: "large" };

  it("lists a model with no run on the large ticket as not run on the large ticket and keeps the others ranked", () => {
    const rows = [modelRow("all", { tickets: [1, 3] }), modelRow("partial", { tickets: [1] })];
    const { fullyTested, notFullyTested } = splitByCoverage(rows, sizes);
    expect([names(fullyTested), notFullyTested.map((row) => row.missingText)]).toEqual([["all"], ["not run on the large ticket"]]);
  });

  it("names two missing small tickets by count", () => {
    expect(missingText([1, 2], sizes)).toEqual("not run on 2 small tickets");
  });
});

describe("reliableChoices", () => {
  const row = (name: string, successRate: number, costPerSuccessUsd: number, minutesPerSuccess: number, over: Record<string, unknown> = {}) =>
    modelRow(name, { successRate, successes: 1, costPerSuccessUsd, minutesPerSuccess, ...over });

  it("picks the cheapest and the fastest among models that work at least three quarters as often as the best", () => {
    const rows = [row("best", 0.9, 5, 20), row("close", 0.7, 2, 30), row("rare", 0.64, 0.1, 1), row("quick", 0.8, 4, 3)];
    expect(reliableChoices(rows)).toMatchObject({ best: { model: "best" }, cheapest: { model: "close" }, fastest: { model: "quick" } });
  });

  it("leaves out rows with few runs", () => {
    expect(reliableChoices([row("best", 0.9, 5, 20), row("lucky", 1, 1, 1, { strength: "few" })]).cheapest).toMatchObject({ model: "best" });
  });

  it("finds no choice when no row works", () => {
    expect(reliableChoices([row("none", 0, 5, 5)])).toMatchObject({ cheapest: null, fastest: null });
  });
});

describe("worksAsOftenAsBest and lowestBy", () => {
  it("keeps values from three quarters of the best up", () => {
    expect(worksAsOftenAsBest([0.4, 0.75, 1, 0.74], (value) => value)).toEqual([0.75, 1]);
  });

  it("returns nothing when none works", () => {
    expect(worksAsOftenAsBest([0, 0], (value) => value)).toEqual([]);
  });

  it("takes the smallest known value and ignores missing ones", () => {
    expect(lowestBy([{ v: null }, { v: 3 }, { v: 2 }], (item) => item.v)).toEqual({ v: 2 });
  });

  it("returns null when every value is missing", () => {
    expect(lowestBy([{ v: null }], (item) => item.v)).toBeNull();
  });
});

describe("minutesPerWorkingResult", () => {
  it("is the mean minutes times all runs over the runs that worked", () => {
    expect(minutesPerWorkingResult([{ minutes: 10, success: true }, { minutes: 20, success: false }])).toBe(30);
  });

  it("is null when no run worked", () => {
    expect(minutesPerWorkingResult([{ minutes: 10, success: false }])).toBeNull();
  });
});
