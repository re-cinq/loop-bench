// The question bank of the context-qa experiment: questions about a repository, each with a gold answer checked by hand against its evidence.
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { z } from "zod";

export const QuestionKindSchema = z.enum(["decision", "requirement", "code-location", "history", "tracker", "learned", "temporal", "unanswerable"]);
export type QuestionKind = z.infer<typeof QuestionKindSchema>;

export const QuestionSchema = z
  .object({
    id: z.string().regex(/^[a-z]+-[a-z]+-\d{2}$/),
    kind: QuestionKindSchema,
    question: z.string().min(1),
    gold_answer: z.string().min(1),
    evidence: z.array(z.string()).default([]),
    must_abstain: z.boolean().default(false),
  })
  .refine((question) => question.must_abstain === (question.kind === "unanswerable"), { message: "must_abstain is true exactly for an unanswerable question" });
export type Question = z.infer<typeof QuestionSchema>;

export const BankSchema = z
  .object({
    repo: z.string().regex(/^[^/]+\/[^/]+$/),
    checked_at: z.string(),
    /** The repository's Utopia knowledge base, which the utopia arm's MCP server is mounted on. */
    utopia_kb_id: z.string().uuid().optional(),
    questions: z.array(QuestionSchema).min(1),
  })
  .refine((bank) => new Set(bank.questions.map((question) => question.id)).size === bank.questions.length, { message: "question ids are unique" });
export type Bank = z.infer<typeof BankSchema>;

export function parseBank(yamlText: string): Bank {
  return BankSchema.parse(parse(yamlText));
}

export function loadBank(path: string): Bank {
  return parseBank(readFileSync(path, "utf8"));
}
