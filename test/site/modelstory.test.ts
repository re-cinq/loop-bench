import { describe, expect, it } from "vitest";
import { cardSentence, minutesRangeText, minutesText, moneyRangeText, ordinal, placeOf, standingOf, summaryParagraph } from "../../site/js/modelstory.js";
import type { ModelRow } from "../../site/js/rank.js";

const spread = (median: number) => ({ median, p25: median, p75: median });
const row = (model: string, over: Partial<ModelRow> = {}): ModelRow => ({
  harness: "claude", model, runs: 55, successes: 47, successRate: 0.85, costUsd: spread(0.4), minutes: spread(16), review: null, strength: "measured", tickets: [1], costUnknownRuns: 0, costPerSuccessUsd: null, minutesPerSuccess: null, ...over,
});

describe("ordinal", () => {
  it.each([[1, "1st"], [2, "2nd"], [3, "3rd"], [4, "4th"], [11, "11th"], [12, "12th"], [21, "21st"], [112, "112th"]])("writes %i as %s", (number, text) => {
    expect(ordinal(number)).toEqual(text);
  });
});

describe("cardSentence", () => {
  it("writes runs, share, usual cost and time for the code task", () => {
    expect(cardSentence("tdd-round", row("a"))).toEqual("Writes working code in 47 of 55 runs (85%), usually about $0.40 and about 16 minutes.");
  });

  it("marks few runs and leaves out an unknown cost", () => {
    expect(cardSentence("dod", row("a", { runs: 1, successes: 1, successRate: 1, costUsd: null, minutes: spread(0.4), strength: "few" }))).toEqual("Writes working tests in 1 of 1 runs (100%), usually under a minute (few runs).");
  });
});

describe("placeOf", () => {
  it("gives tied values the better place", () => {
    expect(placeOf(5, [9, 5, 5, 1], { lowerIsBetter: false })).toEqual(2);
  });

  it("puts the smallest value first when lower is better", () => {
    expect(placeOf(1, [9, 5, 1], { lowerIsBetter: true })).toEqual(1);
  });
});

describe("summaryParagraph", () => {
  const rows = [row("a", { successRate: 0.9, costUsd: spread(1), minutes: spread(30) }), row("b", { successRate: 0.7, costUsd: spread(0.1), minutes: spread(5) }), row("c", { successRate: 0.5, costUsd: spread(2), minutes: spread(10) })];

  it("names the best and weakest task and the cheapest of all", () => {
    const strong = standingOf(rows[1] as ModelRow, rows);
    const weak = { works: { place: 3, of: 3 }, cost: { place: 3, of: 3 }, time: null };
    expect(summaryParagraph("b", { dod: weak, "tdd-round": strong })).toEqual(
      "b is strongest at writing the code and weakest at writing the tests, compared with the other models. "
      + "For writing the tests: 3rd of 3 for getting working results; dearest of all on cost. "
      + "For writing the code: 2nd of 3 for getting working results; cheapest of all on cost; fastest of all on time.",
    );
  });

  it("explains a task where the model is not ranked", () => {
    const unranked = { works: null, cost: null, time: null, missingText: "not run on the large ticket" };
    expect(summaryParagraph("b", { "tdd-round": unranked })).toEqual("For writing the code it is not ranked: not run on the large ticket.");
  });
});

describe("range texts", () => {
  it.each([[0.003, 0.05, "less than a cent to $0.05"], [0.1, 0.4, "$0.10 to $0.40"], [0.001, 0.004, "under $0.01"], [0.4, 0.4, "$0.40"]])("writes the cost range %s to %s as %s", (low, high, text) => {
    expect(moneyRangeText(low, high)).toBe(text);
  });

  it.each([[0.3, 5, "under a minute to 5 minutes"], [2, 9, "2 to 9 minutes"], [1.2, 0.8, "under a minute"], [0.9, 1.4, "1 minute"]])("writes the time range %s to %s as %s", (low, high, text) => {
    expect(minutesRangeText(low, high)).toBe(text);
  });

  it("writes one minute without a plural", () => {
    expect(minutesText(1.2)).toBe("1 minute");
  });
});
