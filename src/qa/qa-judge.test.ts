import { describe, expect, it } from "vitest";
import type { Question } from "./bank.js";
import { buildQaJudgePrompt, grade, parseJudgement } from "./qa-judge.js";

const question: Question = {
  id: "lore-trk-01",
  kind: "tracker",
  question: "Which PR moved fix-ci to Argon?",
  gold_answer: "#3705, merged 2026-10-26.",
  evidence: ["#3705"],
  must_abstain: false,
};
const unanswerable: Question = { ...question, id: "lore-none-01", kind: "unanswerable", gold_answer: "No SLO is defined.", must_abstain: true };

describe("buildQaJudgePrompt", () => {
  it("names the question, the gold answer and a missing answer", () => {
    expect(buildQaJudgePrompt(question, null)).toMatch(/Which PR moved fix-ci to Argon\?[\s\S]*#3705, merged 2026-10-26\.[\s\S]*\(the agent returned no answer\)/);
  });
});

describe("parseJudgement", () => {
  it("reads a fenced verdict of partial", () => {
    expect(parseJudgement('```json\n{"verdict": "partial", "reason": "no date"}\n```')).toEqual({ verdict: "partial", contradicted_gold_sentence: "", reason: "no date" });
  });

  it("returns null for a verdict of maybe", () => {
    expect(parseJudgement('{"verdict": "maybe", "reason": "?"}')).toBeNull();
  });
});

describe("grade", () => {
  it("scores partial 0.5 with no hallucination", () => {
    expect(grade(question, { verdict: "partial", contradicted_gold_sentence: "", reason: "r" })).toMatchObject({ score: 0.5, hallucinated: false });
  });

  it("scores wrong 0 as a hallucination and flags a quote the gold answer does not hold", () => {
    expect(grade(question, { verdict: "wrong", contradicted_gold_sentence: "#2823 did it.", reason: "r" })).toMatchObject({ score: 0, hallucinated: true, quote_unverified: true });
  });

  it("accepts a quote of the gold answer that differs only in spacing and case", () => {
    expect(grade(question, { verdict: "wrong", contradicted_gold_sentence: "#3705,  MERGED 2026-10-26.", reason: "r" }).quote_unverified).toBe(false);
  });

  it("scores an abstention on an unanswerable question 1", () => {
    expect(grade(unanswerable, { verdict: "abstained", contradicted_gold_sentence: "", reason: "r" })).toMatchObject({ score: 1, hallucinated: false });
  });

  it("scores a correct-looking answer to an unanswerable question 0 as a hallucination", () => {
    expect(grade(unanswerable, { verdict: "correct", contradicted_gold_sentence: "", reason: "r" })).toMatchObject({ score: 0, hallucinated: true });
  });
});
