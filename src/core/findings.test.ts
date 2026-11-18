import { describe, expect, it } from "vitest";
import { compareKnowledgeBases, knowledgeEffectOf, moneySpentOf, repeatDisagreement, shakySizesOf } from "./findings.js";
import type { RunRow } from "./model-stats.js";

const run = (overrides: Partial<RunRow>): RunRow => ({
  loopId: "l", task: "tdd-round", harness: "claude", model: "m", knowledgeBase: "none", ticket: 1, size: "small", setup: "s", replicate: 1, success: true, costUsd: 1, minutes: 2, rounds: 1, correctness: 4, completeness: 4, closeness: 4, endReason: "green", ...overrides,
});

describe("compareKnowledgeBases", () => {
  const threeWay = [
    run({ knowledgeBase: "none" }), run({ knowledgeBase: "none", success: false }),
    run({ knowledgeBase: "lore-mcp" }), run({ knowledgeBase: "lore-utopia" }),
    run({ ticket: 2, knowledgeBase: "none" }),
  ];

  it("counts only the setup that ran with none, Lore and Utopia and its single Lore run", () => {
    expect(compareKnowledgeBases(threeWay, "tdd-round")).toEqual({
      task: "tdd-round",
      setups: 1,
      loreSetupsWithOneRun: 1,
      byKnowledgeBase: { none: { runs: 2, successRate: 0.5 }, "lore-mcp": { runs: 1, successRate: 1 }, "lore-utopia": { runs: 1, successRate: 1 } },
    });
  });

  it.each([
    [0.5, 0.5, "makes little difference"],
    [1, 1, "helps"],
    [0, 0, "hurts"],
    [1, 0, "has mixed effects"],
  ])("reads Lore %d and Utopia %d against none at 0.5 as %s", (loreRate, utopiaRate, effect) => {
    const measures = (successRate: number) => ({ runs: 2, successRate });

    expect(knowledgeEffectOf({ task: "dod", setups: 2, loreSetupsWithOneRun: 0, byKnowledgeBase: { none: measures(0.5), "lore-mcp": measures(loreRate), "lore-utopia": measures(utopiaRate) } })).toEqual(effect);
  });
});

describe("repeatDisagreement", () => {
  it("counts the one setup with a working and a failing repeat among two repeated setups", () => {
    const runs = [run({ setup: "a" }), run({ setup: "a", success: false }), run({ setup: "b" }), run({ setup: "b" }), run({ setup: "c" })];

    expect(repeatDisagreement(runs)).toEqual({ repeated: 2, flipped: 1 });
  });
});

describe("shakySizesOf", () => {
  const medium = (model: string, success: boolean) => Array.from({ length: 5 }, () => run({ model, size: "medium", success }));

  it("lists the medium ticket for writing the code when the best model with five runs works in 40% of them", () => {
    const runs = [...medium("a", false), ...medium("b", false).slice(0, 3), ...medium("b", true).slice(0, 2)];

    expect(shakySizesOf(runs)).toEqual([{ task: "tdd-round", size: "medium", successRate: 0.4 }]);
  });
});

describe("moneySpentOf", () => {
  it("adds known costs, the share on failing runs and the runs with no cost", () => {
    const runs = [run({ costUsd: 3 }), run({ costUsd: 1, success: false }), run({ costUsd: null })];

    expect(moneySpentOf(runs)).toEqual({ total: 4, wasted: 1, runsWithoutCost: 1 });
  });
});
