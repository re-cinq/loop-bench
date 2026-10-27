// The context-qa report: per arm, quality, tokens and time side by side, the lift over no MCP, the spread across the three asks of each question, and paired comparisons.
import type { Arm } from "./arms.js";
import type { QuestionKind } from "./bank.js";
import type { Graded } from "./qa-judge.js";
import { coefficientOfVariation, mcnemarExact, percentile } from "./qa-stats.js";
import type { QaTranscript } from "./transcript.js";

/** One fresh claude's answer to one question, with its judgement; the replicate judged twice carries two. */
export interface QaRecord {
  repo: string;
  question_id: string;
  kind: QuestionKind;
  arm: Arm;
  rep: number;
  transcript: QaTranscript;
  judgements: Graded[];
}

export interface ArmSummary {
  arm: Arm;
  questions: number;
  score: number;
  /** The arm's score on each replicate alone, lowest and highest. */
  rep_score_range: [number, number];
  hallucination_rate: number;
  tokens_p50: number | null;
  tokens_p95: number | null;
  cost_per_question: number;
  wall_s_p50: number | null;
  wall_s_p95: number | null;
  mcp_calls: number;
  verdict_agreement: number;
  tokens_cv_median: number | null;
  wall_cv_median: number | null;
}

export interface PairSummary {
  first: Arm;
  second: Arm;
  wins: number;
  losses: number;
  ties: number;
  mcnemar_p: number;
  tokens_diff_median: number | null;
  wall_s_diff_median: number | null;
  /** True when the score difference is inside both arms' replicate ranges. */
  within_noise: boolean;
}

const ARMS: readonly Arm[] = ["none", "lore", "utopia"];
const PAIRS: ReadonlyArray<[Arm, Arm]> = [["lore", "none"], ["utopia", "none"], ["lore", "utopia"]];

export function totalTokens(transcript: QaTranscript): number {
  const usage = transcript.usage;

  return usage.input_tokens + usage.output_tokens + usage.cache_read_tokens + usage.cache_write_tokens;
}

/** The first judgement is the verdict; a second one only measures the judge. */
function firstGrade(record: QaRecord): Graded | undefined {
  return record.judgements[0];
}

function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: readonly number[]): number | null {
  return percentile(values, 50);
}

function byQuestion(records: readonly QaRecord[]): Map<string, QaRecord[]> {
  const groups = new Map<string, QaRecord[]>();

  for (const record of records) {
    groups.set(record.question_id, [...(groups.get(record.question_id) ?? []), record]);
  }

  return groups;
}

function questionScores(records: readonly QaRecord[]): Map<string, number> {
  return new Map([...byQuestion(records)].map(([id, asks]) => [id, mean(asks.map((ask) => firstGrade(ask)?.score ?? 0))]));
}

function questionMeans(records: readonly QaRecord[], pick: (record: QaRecord) => number): Map<string, number> {
  return new Map([...byQuestion(records)].map(([id, asks]) => [id, mean(asks.map(pick))]));
}

function wallSeconds(record: QaRecord): number {
  return (record.transcript.duration_ms ?? 0) / 1000;
}

export function summarizeArm(arm: Arm, all: readonly QaRecord[]): ArmSummary {
  const records = all.filter((record) => record.arm === arm);
  const groups = [...byQuestion(records).values()];
  const reps = [...new Set(records.map((record) => record.rep))];
  const repScores = reps.map((rep) => mean(records.filter((record) => record.rep === rep).map((record) => firstGrade(record)?.score ?? 0)));
  const tokens = records.map((record) => totalTokens(record.transcript));
  const walls = records.map(wallSeconds);
  const cvs = (pick: (record: QaRecord) => number): number | null =>
    median(groups.map((asks) => coefficientOfVariation(asks.map(pick))).filter((cv): cv is number => cv !== null));

  return {
    arm,
    questions: groups.length,
    score: mean([...questionScores(records).values()]),
    rep_score_range: [Math.min(...repScores), Math.max(...repScores)],
    hallucination_rate: mean(records.map((record) => (firstGrade(record)?.hallucinated ? 1 : 0))),
    tokens_p50: percentile(tokens, 50),
    tokens_p95: percentile(tokens, 95),
    cost_per_question: mean(records.map((record) => record.transcript.usage.reported_cost_usd ?? 0)),
    wall_s_p50: percentile(walls, 50),
    wall_s_p95: percentile(walls, 95),
    mcp_calls: mean(records.map((record) => record.transcript.mcp_calls)),
    verdict_agreement: mean(groups.map((asks) => (new Set(asks.map((ask) => firstGrade(ask)?.verdict)).size === 1 ? 1 : 0))),
    tokens_cv_median: cvs((record) => totalTokens(record.transcript)),
    wall_cv_median: cvs(wallSeconds),
  };
}

/** A question counts as right for an arm when most of its asks were judged correct. */
function rightByMajority(records: readonly QaRecord[]): Map<string, boolean> {
  return new Map([...byQuestion(records)].map(([id, asks]) => [id, asks.filter((ask) => firstGrade(ask)?.score === 1).length * 2 > asks.length]));
}

export function comparePair(first: Arm, second: Arm, all: readonly QaRecord[]): PairSummary {
  const ofFirst = all.filter((record) => record.arm === first);
  const ofSecond = all.filter((record) => record.arm === second);
  const scoresFirst = questionScores(ofFirst);
  const scoresSecond = questionScores(ofSecond);
  const ids = [...scoresFirst.keys()].filter((id) => scoresSecond.has(id));
  const differences = ids.map((id) => scoresFirst.get(id)! - scoresSecond.get(id)!);
  const rightFirst = rightByMajority(ofFirst);
  const rightSecond = rightByMajority(ofSecond);
  const onlyFirst = ids.filter((id) => rightFirst.get(id) && !rightSecond.get(id)).length;
  const onlySecond = ids.filter((id) => !rightFirst.get(id) && rightSecond.get(id)).length;
  const pairedDiff = (pick: (record: QaRecord) => number): number | null => {
    const meansFirst = questionMeans(ofFirst, pick);
    const meansSecond = questionMeans(ofSecond, pick);

    return median(ids.map((id) => meansFirst.get(id)! - meansSecond.get(id)!));
  };
  const rangeFirst = summarizeArm(first, all).rep_score_range;
  const rangeSecond = summarizeArm(second, all).rep_score_range;

  return {
    first,
    second,
    wins: differences.filter((difference) => difference > 0).length,
    losses: differences.filter((difference) => difference < 0).length,
    ties: differences.filter((difference) => difference === 0).length,
    mcnemar_p: mcnemarExact(onlyFirst, onlySecond),
    tokens_diff_median: pairedDiff((record) => totalTokens(record.transcript)),
    wall_s_diff_median: pairedDiff(wallSeconds),
    within_noise: rangeFirst[0] <= rangeSecond[1] && rangeSecond[0] <= rangeFirst[1],
  };
}

/** The share of twice-judged answers whose two verdicts agree; null when no answer was judged twice. */
export function judgeAgreement(records: readonly QaRecord[]): number | null {
  const twice = records.filter((record) => record.judgements.length >= 2);

  return twice.length === 0 ? null : mean(twice.map((record) => (record.judgements[0]!.verdict === record.judgements[1]!.verdict ? 1 : 0)));
}

/** Questions whose asks were judged differently, with each ask's verdict, for reading the answers side by side. */
export function unstableQuestions(records: readonly QaRecord[]): Array<{ question_id: string; arm: Arm; verdicts: string[] }> {
  return ARMS.flatMap((arm) =>
    [...byQuestion(records.filter((record) => record.arm === arm))]
      .map(([id, asks]) => ({ question_id: id, arm, verdicts: [...asks].sort((a, b) => a.rep - b.rep).map((ask) => firstGrade(ask)?.verdict ?? "ungraded") }))
      .filter((row) => new Set(row.verdicts).size > 1),
  );
}

const fixed = (value: number | null, digits = 2): string => (value === null ? "—" : value.toFixed(digits));
const percent = (value: number | null): string => (value === null ? "—" : `${Math.round(value * 100)}%`);
const integer = (value: number | null): string => (value === null ? "—" : Math.round(value).toLocaleString("en-US"));
const signed = (value: number): string => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

function tableRow(cells: ReadonlyArray<string | number>): string {
  return `| ${cells.join(" | ")} |`;
}

/** Who is ahead on score, or a tie when the difference sits inside both arms' replicate ranges. */
export function pairVerdict(pair: PairSummary): string {
  if (pair.within_noise || pair.wins === pair.losses) {
    return "tie (inside the replicate spread)";
  }

  return `${pair.wins > pair.losses ? pair.first : pair.second} ahead`;
}

export function renderQaReport(input: { title: string; generatedAt: string; records: readonly QaRecord[] }): string {
  const { records } = input;
  const arms = ARMS.filter((arm) => records.some((record) => record.arm === arm));
  const summaries = arms.map((arm) => summarizeArm(arm, records));
  const baseline = summaries.find((summary) => summary.arm === "none")?.score ?? null;
  const kinds = [...new Set(records.map((record) => record.kind))];
  const lines = [
    `# ${input.title}`,
    "",
    `Generated ${input.generatedAt}. ${records.length} answer runs. Score: correct 1, partial 0.5, otherwise 0; an unanswerable question scores 1 only when the agent abstained.`,
    "",
    "## Per arm",
    "",
    "| Arm | Questions | Score (rep range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost / question | Wall s p50 / p95 | MCP calls | Score per $ | Score per minute |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
    ...summaries.map((summary) =>
      tableRow([
        summary.arm,
        summary.questions,
        `${fixed(summary.score)} (${fixed(summary.rep_score_range[0])}–${fixed(summary.rep_score_range[1])})`,
        baseline === null ? "—" : signed(summary.score - baseline),
        percent(summary.hallucination_rate),
        `${integer(summary.tokens_p50)} / ${integer(summary.tokens_p95)}`,
        `$${fixed(summary.cost_per_question, 3)}`,
        `${fixed(summary.wall_s_p50, 1)} / ${fixed(summary.wall_s_p95, 1)}`,
        fixed(summary.mcp_calls, 1),
        summary.cost_per_question > 0 ? fixed(summary.score / summary.cost_per_question, 1) : "—",
        summary.wall_s_p50 ? fixed(summary.score / (summary.wall_s_p50 / 60), 2) : "—",
      ]),
    ),
    "",
    "## Per kind (score, lift over none)",
    "",
    `| Kind | ${arms.join(" | ")} |`,
    `|---|${arms.map(() => "---").join("|")}|`,
    ...kinds.map((kind) => {
      const ofKind = records.filter((record) => record.kind === kind);
      const kindBaseline = arms.includes("none") ? summarizeArm("none", ofKind).score : null;
      const cells = arms.map((arm) => {
        const score = summarizeArm(arm, ofKind).score;

        return arm === "none" || kindBaseline === null ? fixed(score) : `${fixed(score)} (${signed(score - kindBaseline)})`;
      });

      return `| ${kind} | ${cells.join(" | ")} |`;
    }),
    "",
    "## Variance across the three asks",
    "",
    "| Arm | Verdict agreement | Median CV of tokens | Median CV of wall time |",
    "|---|---|---|---|",
    ...summaries.map((summary) => `| ${summary.arm} | ${percent(summary.verdict_agreement)} | ${percent(summary.tokens_cv_median)} | ${percent(summary.wall_cv_median)} |`),
    "",
    `Judge agreement on answers judged twice: ${percent(judgeAgreement(records))}.`,
    "",
    "## Paired comparisons",
    "",
    "| First vs second | Wins / losses / ties | McNemar p | Median token difference | Median wall s difference | Verdict |",
    "|---|---|---|---|---|---|",
    ...PAIRS.filter(([first, second]) => arms.includes(first) && arms.includes(second)).map(([first, second]) => {
      const pair = comparePair(first, second, records);

      return `| ${first} vs ${second} | ${pair.wins} / ${pair.losses} / ${pair.ties} | ${fixed(pair.mcnemar_p, 3)} | ${integer(pair.tokens_diff_median)} | ${fixed(pair.wall_s_diff_median, 1)} | ${pairVerdict(pair)} |`;
    }),
    "",
    "## Unstable questions",
    "",
    ...unstableQuestions(records).map((row) => `- ${row.question_id} (${row.arm}): ${row.verdicts.join(", ")}`),
    "",
  ];

  return lines.join("\n");
}
