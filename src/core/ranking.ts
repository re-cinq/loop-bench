import { groupBy, type RunRow } from "./model-stats.js";
import { percentile } from "./stats.js";

export type RankableRun = Pick<RunRow, "task" | "ticket" | "harness" | "model" | "success" | "costUsd" | "minutes" | "correctness" | "completeness" | "closeness">;

export interface Spread {
  median: number;
  p25: number;
  p75: number;
}

export interface ModelSummary {
  task: string;
  harness: string;
  model: string;
  runs: number;
  successes: number;
  successRate: number;
  tickets: number[];
  costUsd: Spread | null;
  costUnknownRuns: number;
  minutes: Spread | null;
  review: number | null;
  costPerSuccessUsd: number | null;
  minutesPerSuccess: number | null;
  strength: "few" | "measured";
}

export interface Weights {
  quality: number;
  price: number;
  speed: number;
}

export type ScoredSummary = ModelSummary & { score: number };

export const FEW_RUNS_BELOW = 5;
export const WORKS_AS_OFTEN_SHARE = 0.75;
export const RECOMMENDED_WEIGHTS: Weights = { quality: 6, price: 2, speed: 2 };
const REVIEW_SCALE = { min: 1, max: 5 };
const SUCCESS_SHARE_OF_QUALITY = 0.7;
const SMALLEST_PRICE = 1e-6;

const sum = (values: readonly number[]): number => values.reduce((total, value) => total + value, 0);
const present = (values: readonly (number | null)[]): number[] => values.flatMap((value) => value ?? []);

function spreadOf(values: readonly (number | null)[]): Spread | null {
  const known = present(values);
  const median = percentile(known, 50);

  return median === null ? null : { median, p25: percentile(known, 25)!, p75: percentile(known, 75)! };
}

function reviewOf(runs: readonly RankableRun[]): number | null {
  const scores = present(runs.flatMap((run) => [run.correctness, run.completeness, run.closeness]));

  return scores.length === 0 ? null : sum(scores) / scores.length;
}

/** The average of the per-ticket success shares, so every ticket counts once however often it was run. */
export function ticketAveragedSuccessRate(runs: readonly Pick<RankableRun, "ticket" | "success">[]): number {
  const byTicket = groupBy(runs, (run) => [run.ticket]);

  return sum(byTicket.map((ticketRuns) => ticketRuns.filter((run) => run.success).length / ticketRuns.length)) / byTicket.length;
}

function perWorkingResult(runs: readonly Pick<RankableRun, "success">[], values: readonly (number | null)[]): number | null {
  const known = present(values);
  const successes = runs.filter((run) => run.success).length;

  return successes === 0 || known.length === 0 ? null : ((sum(known) / known.length) * runs.length) / successes;
}

/** Mean known cost times all runs, over the runs that worked; null when nothing worked or no cost is known. */
export function costPerWorkingResult(runs: readonly Pick<RankableRun, "costUsd" | "success">[]): number | null {
  return perWorkingResult(runs, runs.map((run) => run.costUsd));
}

/** Mean known minutes times all runs, over the runs that worked; null when nothing worked or no time is known. */
export function minutesPerWorkingResult(runs: readonly Pick<RankableRun, "minutes" | "success">[]): number | null {
  return perWorkingResult(runs, runs.map((run) => run.minutes));
}

/** Candidates that worked at all and work at least three quarters as often as the best of them. */
export function worksAsOftenAsBest<T>(candidates: readonly T[], rateOf: (candidate: T) => number): T[] {
  const best = Math.max(0, ...candidates.map(rateOf));

  return candidates.filter((candidate) => rateOf(candidate) > 0 && rateOf(candidate) >= WORKS_AS_OFTEN_SHARE * best);
}

/** The candidate with the smallest known value; null when none has one. */
export function lowestBy<T>(candidates: readonly T[], valueOf: (candidate: T) => number | null): T | null {
  const known = candidates.filter((candidate) => valueOf(candidate) !== null);

  return known.length === 0 ? null : known.reduce((lowest, candidate) => (valueOf(candidate)! < valueOf(lowest)! ? candidate : lowest));
}

/** One row per harness and model from a task's runs. Pass reviewed: false for a task the AI reviewer cannot judge. */
export function summarizeModels(runs: readonly RankableRun[], { reviewed = true }: { reviewed?: boolean } = {}): ModelSummary[] {
  return groupBy(runs, (run) => [run.harness, run.model]).map((group) => ({
    task: group[0]!.task,
    harness: group[0]!.harness,
    model: group[0]!.model,
    runs: group.length,
    successes: group.filter((run) => run.success).length,
    successRate: ticketAveragedSuccessRate(group),
    tickets: [...new Set(group.map((run) => run.ticket))],
    costUsd: spreadOf(group.map((run) => run.costUsd)),
    costUnknownRuns: group.filter((run) => run.costUsd === null).length,
    minutes: spreadOf(group.map((run) => run.minutes)),
    review: reviewed ? reviewOf(group) : null,
    costPerSuccessUsd: costPerWorkingResult(group),
    minutesPerSuccess: minutesPerWorkingResult(group),
    strength: group.length < FEW_RUNS_BELOW ? "few" : "measured",
  }));
}

const plural = (count: number, word: string): string => `${count} ${word}${count === 1 ? "" : "s"}`;

/** "not run on the large ticket" from the tickets a model is missing, using the size of each ticket. */
export function missingText(missingTickets: readonly number[], sizeOfTicket: Readonly<Record<number, string | null>>): string {
  const parts = groupBy(missingTickets, (ticket) => [sizeOfTicket[ticket] ?? "other"]).map((tickets) => {
    const size = sizeOfTicket[tickets[0]!] ?? "other";

    return tickets.length === 1 ? `the ${size} ticket` : plural(tickets.length, `${size} ticket`);
  });
  const last = parts.pop();

  return `not run on ${parts.length > 0 ? `${parts.join(", ")} or ${last}` : last}`;
}

/** Models that ran every ticket anyone ran come first; the rest, each with what it lacks, go in their own list. */
export function splitByCoverage(rows: readonly ModelSummary[], sizeOfTicket: Readonly<Record<number, string | null>>): { fullyTested: ModelSummary[]; notFullyTested: (ModelSummary & { missingText: string })[] } {
  const allTickets = [...new Set(rows.flatMap((row) => row.tickets))];
  const withMissing = rows.map((row) => ({ ...row, missing: allTickets.filter((ticket) => !row.tickets.includes(ticket)) }));

  return {
    fullyTested: withMissing.filter((row) => row.missing.length === 0),
    notFullyTested: withMissing.filter((row) => row.missing.length > 0).map((row) => ({ ...row, missingText: missingText(row.missing, sizeOfTicket) })),
  };
}

/** 1 for the highest value, 0 for the lowest; every value scores 1 when they are all equal. */
export function spreadScores(values: readonly number[]): number[] {
  const lowest = Math.min(...values);
  const span = Math.max(...values) - lowest;

  return values.map((value) => (span === 0 ? 1 : (value - lowest) / span));
}

/** 1 for the smallest value, 0 for the largest, on a log scale; missing values score 0. */
export function cheapnessScores(values: readonly (number | null)[]): number[] {
  const logOf = (value: number): number => Math.log(Math.max(value, SMALLEST_PRICE));
  const logs = present(values).map(logOf);
  const lowest = Math.min(...logs);
  const span = Math.max(...logs) - lowest;

  return values.map((value) => {
    if (value === null) {
      return 0;
    }

    return span === 0 ? 1 : 1 - (logOf(value) - lowest) / span;
  });
}

export function qualityOf(row: Pick<ModelSummary, "review" | "successRate">): number {
  if (row.review === null) {
    return row.successRate;
  }
  const reviewShare = (row.review - REVIEW_SCALE.min) / (REVIEW_SCALE.max - REVIEW_SCALE.min);

  return SUCCESS_SHARE_OF_QUALITY * row.successRate + (1 - SUCCESS_SHARE_OF_QUALITY) * reviewShare;
}

export function normalizeWeights({ quality, price, speed }: Weights): Weights {
  const total = quality + price + speed;

  return total <= 0 ? { quality: 1 / 3, price: 1 / 3, speed: 1 / 3 } : { quality: quality / total, price: price / total, speed: speed / total };
}

/** The rows with a 0-1 score, in the order given. */
export function rank(rows: readonly ModelSummary[], weights: Weights): ScoredSummary[] {
  const { quality, price, speed } = normalizeWeights(weights);
  const qualityScores = spreadScores(rows.map(qualityOf));
  const priceScores = cheapnessScores(rows.map((row) => row.costUsd?.median ?? null));
  const speedScores = cheapnessScores(rows.map((row) => row.minutes?.median ?? null));

  return rows.map((row, index) => ({ ...row, score: quality * qualityScores[index]! + price * priceScores[index]! + speed * speedScores[index]! }));
}

const canLead = (row: ModelSummary): boolean => row.successes > 0 && row.strength === "measured";

/** Best score first; models that never worked, or have few runs, come after every model that can lead. */
export function ranked(rows: readonly ModelSummary[], weights: Weights): ScoredSummary[] {
  return rank(rows, weights).sort((a, b) => Number(canLead(b)) - Number(canLead(a)) || b.score - a.score);
}

/** Among measured rows: the most reliable, those that work at least three quarters as often, and of those the cheapest and fastest per working result. */
export function reliableChoices(rows: readonly ModelSummary[]): { best: ModelSummary | null; eligible: ModelSummary[]; cheapest: ModelSummary | null; fastest: ModelSummary | null } {
  const measured = rows.filter((row) => row.strength === "measured");
  const eligible = worksAsOftenAsBest(measured, (row) => row.successRate);
  const best = measured.reduce<ModelSummary | null>((top, row) => (top === null || row.successRate > top.successRate ? row : top), null);

  return { best, eligible, cheapest: lowestBy(eligible, (row) => row.costPerSuccessUsd), fastest: lowestBy(eligible, (row) => row.minutesPerSuccess) };
}
