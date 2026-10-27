import { describe, expect, it } from "vitest";
import { EMPTY_USAGE } from "../core/usage.js";
import type { Arm } from "./arms.js";
import type { Verdict } from "./qa-judge.js";
import { comparePair, judgeAgreement, pairVerdict, renderQaReport, summarizeArm, unstableQuestions, type QaRecord } from "./qa-report.js";
import type { QaTranscript } from "./transcript.js";

const SCORES: Record<Verdict, number> = { correct: 1, partial: 0.5, wrong: 0, abstained: 0 };

function transcript(tokens: number, wallMs: number, cost: number): QaTranscript {
  return {
    answer: "a",
    answered_as_json: true,
    sources: [],
    usage: { ...EMPTY_USAGE, input_tokens: tokens, reported_cost_usd: cost },
    duration_ms: wallMs,
    duration_api_ms: wallMs,
    non_model_ms: 0,
    num_turns: 1,
    mcp_calls: 0,
    mcp_tools: [],
    mcp_errors: 0,
    mcp_result_tokens: 0,
    init: null,
    is_error: false,
  };
}

function ask(questionId: string, arm: Arm, rep: number, verdict: Verdict, tokens = 1000, wallMs = 10_000, secondVerdict?: Verdict): QaRecord {
  const graded = (each: Verdict) => ({ verdict: each, score: SCORES[each], hallucinated: each === "wrong", quote_unverified: false, reason: "r" });

  return {
    repo: "re-cinq/lore",
    question_id: questionId,
    kind: "tracker",
    arm,
    rep,
    transcript: transcript(tokens, wallMs, 0.01),
    judgements: secondVerdict ? [graded(verdict), graded(secondVerdict)] : [graded(verdict)],
  };
}

const threeAsks = (questionId: string, arm: Arm, verdicts: [Verdict, Verdict, Verdict], tokens = 1000): QaRecord[] =>
  verdicts.map((verdict, index) => ask(questionId, arm, index + 1, verdict, tokens * (index + 1)));

describe("summarizeArm", () => {
  it("scores lore 0.75 over two questions, with a replicate range of 0.5 to 1 and half its questions agreeing across asks", () => {
    const records = [...threeAsks("q1", "lore", ["correct", "correct", "correct"]), ...threeAsks("q2", "lore", ["correct", "wrong", "partial"])];

    expect(summarizeArm("lore", records)).toMatchObject({ questions: 2, score: 0.75, rep_score_range: [0.5, 1], verdict_agreement: 0.5, hallucination_rate: 1 / 6, cost_per_question: 0.01 });
  });
});

describe("comparePair", () => {
  it("counts lore ahead of none on q1 and tied on q2, with a median of 4000 more tokens", () => {
    const records = [
      ...threeAsks("q1", "lore", ["correct", "correct", "correct"], 3000),
      ...threeAsks("q2", "lore", ["wrong", "wrong", "wrong"], 3000),
      ...threeAsks("q1", "none", ["wrong", "wrong", "wrong"]),
      ...threeAsks("q2", "none", ["wrong", "wrong", "wrong"]),
    ];

    expect(comparePair("lore", "none", records)).toMatchObject({ wins: 1, losses: 0, ties: 1, tokens_diff_median: 4000, within_noise: false });
  });
});

describe("pairVerdict", () => {
  it("calls a difference inside the replicate spread a tie", () => {
    expect(pairVerdict({ first: "lore", second: "utopia", wins: 5, losses: 1, ties: 0, mcnemar_p: 0.2, tokens_diff_median: 0, wall_s_diff_median: 0, within_noise: true })).toBe("tie (inside the replicate spread)");
  });

  it("names utopia ahead when it wins more questions outside the spread", () => {
    expect(pairVerdict({ first: "lore", second: "utopia", wins: 1, losses: 5, ties: 0, mcnemar_p: 0.2, tokens_diff_median: 0, wall_s_diff_median: 0, within_noise: false })).toBe("utopia ahead");
  });
});

describe("judgeAgreement", () => {
  it("returns 0.5 when one of two twice-judged answers got two different verdicts", () => {
    expect(judgeAgreement([ask("q1", "lore", 1, "correct", 1, 1, "correct"), ask("q2", "lore", 1, "correct", 1, 1, "partial"), ask("q3", "lore", 1, "wrong")])).toBe(0.5);
  });
});

describe("unstableQuestions", () => {
  it("lists q2 on lore with its verdicts in replicate order", () => {
    const records = [...threeAsks("q1", "lore", ["correct", "correct", "correct"]), ...threeAsks("q2", "lore", ["correct", "wrong", "partial"])];

    expect(unstableQuestions(records)).toEqual([{ question_id: "q2", arm: "lore", verdicts: ["correct", "wrong", "partial"] }]);
  });
});

describe("renderQaReport", () => {
  it("shows lore's lift of +1.00 over none", () => {
    const records = [...threeAsks("q1", "lore", ["correct", "correct", "correct"]), ...threeAsks("q1", "none", ["wrong", "wrong", "wrong"])];

    expect(renderQaReport({ title: "T", generatedAt: "2026-10-27", records })).toMatch(/\| lore \| 1 \| 1\.00 \(1\.00–1\.00\) \| \+1\.00 \|/);
  });
});
