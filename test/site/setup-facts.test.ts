import { describe, expect, it } from "vitest";
import { agreementSentence, alignTests, defaultPair, groupSetups, linesText, mostAgreeing, mostDisagreeing, orderOfWorkLine, reliabilitySentence, setupHash, testsOf, weakeningWarning, widestCostSwing, type RunFile, type SetupRun } from "../../site/js/setup-facts.js";

let nextId = 0;
const run = (over: Partial<SetupRun> = {}): SetupRun => ({
  loopId: `id${nextId++}`, task: "tdd-round", harness: "claude", model: "m1", knowledgeBase: "none", ticket: 93, size: "small", setup: "tdd-round|claude|m1|none|93",
  replicate: 1, success: true, costUsd: 0.2, minutes: 2, rounds: 0, correctness: 4, completeness: 4, closeness: 4, endReason: "green", ...over,
});
const runsOf = (setup: string, specs: Partial<SetupRun>[]) => specs.map((spec, index) => run({ setup, model: setup, replicate: index + 1, ...spec }));
const test = (name: string, over: Record<string, unknown> = {}) => ({ name, proves: null, file: null, code: null, ...over });

describe("reliabilitySentence", () => {
  it("says all 5 runs passed with test and cost and time ranges", () => {
    const runs = runsOf("s", [0.2, 0.25, 0.3, 0.31, 0.22].map((costUsd, index) => ({ task: "dod", costUsd, minutes: [2, 3, 4, 3, 2][index] ?? 2 })));
    expect(reliabilitySentence("dod", runs, [2, 2, 3, 2, 3])).toBe("All 5 runs passed the check. Each wrote 2 to 3 tests. Cost ranged from $0.20 to $0.31 and time ranged from 2 to 4 minutes.");
  });

  it("names why the failed runs failed when 3 of 5 worked", () => {
    const failing = { success: false, endReason: "retry_budget", costUsd: 0.5, minutes: 5 };
    const runs = runsOf("s", [{}, {}, {}, failing, failing]);
    expect(reliabilitySentence("tdd-round", runs, [null, null, null, null, null])).toBe("3 of 5 runs produced working code; the two that failed ran out of retries. Cost ranged from $0.20 to $0.50 and time ranged from 2 to 5 minutes.");
  });

  it("flags a hint when fewer than 5 runs and leaves out unknown cost", () => {
    const runs = runsOf("s", [{ costUsd: null }, { costUsd: 0.4 }]);
    expect(reliabilitySentence("repair-build", runs, [1, 1])).toBe("All 2 runs fixed the build. Each added 1 test. Cost was about $0.40 each time and time was about 2 minutes each time (cost unknown for 1 of 2). Only two runs, so treat this as a hint.");
  });
});

describe("example pickers", () => {
  const mixed = groupSetups(runsOf("mixed", [{}, {}, { success: false }, { success: false }, {}]));
  const steady = groupSetups(runsOf("steady", [{ costUsd: 0.2 }, { costUsd: 0.21 }, { costUsd: 0.2 }, { costUsd: 0.22 }, { costUsd: 0.2 }]));
  const swung = groupSetups(runsOf("swung", [{ costUsd: 0.1 }, { costUsd: 2 }, { costUsd: 0.3 }]));
  const groups = [...mixed, ...steady, ...swung];

  it("lists only the setup where some runs worked and some did not", () => {
    expect(mostDisagreeing(groups, 5).map((group) => group.model)).toEqual(["mixed"]);
  });

  it("puts the widest cost ratio first", () => {
    expect(widestCostSwing(groups, 5).map((group) => group.model)).toEqual(["swung", "steady", "mixed"]);
  });

  it("lists only setups of 5 runs that all worked", () => {
    expect(mostAgreeing(groups, 5).map((group) => group.model)).toEqual(["steady"]);
  });

  it("counts setups with disagreement among those with 3 or more runs", () => {
    expect(agreementSentence(groups)).toBe("Of 3 setups run three times or more, 1 (33%) had some runs that worked and some that did not. The rest ended the same way every time.");
  });

  it("builds a hash with the model as harness slash model", () => {
    expect(setupHash(mixed[0]!)).toBe("task=tdd-round&model=claude%2Fmixed&kb=none&ticket=93");
  });
});

describe("defaultPair", () => {
  it("picks the dearest failure against the cheapest success", () => {
    const runs = runsOf("s", [{ costUsd: 0.2 }, { costUsd: 0.3, success: false }, { costUsd: 3, success: false }]);
    expect(defaultPair(runs)).toEqual([1, 3]);
  });

  it("picks cheapest against dearest when all worked", () => {
    const runs = runsOf("s", [{ costUsd: 0.3 }, { costUsd: 0.1 }, { costUsd: 0.9 }]);
    expect(defaultPair(runs)).toEqual([2, 3]);
  });

  it("gives one run and nothing for the other when only one run exists", () => {
    expect(defaultPair(runsOf("s", [{}]))).toEqual([1, undefined]);
  });
});

describe("alignTests", () => {
  it("pairs equal names exactly and keeps one-sided tests", () => {
    const rows = alignTests([test("x"), test("y")], [test("z"), test("x ")]);
    expect(rows.map((row) => [row.name, row.a?.name ?? null, row.b?.name ?? null])).toEqual([["x", "x", null], ["y", "y", null], ["z", null, "z"], ["x ", null, "x "]]);
  });
});

describe("testsOf", () => {
  const runFile: RunFile = {
    loopId: "l", task: "dod",
    dod: { approach: null, tests: [{ name: "a", proves: "p", file: "f.ts" }], outOfScope: [] },
    diff: { testFilesTouched: [], testsAdded: [{ name: "a", file: "f.ts", kind: "test", code: "it('a')" }, { name: "d", file: "f.ts", kind: "describe", code: "describe" }], testsAddedCount: 1, addedTestLines: 3, addedProductLines: 0, tampering: { editedExistingTests: [], changedGivenTests: [], disabledTests: [], deletedTestFiles: [], changedCount: 0, weakenedCount: 0, flagged: false } },
    orderOfWork: null,
  };

  it("joins the plan's test with its code by exact name for writing the tests", () => {
    expect(testsOf("dod", runFile)).toEqual([{ name: "a", proves: "p", file: "f.ts", code: "it('a')" }]);
  });

  it("lists the added tests only, without describe blocks, for coding", () => {
    expect(testsOf("tdd-round", runFile)).toEqual([{ name: "a", proves: null, file: "f.ts", code: "it('a')" }]);
  });
});

describe("orderOfWorkLine", () => {
  it("words a first round that wrote a test before the product code", () => {
    expect(orderOfWorkLine({ round: 0, visits: 1, outcome: "success", testRuns: 6, heuristicTestWrittenBeforeProductWrite: true, heuristicTestRunBeforeProductWrite: true })).toBe("first try: ran the tests 6 times; wrote a test before changing the product code");
  });

  it("says nothing about the order when both heuristics are null", () => {
    expect(orderOfWorkLine({ round: 2, visits: 1, outcome: "success", testRuns: 1, heuristicTestWrittenBeforeProductWrite: null, heuristicTestRunBeforeProductWrite: null })).toBe("retry 2: ran the tests once");
  });
});

describe("linesText and weakeningWarning", () => {
  it("compares test lines with product lines", () => {
    expect(linesText({ addedTestLines: 60, addedProductLines: 20 } as RunFile["diff"])).toBe("60 lines of test code against 20 lines of product code.");
  });

  it("warns only when flagged", () => {
    const base = { editedExistingTests: [], changedGivenTests: [], disabledTests: [], deletedTestFiles: [], changedCount: 1, weakenedCount: 1, flagged: false };
    expect([weakeningWarning(base), weakeningWarning({ ...base, flagged: true })]).toEqual([null, "Warning: this run made the tests it was given weaker. It weakened 1 test file."]);
  });
});
