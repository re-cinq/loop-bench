import { describe, expect, it } from "vitest";
import { bestColumns, bestIndexes, buildComparison, comparisonParagraph, fairnessLine, parseThing, qualifierText, thingKey, thingNames, type ComparedRun, type Thing } from "../../site/js/compare-model.js";

const run = (model: string, ticket: number, replicate: number, over: Partial<ComparedRun> = {}): ComparedRun => ({
  task: "tdd-round", harness: "claude", model, knowledgeBase: "none", ticket, size: ticket === 144 ? "large" : "small",
  setup: `${model}|${over.knowledgeBase ?? "none"}|${ticket}`, replicate, success: true, costUsd: 1, minutes: 10, rounds: 2,
  correctness: 4, completeness: 4, closeness: 4, endReason: "green", ...over,
});
const thing = (model: string, kb = "all", size = "all"): Thing => ({ harness: "claude", model, kb, size });

describe("parseThing and thingKey", () => {
  it("round-trips a model narrowed to Utopia and small tickets", () => {
    expect(parseThing("claude/claude-sonnet-5-5~lore-utopia~small")).toEqual({ harness: "claude", model: "claude-sonnet-5-5", kb: "lore-utopia", size: "small" });
    expect(thingKey(thing("a", "lore-utopia", "small"))).toEqual("claude/a~lore-utopia~small");
  });

  it("fills knowledge base and size with all when only the model is given", () => {
    expect(parseThing("codex/gpt-5.6-luna")).toEqual({ harness: "codex", model: "gpt-5.6-luna", kb: "all", size: "all" });
  });

  it("returns null when the text has no harness and model", () => {
    expect([parseThing("nothing"), parseThing(""), parseThing(undefined)]).toEqual([null, null, null]);
  });
});

describe("thingNames", () => {
  it("uses the bare model name when each model appears once", () => {
    expect(thingNames([thing("a"), thing("b", "lore-utopia")])).toEqual(["a", "b"]);
  });

  it("adds what narrows a model that appears twice", () => {
    expect(thingNames([thing("a", "none"), thing("a", "lore-utopia", "small")])).toEqual(["a (no knowledge base)", "a (Utopia, small tickets)"]);
  });

  it("says everything for an unnarrowed repeat", () => {
    expect(qualifierText(thing("a"))).toEqual("");
    expect(thingNames([thing("a"), thing("a", "none")])).toEqual(["a (everything)", "a (no knowledge base)"]);
  });
});

describe("bestIndexes", () => {
  it("tags every value that shows the same after rounding to the digits shown", () => {
    expect(bestIndexes([0.451, 0.449, 0.52], { lowerIsBetter: true, digits: 2 })).toEqual([0, 1]);
  });

  it("tags none when all values are equal after rounding", () => {
    expect(bestIndexes([0.451, 0.449], { lowerIsBetter: true, digits: 2 })).toEqual([]);
  });

  it("returns the highest index when higher is better", () => {
    expect(bestIndexes([0.5, 0.9, 0.7], { lowerIsBetter: false })).toEqual([1]);
  });

  it("returns every tied index for the lowest value and skips unknown", () => {
    expect(bestIndexes([2, null, 1, 1], { lowerIsBetter: true })).toEqual([2, 3]);
  });

  it("returns none when all values are equal or only one is known", () => {
    expect([bestIndexes([1, 1], { lowerIsBetter: true }), bestIndexes([1, null], { lowerIsBetter: true })]).toEqual([[], []]);
  });
});

const sampleRuns = (): ComparedRun[] => [
  ...[93, 94, 144].flatMap((ticket) => [run("a", ticket, 1), run("a", ticket, 2, { success: ticket !== 94, endReason: ticket === 94 ? "round_budget" : "green", costUsd: 2 })]),
  ...[93, 94, 144].map((ticket) => run("b", ticket, 1, { success: ticket === 93, endReason: "retry_budget", costUsd: 0.5 })),
  ...[93, 94].map((ticket) => run("c", ticket, 1, { costUsd: 0.1, minutes: 3 })),
];

describe("buildComparison", () => {
  it("measures every column on the tickets all of them ran and names what was left out", () => {
    const comparison = buildComparison(sampleRuns(), [thing("a"), thing("b"), thing("c")], "tdd-round");
    expect(comparison.commonTickets).toEqual([93, 94]);
    expect(comparison.columns.map((column) => column.runs)).toEqual([4, 2, 2]);
    expect(fairnessLine(comparison)).toEqual("Compared only on the tickets every column ran. c was not run on the large ticket, so the large ticket is left out for everyone.");
  });

  it("returns no fairness line when every column ran the same tickets", () => {
    const comparison = buildComparison(sampleRuns(), [thing("a"), thing("b")], "tdd-round");
    expect(fairnessLine(comparison)).toEqual(null);
  });

  it("measures each column on its own tickets when small is compared with large", () => {
    const comparison = buildComparison(sampleRuns(), [thing("a", "all", "small"), thing("a", "all", "large")], "tdd-round");
    expect(comparison.sharedTickets).toEqual(false);
    expect(comparison.columns.map((column) => column.runs)).toEqual([4, 2]);
    expect(fairnessLine(comparison)).toMatch(/^These columns share no ticket/);
  });

  it("counts steady setups and the top failure reason", () => {
    const [first, second] = buildComparison(sampleRuns(), [thing("a"), thing("b")], "tdd-round").columns;
    expect(first?.steadiness).toEqual({ repeated: 3, steady: 2 });
    expect(second?.failure).toEqual({ failures: 2, count: 2, reason: "retry_budget", words: "ran out of retries" });
  });

  it("marks a column with no runs as empty and leaves it out of the shared tickets", () => {
    const comparison = buildComparison(sampleRuns(), [thing("a"), thing("b"), thing("zzz")], "tdd-round");
    expect(comparison.columns.map((column) => column.empty)).toEqual([false, false, true]);
    expect(comparison.commonTickets).toEqual([93, 94, 144]);
  });
});

describe("bestColumns", () => {
  it("picks the most-often-working, cheapest and fastest columns", () => {
    const { columns } = buildComparison(sampleRuns(), [thing("a"), thing("b"), thing("c")], "tdd-round");
    expect(bestColumns(columns)).toMatchObject({ works: [2], cost: [2], time: [2] });
  });
});

describe("comparisonParagraph", () => {
  it("says who works most often, is cheapest and fastest with numbers", () => {
    const paragraph = comparisonParagraph(buildComparison(sampleRuns(), [thing("a"), thing("b"), thing("c")], "tdd-round"));
    expect(paragraph).toEqual("c works most often (100% against 75% and 50%), is the cheapest at about $0.10 a run, and is the fastest at about 3 minutes a run. a (4 runs), b (2 runs) and c (2 runs) rest on only a few runs, so treat them as hints.");
  });

  it("says what a knowledge base changed when the same model appears twice", () => {
    const runs = [
      ...[93, 94].map((ticket) => run("a", ticket, 1, { success: false, endReason: "round_budget" })),
      ...[93, 94].map((ticket) => run("a", ticket, 1, { knowledgeBase: "lore-utopia", costUsd: 1.5, minutes: 12 })),
    ];
    const paragraph = comparisonParagraph(buildComparison(runs, [thing("a", "none"), thing("a", "lore-utopia")], "tdd-round"));
    expect(paragraph).toMatch(/a \(Utopia\) compared with a \(no knowledge base\): works 100 points more often \(100% against 0%\); a usual run costs \$0\.50 more and takes 2 minutes longer\./);
  });

  it("says there are not enough runs when fewer than two columns have runs", () => {
    expect(comparisonParagraph(buildComparison(sampleRuns(), [thing("a"), thing("zzz")], "tdd-round"))).toEqual("There are not enough runs to compare yet. zzz has no runs for this task with these choices.");
  });
});
