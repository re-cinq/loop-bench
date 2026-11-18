import { describe, expect, it } from "vitest";
import { compareKnowledgeBases, effectPerModel, knowledgeAnswer, verdictOf, type KnowledgeRun } from "../../site/js/knowledge.js";

const run = (knowledgeBase: string, success: boolean, over: Partial<KnowledgeRun> = {}): KnowledgeRun => ({
  task: "tdd-round", ticket: 93, harness: "claude", model: "m", knowledgeBase, success, costUsd: 1, minutes: 10, correctness: null, completeness: null, closeness: null, ...over,
});

const threeWay = [
  run("none", true), run("none", false), run("lore-mcp", true), run("lore-utopia", true), run("lore-utopia", false),
];

describe("compareKnowledgeBases", () => {
  it("counts runs and success share per knowledge base on a setup that has all three", () => {
    const { byKnowledgeBase } = compareKnowledgeBases(threeWay, "tdd-round");
    expect([byKnowledgeBase.none?.successRate, byKnowledgeBase["lore-mcp"]?.successRate, byKnowledgeBase["lore-utopia"]?.runs]).toEqual([0.5, 1, 2]);
  });

  it("leaves out a setup that lacks Utopia and counts the Lore setups with one run", () => {
    const lacking = [run("none", true, { ticket: 94 }), run("lore-mcp", true, { ticket: 94 })];
    expect(compareKnowledgeBases([...threeWay, ...lacking], "tdd-round")).toMatchObject({ setups: 1, loreSetupsWithOneRun: 1 });
  });
});

describe("verdictOf", () => {
  it.each([[5, "better"], [-5, "worse"], [4, "about the same"], [0, "about the same"]])("returns the verdict for %i points", (points, verdict) => {
    expect(verdictOf(points)).toBe(verdict);
  });
});

describe("effectPerModel", () => {
  it("lists the model with the largest effect first", () => {
    const small = [run("none", true, { model: "small" }), run("lore-mcp", true, { model: "small" }), run("lore-utopia", true, { model: "small" })];
    const big = [run("none", false, { model: "big" }), run("lore-mcp", true, { model: "big" }), run("lore-utopia", false, { model: "big" })];
    const rows = effectPerModel([...small, ...big]);
    expect(rows.map((row) => [row.model, row.lore.deltaPoints, row.lore.verdict, row.utopia.verdict])).toEqual([["big", 100, "better", "about the same"], ["small", 0, "about the same", "about the same"]]);
  });
});

describe("knowledgeAnswer", () => {
  it("says a knowledge base makes little difference when both stay within five points", () => {
    const same = [run("none", true), run("lore-mcp", true), run("lore-utopia", true)];
    expect(knowledgeAnswer(compareKnowledgeBases(same, "tdd-round"), { activity: "writing the code", lore: "Lore", utopia: "Utopia" }))
      .toBe("For writing the code, a knowledge base makes little difference: runs work 100% of the time with none, 100% with Lore and 100% with Utopia, over 1 setup run with all three.");
  });

  it("says a knowledge base helps when both gain five points or more", () => {
    const helped = [run("none", false), run("lore-mcp", true), run("lore-utopia", true)];
    expect(knowledgeAnswer(compareKnowledgeBases(helped, "tdd-round"), { activity: "writing the code", lore: "Lore", utopia: "Utopia" })).toMatch(/^For writing the code, a knowledge base helps: runs work 0% /);
  });
});
