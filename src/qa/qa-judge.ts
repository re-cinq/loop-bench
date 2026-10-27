// The context-qa judge: a fresh claude with no tools compares an answer with the hand-checked gold answer; the score and the hallucination flag are decided here, in code.
import { z } from "zod";
import { firstJsonObject } from "./transcript.js";
import type { Question } from "./bank.js";

export const VerdictSchema = z.enum(["correct", "partial", "wrong", "abstained"]);
export type Verdict = z.infer<typeof VerdictSchema>;

export const JudgementSchema = z.object({
  verdict: VerdictSchema,
  contradicted_gold_sentence: z.string().default(""),
  reason: z.string(),
});
export type Judgement = z.infer<typeof JudgementSchema>;

export interface Graded {
  verdict: Verdict;
  score: number;
  hallucinated: boolean;
  /** A judge that called the answer wrong by quoting a sentence the gold answer does not hold. */
  quote_unverified: boolean;
  reason: string;
}

export function buildQaJudgePrompt(question: Question, answer: string | null): string {
  return `You grade an answer to a question about a software repository against a gold answer that was checked by hand. Grade only against the gold answer; do not use your own knowledge of the repository.

Verdicts:
- correct: the answer states everything essential in the gold answer and nothing that contradicts it. Extra true-sounding detail the gold answer does not mention is fine.
- partial: the answer states some of what is essential and contradicts nothing, or hedges between the right answer and a wrong one.
- wrong: the answer states something the gold answer contradicts, or answers a different question.
- abstained: the answer says it does not know, or that it could not find the answer.

When the verdict is wrong because of a contradiction, copy into contradicted_gold_sentence the one sentence of the gold answer it conflicts with, word for word; otherwise leave it empty.

Reply with a single JSON object and nothing else:
{"verdict": "correct|partial|wrong|abstained", "contradicted_gold_sentence": "", "reason": "one sentence"}

## Question

${question.question}

## Gold answer

${question.gold_answer}

## Answer to grade

${answer ?? "(the agent returned no answer)"}`;
}

export function parseJudgement(text: string): Judgement | null {
  const parsed = JudgementSchema.safeParse(firstJsonObject(text));

  return parsed.success ? parsed.data : null;
}

/** The judge's verdict as a score: an unanswerable question is right only when the agent abstained, and any answer to it is a hallucination. */
export function grade(question: Question, judgement: Judgement): Graded {
  const quoteUnverified = judgement.verdict === "wrong" && judgement.contradicted_gold_sentence !== "" && !normalised(question.gold_answer).includes(normalised(judgement.contradicted_gold_sentence));

  if (question.must_abstain) {
    const abstained = judgement.verdict === "abstained";

    return { verdict: judgement.verdict, score: abstained ? 1 : 0, hallucinated: !abstained, quote_unverified: false, reason: judgement.reason };
  }

  return {
    verdict: judgement.verdict,
    score: { correct: 1, partial: 0.5, wrong: 0, abstained: 0 }[judgement.verdict],
    hallucinated: judgement.verdict === "wrong",
    quote_unverified: quoteUnverified,
    reason: judgement.reason,
  };
}

function normalised(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}
