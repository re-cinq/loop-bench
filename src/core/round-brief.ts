// The file the next agent reads about a red build. Ported from lore libs/shared/src/work/ci-wait/round-brief.ts; the summary shape follows summarizeFailedChecks in check-runs.ts.

export interface CiFeedback {
  sha: string;
  failedChecks: string;
  summary: string;
}

export interface RoundHandoff {
  done: string | null;
  next: string;
}

export interface CheckResult {
  name: string;
  passed: boolean;
  tail: string;
}

const MAX_FEEDBACK_CHARS = 2500;

export function roundBriefOf({ feedback, handoff }: { feedback: CiFeedback; handoff: RoundHandoff | null }): string {
  const sections = [ciFeedbackSection(feedback), ...(handoff ? [handoffSection(handoff)] : [])];

  return sections.join("\n");
}

export function ciFeedbackSection(feedback: CiFeedback): string {
  return `## CI reported failures on ${feedback.sha}

The build for your last push is red. These checks failed: ${feedback.failedChecks}

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.
${reportedDetail(feedback.summary)}`;
}

function reportedDetail(summary: string): string {
  if (summary === "") {
    return "";
  }
  const capped = summary.length > MAX_FEEDBACK_CHARS ? `${summary.substring(0, MAX_FEEDBACK_CHARS)}\n...(truncated)` : summary;

  return `
\`\`\`
${capped}
\`\`\`
`;
}

function handoffSection(handoff: RoundHandoff): string {
  const doneLine = handoff.done ? `- Done: ${handoff.done}\n` : "";

  return `## The previous round reported

${doneLine}- Next: ${handoff.next}
`;
}

export function ciFeedbackOf(sha: string, checks: readonly CheckResult[]): CiFeedback | null {
  const failed = checks.filter((check) => !check.passed);

  if (failed.length === 0) {
    return null;
  }
  const summary = failed
    .map((check) => (check.tail.trim() === "" ? "" : `### ${check.name} (failure)\n\n${check.tail.trim()}`))
    .filter((block) => block.length > 0)
    .join("\n\n");

  return {
    sha,
    failedChecks: failed.map((check) => check.name).join(", "),
    summary: summary.length > MAX_FEEDBACK_CHARS ? `${summary.substring(0, MAX_FEEDBACK_CHARS)}\n...(truncated)` : summary,
  };
}

export function handoffOf(extras: Record<string, string>): RoundHandoff | null {
  const next = extras["tdd_next"];

  return next === undefined ? null : { done: extras["tdd_done"] ?? null, next };
}
