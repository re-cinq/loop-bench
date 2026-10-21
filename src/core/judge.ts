// The judge's brief and its verdict: the ticket, the merged pull request's diff, the candidate's diff, scores 1-5.
import { JudgeScoresSchema } from "./records.js";
import type { z } from "zod";

export type JudgeScores = z.infer<typeof JudgeScoresSchema>;

export interface JudgeInput {
  ticket: string;
  referenceDiff: string;
  candidateDiff: string;
  dodMarkdown: string | null;
  diffCapChars: number;
}

export function buildJudgePrompt(input: JudgeInput): string {
  return withoutFileReferences(`You are grading an attempt to implement a GitHub issue. You see the issue, the diff of the pull request a human team merged for it (the reference), and the diff an automated agent produced on the same base commit (the candidate). Grade the candidate, not the reference.

Score each criterion 1 to 5:
- correctness: does the candidate's code do what it claims without bugs, regressions or broken tests? 5 = would merge as is; 1 = wrong or broken.
- completeness_vs_ticket: how much of what the issue asks for does the candidate deliver, judged against the issue's own acceptance criteria? 5 = everything; 1 = nothing relevant.
- closeness_to_reference: does the candidate solve it where and how the reference did (same files, same seams, same behaviour)? A different but equally sound design scores 3 or 4, not 1.

Reply with a single JSON object and nothing else:
{"correctness": n, "completeness_vs_ticket": n, "closeness_to_reference": n, "rationale": "three to six sentences naming the specific gaps or strengths"}

## Issue

${input.ticket}

## Reference diff (merged)

\`\`\`diff
${cap(input.referenceDiff, input.diffCapChars)}
\`\`\`

## Candidate diff

\`\`\`diff
${cap(input.candidateDiff, input.diffCapChars)}
\`\`\`
${input.dodMarkdown ? `\n## The candidate's own definition of done (.lore/dod.md)\n\n${cap(input.dodMarkdown, 8000)}\n` : ""}`);
}

/** gemini-cli reads every `@path` in a prompt as a file to include, and hangs on the hundreds a diff's `@@` hunk headers and decorators make. */
function withoutFileReferences(prompt: string): string {
  return prompt.replaceAll("@@", "##").replaceAll("@", "(at)");
}

function cap(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}\n...(truncated ${text.length - max} characters)` : text;
}

export function parseJudgeOutput(text: string): JudgeScores | null {
  const candidates = [...text.matchAll(/\{[\s\S]*?\}(?=\s*$|\s*\n)/g)].map((match) => match[0]);

  for (const candidate of candidates.reverse()) {
    try {
      const parsed = JudgeScoresSchema.safeParse(JSON.parse(candidate));

      if (parsed.success) {
        return parsed.data;
      }
    } catch {
      continue;
    }
  }
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);

  if (fenced?.[1]) {
    return parseJudgeOutput(fenced[1].trim());
  }

  return null;
}
