import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  answerSentence, choicesFor, compareChoices, costUnknownText, figureFor, hoursText, indexRuns, mixFromPercents, priceWork, sameModelFor,
  seenMix, sizeRatios, surenessText, totalsOf, wholeSizeMix, workingResult,
  type PricedRun,
} from "../../site/js/estimate.js";

let loopNumber = 0;
interface RunOptions { task?: string; model?: string; size?: string; kb?: string; ticket?: number; success?: boolean; cost?: number | null; minutes?: number }
const ticketOfSize: Record<string, number> = { small: 1, medium: 2, large: 3 };
const run = ({ task = "tdd-round", model = "alpha", size = "small", kb = "none", ticket, success = true, cost = 1, minutes = 10 }: RunOptions = {}): PricedRun => ({
  loopId: `loop-${loopNumber++}`, task, harness: "claude", model, size, knowledgeBase: kb, ticket: ticket ?? ticketOfSize[size], success, costUsd: cost, minutes, correctness: null, completeness: null, closeness: null,
} as PricedRun);
const many = (count: number, options: RunOptions = {}) => Array.from({ length: count }, () => run(options));
const alpha = "claude/alpha";
const beta = "claude/beta";
const query = (over: Record<string, string> = {}) => ({ task: "tdd-round", model: alpha, kb: "none", size: "small", ...over });

describe("figureFor measured runs", () => {
  it("reports share, median and quartiles of cost and minutes for 5 runs with one failure", () => {
    const runs = [1, 2, 3, 4, 5].map((cost) => run({ cost, minutes: cost * 10, success: cost !== 5 }));
    expect(figureFor(indexRuns(runs), query())).toEqual({
      basis: "measured", runs: 5, successes: 4, share: 0.8, costUnknownRuns: 0,
      cost: { median: 3, p25: 2, p75: 4 }, minutes: { median: 30, p25: 20, p75: 40 },
    });
  });

  it("labels 3 runs few runs and 5 runs measured", () => {
    expect([3, 5].map((count) => figureFor(indexRuns(many(count)), query()).basis)).toEqual(["few", "measured"]);
  });

  it("leaves unknown costs out of the cost median and counts them", () => {
    const runs = [run({ cost: 2 }), run({ cost: 4 }), run({ cost: null }), run({ cost: null }), run({ cost: 6 })];
    expect(figureFor(indexRuns(runs), query())).toMatchObject({ costUnknownRuns: 2, cost: { median: 4 }, minutes: { median: 10 } });
  });

  it("gives no cost when every cost is unknown", () => {
    expect(figureFor(indexRuns(many(4, { cost: null })), query())).toMatchObject({ basis: "few", cost: null });
  });

  it("uses only runs of the asked knowledge base when it has 3 or more", () => {
    const runs = [...many(3, { kb: "lore-mcp", cost: 9 }), ...many(5, { kb: "none", cost: 1 })];
    expect(figureFor(indexRuns(runs), query({ kb: "lore-mcp" }))).toMatchObject({ basis: "few", runs: 3, cost: { median: 9 } });
  });

  it("ignores runs of other tasks, models and sizes", () => {
    const runs = [...many(3), ...many(5, { task: "dod" }), ...many(5, { model: "beta" }), ...many(5, { size: "large" })];
    expect(figureFor(indexRuns(runs), query()).runs).toBe(3);
  });
});

describe("figureFor fallback to all knowledge bases", () => {
  const runs = [...many(2, { kb: "lore-mcp", cost: 9 }), ...many(4, { kb: "none", cost: 1 })];

  it("pools every knowledge base and labels the figure estimated when the asked one has 2 runs", () => {
    expect(figureFor(indexRuns(runs), query({ kb: "lore-mcp" }))).toMatchObject({ basis: "estimated", runs: 6, how: { kind: "all-knowledge-bases" } });
  });

  it("pools every knowledge base when the asked one has no runs", () => {
    expect(figureFor(indexRuns(runs), query({ kb: "lore-utopia" }))).toMatchObject({ basis: "estimated", runs: 6 });
  });
});

describe("sizeRatios and figureFor fallback to another size", () => {
  const otherModels = (smallCost: number, largeCost: number, smallShare = 1, largeShare = 1, model = "beta") => [
    ...Array.from({ length: 4 }, (_, i) => run({ model, size: "small", cost: smallCost, minutes: 10, success: i < 4 * smallShare })),
    ...Array.from({ length: 4 }, (_, i) => run({ model, size: "large", cost: largeCost, minutes: 30, success: i < 4 * largeShare })),
  ];

  it("takes the median of each model's own ratio for cost, minutes and share", () => {
    const runs = [...otherModels(1, 2, 1, 0.5, "beta"), ...otherModels(1, 4, 1, 0.5, "gamma"), ...otherModels(1, 9, 1, 0.5, "delta")];
    expect(sizeRatios(indexRuns(runs), { task: "tdd-round", fromSize: "small", toSize: "large" })).toEqual({ cost: 4, minutes: 3, share: 0.5, models: 3 });
  });

  it("leaves the asked model out of the ratio", () => {
    const runs = [...otherModels(1, 2, 1, 1, "alpha"), ...otherModels(1, 5, 1, 1, "beta")];
    expect(sizeRatios(indexRuns(runs), { task: "tdd-round", fromSize: "small", toSize: "large", excludeModel: alpha })?.cost).toBe(5);
  });

  it("returns nothing when no other model ran both sizes with 3 runs", () => {
    expect(sizeRatios(indexRuns(many(5)), { task: "tdd-round", fromSize: "small", toSize: "large" })).toBeNull();
  });

  it("returns nothing when the model that ran the first size never worked there", () => {
    const runs = [...many(4, { model: "beta", success: false }), ...many(4, { model: "beta", size: "large" })];
    expect(sizeRatios(indexRuns(runs), { task: "tdd-round", fromSize: "small", toSize: "large" })).toBeNull();
  });

  it("scales the model's small figure by the ratio and labels it estimated", () => {
    const runs = [...many(5, { cost: 2, minutes: 20 }), ...otherModels(1, 3, 1, 0.5)];
    expect(figureFor(indexRuns(runs), query({ size: "large" }))).toMatchObject({
      basis: "estimated", runs: 5, share: 0.5, cost: { median: 6, p25: 6, p75: 6 }, minutes: { median: 60 },
      how: { kind: "scaled", fromSize: "small", ratios: { cost: 3, minutes: 3, share: 0.5, models: 1 } },
    });
  });

  it("takes the nearest size first", () => {
    const runs = [...many(5, { size: "medium", cost: 2 }), ...many(5, { size: "small", cost: 100 }), ...otherModels(1, 3), ...otherModels(1, 3, 1, 1, "gamma").map((r) => ({ ...r, size: r.size === "small" ? "medium" : r.size }))];
    expect(figureFor(indexRuns(runs), query({ size: "large" })).how).toMatchObject({ fromSize: "medium" });
  });

  it("never lets a scaled share go above 1", () => {
    const runs = [...many(5, { success: true }), ...otherModels(1, 1, 0.5, 1)];
    expect(figureFor(indexRuns(runs), query({ size: "large" })).share).toBe(1);
  });

  it("falls back to no data when the model has no 3 runs of any size", () => {
    const runs = [...many(2), ...otherModels(1, 2)];
    expect(figureFor(indexRuns(runs), query({ size: "large" }))).toEqual({ basis: "none", runs: 0 });
  });

  it("prefers the pooled knowledge bases to scaling another size", () => {
    const runs = [...many(4, { size: "large", kb: "none" }), ...many(5, { size: "small" }), ...otherModels(1, 3)];
    expect(figureFor(indexRuns(runs), query({ size: "large", kb: "lore-mcp" })).how).toEqual({ kind: "all-knowledge-bases" });
  });
});

describe("workingResult", () => {
  const figure = (share: number) => ({ basis: "measured" as const, runs: 10, share, cost: { median: 2, p25: 1, p75: 4 }, minutes: { median: 10, p25: 5, p75: 20 } });

  it("multiplies the cost and minutes by 1 over the share that works", () => {
    expect(workingResult(figure(0.5))).toEqual({ attempts: 2, capped: false, cost: { median: 4, p25: 2, p75: 8 }, minutes: { median: 20, p25: 10, p75: 40 } });
  });

  it("caps the attempts at 10 and says so when 5 percent work", () => {
    expect(workingResult(figure(0.05))).toMatchObject({ attempts: 10, capped: true, cost: { median: 20 } });
  });

  it("does not cap exactly 10 attempts", () => {
    expect(workingResult(figure(0.1))).toMatchObject({ attempts: 10, capped: false });
  });

  it("returns nothing when no run works", () => {
    expect(workingResult(figure(0))).toBeNull();
  });

  it("returns nothing for a figure with no data", () => {
    expect(workingResult({ basis: "none", runs: 0 })).toBeNull();
  });

  it("keeps a missing cost missing", () => {
    expect(workingResult({ ...figure(1), cost: null })?.cost).toBeNull();
  });
});

describe("mixes", () => {
  it("counts tickets per size for the seen mix", () => {
    expect(seenMix({ 93: "small", 94: "small", 95: "small", 37: "medium", 144: "large" })).toEqual({ small: 0.6, medium: 0.2, large: 0.2 });
  });

  it("puts everything on one size for a whole-size mix", () => {
    expect(wholeSizeMix("medium")).toEqual({ small: 0, medium: 1, large: 0 });
  });

  it("turns percentages adding to 100 into shares", () => {
    expect(mixFromPercents({ small: 50, medium: 30, large: 20 })).toEqual({ small: 0.5, medium: 0.3, large: 0.2 });
  });

  it("rejects percentages adding to 99", () => {
    expect(mixFromPercents({ small: 50, medium: 30, large: 19 })).toBeNull();
  });

  it("rejects a negative percentage", () => {
    expect(mixFromPercents({ small: 110, medium: -10, large: 0 })).toBeNull();
  });
});

describe("priceWork", () => {
  const runs = [...many(5, { cost: 1, minutes: 10 }), ...many(5, { cost: 2, minutes: 20, success: false }), ...many(5, { task: "dod", model: "beta", cost: 3, minutes: 30, size: "small" })];
  const index = indexRuns(runs);
  const small = wholeSizeMix("small");
  const noWork = { dod: 0, "tdd-round": 0, "repair-build": 0 };
  const price = (counts: Record<string, number>, mix: Record<string, number>, models: Record<string, string>, source = index) =>
    priceWork(source, { counts, mix, modelFor: sameModelFor(models), kb: "none" });

  it("prices a task by its count times the working-result figure", () => {
    const { lines, totals } = price({ ...noWork, "tdd-round": 4 }, small, { "tdd-round": alpha });
    expect(lines.map((line) => [line.task, line.size, line.count, line.status])).toEqual([["tdd-round", "small", 4, "ok"]]);
    expect(totals).toMatchObject({ cost: { expected: 12, low: 8, high: 16 }, minutes: { expected: 120 }, leftOut: [] });
  });

  it("sums several tasks and splits a task over the sizes in a mix", () => {
    const { lines, totals } = price({ ...noWork, dod: 2, "tdd-round": 10 }, { small: 0.5, medium: 0.5, large: 0 }, { dod: beta, "tdd-round": alpha });
    expect(lines.map((line) => [line.task, line.size, line.count, line.status])).toEqual([
      ["dod", "small", 1, "ok"], ["dod", "medium", 1, "no-data"], ["tdd-round", "small", 5, "ok"], ["tdd-round", "medium", 5, "no-data"],
    ]);
    expect(totals.cost.expected).toBe(3 + 5 * 3);
  });

  it("leaves a model that never worked out of the total and names it as left out", () => {
    const { lines, totals } = price({ ...noWork, "tdd-round": 3 }, small, { "tdd-round": alpha }, indexRuns(many(5, { success: false })));
    expect(lines[0]).toMatchObject({ status: "never-works", result: null });
    expect(totals).toMatchObject({ cost: { expected: 0 }, leftOut: [expect.objectContaining({ status: "never-works" })] });
  });

  it("marks a line none-works when no model is chosen for it", () => {
    const { lines } = priceWork(index, { counts: { ...noWork, "tdd-round": 3 }, mix: small, modelFor: () => null, kb: "none" });
    expect(lines).toMatchObject([{ status: "none-works", model: null, result: null }]);
  });

  it("skips tasks with a count of 0", () => {
    expect(price(noWork, small, {}).lines).toEqual([]);
  });

  it("makes the total null when a priced line has no known cost", () => {
    expect(price({ ...noWork, "tdd-round": 1 }, small, { "tdd-round": alpha }, indexRuns(many(5, { cost: null }))).totals.cost).toEqual({ expected: null, low: null, high: null });
  });
});

describe("totalsOf", () => {
  it("sums the lows and highs of every priced line", () => {
    const spread = (low: number, median: number, high: number) => ({ median, p25: low, p75: high });
    const line = (count: number) => ({ count, status: "ok", result: { cost: spread(1, 2, 4), minutes: spread(10, 20, 40) } });
    expect(totalsOf([line(1), line(3)] as never)).toEqual({ cost: { expected: 8, low: 4, high: 16 }, minutes: { expected: 80, low: 40, high: 160 }, leftOut: [] });
  });
});

describe("choicesFor", () => {
  const perSize = (size: string) => [
    ...many(6, { model: "steady", size, cost: 2, minutes: 20 }),
    ...many(5, { model: "cheap", size, cost: 0.5, minutes: 40, success: false }),
    ...many(1, { model: "cheap", size, cost: 0.5, minutes: 40 }),
    ...many(6, { model: "quick", size, cost: 3, minutes: 5 }),
    ...many(6, { model: "never", size, cost: 0.1, minutes: 1, success: false }),
  ];
  const runs = [...["small", "medium", "large"].flatMap(perSize), ...many(2, { model: "partial", size: "small", cost: 0.01, minutes: 1 })];
  const index = indexRuns(runs);
  const choose = (size: string) => choicesFor(index, { task: "tdd-round", size, kb: "none" });

  it("picks the cheapest and the fastest among models working at least three quarters as often as the best", () => {
    expect(choose("small")).toMatchObject({ cheapest: "claude/steady", fastest: "claude/quick" });
  });

  it("never picks a model that never worked or has fewer than 3 runs at that size", () => {
    expect(Object.values(choose("small")).join(" ")).not.toMatch(/never|partial/);
  });

  it("picks nothing for a task and size nobody has runs for", () => {
    expect(choicesFor(index, { task: "dod", size: "small", kb: "none" })).toEqual({ recommended: null, cheapest: null, fastest: null });
  });

  it("picks nothing for a size where no model worked", () => {
    const noneWorked = indexRuns([...many(5, { model: "alpha", success: false }), ...many(5, { model: "beta", success: false })]);
    expect(choicesFor(noneWorked, { task: "tdd-round", size: "small", kb: "none" })).toEqual({ recommended: null, cheapest: null, fastest: null });
  });

  it("chooses per size: the cheap model that works only once is eligible at no size", () => {
    expect(["small", "medium", "large"].map((size) => choose(size).cheapest)).toEqual(["claude/steady", "claude/steady", "claude/steady"]);
  });
});

describe("compareChoices", () => {
  const scenarioOf = (kb: string) => (mix: Record<string, number>) => ({ kb, mix });
  const sharedSizes = (choice?: { shared: { lines: { size: string }[] } }) => choice?.shared.lines.map((line) => line.size);
  const compare = (index: ReturnType<typeof indexRuns>, counts: Record<string, number>, mix = wholeSizeMix("small")) => compareChoices(index, { counts, mix, kb: "none" });
  const runs = ["small", "large"].flatMap((size) => [
    ...many(6, { model: "steady", size, cost: 2, minutes: 20 }),
    ...many(6, { model: "quick", size, cost: 3, minutes: 5 }),
    ...many(6, { model: "thrifty", size, cost: 1, minutes: 30, success: false }).slice(0, 1),
    ...many(5, { model: "thrifty", size, cost: 1, minutes: 30 }),
  ]);

  it("prices the same work three ways in a fixed order", () => {
    const choices = compare(indexRuns(runs), { dod: 0, "tdd-round": 2, "repair-build": 0 });
    expect(choices.map((choice) => [choice.key, choice.lines[0]?.model, choice.shared.totals.cost.expected])).toEqual([["recommended", "claude/quick", 6], ["cheapest", "claude/thrifty", 2.4], ["fastest", "claude/quick", 6]]);
  });

  it("covers the same lines in every column when one choice cannot do a kind of work", () => {
    const withGap = indexRuns([...runs, ...many(6, { model: "quick", size: "medium", cost: 3, minutes: 5, success: false })]);
    const [recommended, cheapest, fastest] = compare(withGap, { dod: 0, "tdd-round": 3, "repair-build": 0 }, { small: 0.5, medium: 0.5, large: 0 });
    expect([recommended, cheapest, fastest].map(sharedSizes)).toEqual([["small"], ["small"], ["small"]]);
    expect(recommended?.lines.map((line) => line.status)).toEqual(["ok", "none-works"]);
  });

  it("reads no model produced a working result for every choice on a kind nobody could do", () => {
    const choices = compare(indexRuns(many(6, { success: false })), { dod: 0, "tdd-round": 1, "repair-build": 0 });
    expect(choices.map((choice) => choice.lines[0]?.status)).toEqual(["none-works", "none-works", "none-works"]);
  });

  it("never costs more for cheapest than recommended, nor takes longer for fastest, over the real data", () => {
    const bench = JSON.parse(readFileSync(new URL("../../site/data/bench.json", import.meta.url), "utf8"));
    const index = indexRuns(bench.modelStats.runs);
    const sizes = Object.fromEntries(bench.tickets.map((ticket: { number: number; size: string }) => [ticket.number, ticket.size]));
    const counts = { dod: 10, "tdd-round": 10, "repair-build": 2 };
    const mixes = [seenMix(sizes), wholeSizeMix("small"), wholeSizeMix("medium"), wholeSizeMix("large")];
    const scenarios = ["none", "lore-mcp", "lore-utopia"].flatMap((kb) => mixes.map(scenarioOf(kb)));
    const overruns: string[] = [];
    for (const { kb, mix } of scenarios) {
      const [recommended, cheapest, fastest] = compareChoices(index, { counts, mix, kb });
      if (cheapest!.shared.totals.cost.expected! > recommended!.shared.totals.cost.expected! + 1e-9) overruns.push(`cost ${kb}`);
      if (fastest!.shared.totals.minutes.expected! > recommended!.shared.totals.minutes.expected! + 1e-9) overruns.push(`time ${kb}`);
    }
    expect(overruns).toEqual([]);
  });
});

describe("sentences", () => {
  const spread = (low: number, median: number, high: number) => ({ median, p25: low, p75: high });
  const okLine = { task: "tdd-round", size: "small", count: 2, model: "claude/alpha", status: "ok", figure: { basis: "measured" }, result: { cost: spread(1, 2, 4), minutes: spread(60, 90, 120) } };
  const pricing = (lines: unknown[]) => ({ lines, totals: totalsOf(lines as never) }) as never;

  it("says the models, cost, hours and range in one sentence", () => {
    expect(answerSentence(pricing([okLine]))).toBe("Doing this work with alpha will cost about $4.00 and take about 3 hours of the models' own working time; expect between $2.00 and $8.00, and between 2 hours and 4 hours.");
  });

  it("lists two models with and", () => {
    const other = { ...okLine, model: "claude/beta" };
    expect(answerSentence(pricing([okLine, other]))).toMatch(/^Doing this work with alpha and beta will cost/);
  });

  it("asks for a count when there is no work", () => {
    expect(answerSentence(pricing([]))).toBe("There is no work to price yet: set how many times each task is done.");
  });

  it("says it cannot price work when the cost is unknown", () => {
    expect(answerSentence(pricing([{ ...okLine, result: { cost: null, minutes: spread(1, 2, 3) } }]))).toMatch(/cannot be priced/);
  });

  it("says in the headline which kinds of work a total leaves out", () => {
    const never = { ...okLine, task: "dod", size: "large", status: "never-works", result: null };
    const none = { ...okLine, task: "repair-build", size: "small", model: null, status: "none-works", result: null };
    expect(answerSentence(pricing([okLine, never, none]))).toBe(
      "Doing this work with alpha for 1 of the 3 kinds of work will cost about $4.00 and take about 3 hours of the models' own working time; expect between $2.00 and $8.00, and between 2 hours and 4 hours; "
      + "no chosen model could do the rest: write the tests on large tickets (the chosen model did not produce a working result here), fix a broken build on small tickets (no model produced a working result here).",
    );
  });

  it("says nothing can be priced when every kind of work is left out", () => {
    const none = { ...okLine, model: null, status: "none-works", result: null };
    expect(answerSentence(pricing([none]))).toMatch(/^No chosen model produced a working result for any of the 1 kinds of work/);
  });

  it("writes minutes under an hour and hours with one decimal", () => {
    expect([hoursText(45), hoursText(90), hoursText(60), hoursText(1500)]).toEqual(["45 minutes", "1.5 hours", "1 hour", "25 hours"]);
  });
});

describe("surenessText", () => {
  it("says measured on the number of runs", () => {
    expect(surenessText({ basis: "measured", runs: 15 })).toBe("measured on 15 runs");
  });

  it("says few runs with their number", () => {
    expect(surenessText({ basis: "few", runs: 3 })).toBe("few runs: measured on only 3 runs");
  });

  it("says estimated and why when pooled over knowledge bases", () => {
    expect(surenessText({ basis: "estimated", runs: 6, how: { kind: "all-knowledge-bases" } })).toMatch(/^estimated: .*all 6 runs/);
  });

  it("says estimated with the ratios when scaled from another size", () => {
    expect(surenessText({ basis: "estimated", runs: 5, how: { kind: "scaled", fromSize: "medium", ratios: { cost: 2, minutes: 1.5, share: 0.8, models: 12 } } }))
      .toBe("estimated: this model's 5 runs on medium tickets, scaled by the usual change to this size seen across 12 models (cost x2.0, time x1.5, how often it works x0.8)");
  });

  it("says no data when there is none", () => {
    expect(surenessText({ basis: "none", runs: 0 })).toMatch(/^no data/);
  });

  it("reports unknown costs only when there are some", () => {
    expect([costUnknownText({ basis: "measured", runs: 15, costUnknownRuns: 2 }), costUnknownText({ basis: "measured", runs: 15, costUnknownRuns: 0 })])
      .toEqual(["cost unknown for 2 of 15 runs, left out of the cost", null]);
  });
});
