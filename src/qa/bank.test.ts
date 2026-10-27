import { describe, expect, it } from "vitest";
import { loadBank, parseBank } from "./bank.js";

const bank = (questions: string): string => `repo: re-cinq/lore\nchecked_at: "2026-10-27"\nquestions:\n${questions}`;

describe("parseBank", () => {
  it("reads a question with its evidence and defaults must_abstain to false", () => {
    const parsed = parseBank(bank(`  - id: lore-trk-01\n    kind: tracker\n    question: Which PR?\n    gold_answer: "#3705"\n    evidence: ["#3705"]\n`));

    expect(parsed.questions).toEqual([{ id: "lore-trk-01", kind: "tracker", question: "Which PR?", gold_answer: "#3705", evidence: ["#3705"], must_abstain: false }]);
  });

  it("refuses an unanswerable question that does not ask for an abstention", () => {
    expect(() => parseBank(bank(`  - id: lore-none-01\n    kind: unanswerable\n    question: SLO?\n    gold_answer: none\n`))).toThrow(/must_abstain/);
  });

  it("refuses two questions with the id lore-trk-01", () => {
    const one = `  - id: lore-trk-01\n    kind: tracker\n    question: Q\n    gold_answer: A\n`;

    expect(() => parseBank(bank(one + one))).toThrow(/unique/);
  });
});

describe("the shipped banks", () => {
  it("keep every gold answer whole, #498 included, rather than cut at a YAML comment", () => {
    const otto = loadBank(new URL("../../experiments/context-qa/banks/otto.yaml", import.meta.url).pathname);

    expect(otto.questions.find((question) => question.id === "otto-trk-02")?.gold_answer).toMatch(/^Yes, #498 \(open/);
  });
});
