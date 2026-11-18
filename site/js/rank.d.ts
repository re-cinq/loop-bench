export interface Spread { median: number; p25: number; p75: number }
export interface Weights { quality: number; price: number; speed: number }
export interface ModelRow {
  harness: string;
  model: string;
  runs: number;
  successes: number;
  successRate: number;
  costUsd: Spread | null;
  minutes: Spread | null;
  review: number | null;
  strength: string;
  tickets: number[];
  costUnknownRuns: number;
  costPerSuccessUsd: number | null;
  minutesPerSuccess: number | null;
  [field: string]: unknown;
}
export interface RunRow { task: string; ticket: number; harness: string; model: string; success: boolean; costUsd: number | null; minutes: number | null; correctness: number | null; completeness: number | null; closeness: number | null }
export function summarizeModels(runs: RunRow[], options?: { reviewed?: boolean }): ModelRow[];
export function ticketAveragedSuccessRate(runs: { ticket: number; success: boolean }[]): number;
export function costPerWorkingResult(runs: { costUsd: number | null; success: boolean }[]): number | null;
export function missingText(missingTickets: number[], sizeOfTicket: Record<number, string>): string;
export function splitByCoverage(rows: ModelRow[], sizeOfTicket: Record<number, string>): { fullyTested: ModelRow[]; notFullyTested: (ModelRow & { missing: number[]; missingText: string })[] };
export function cheapnessScores(values: (number | null)[]): number[];
export function spreadScores(values: number[]): number[];
export function qualityOf(row: ModelRow): number;
export function normalizeWeights(weights: Weights): Weights;
export function rank(rows: ModelRow[], weights: Weights): (ModelRow & { score: number })[];
export function ranked(rows: ModelRow[], weights: Weights): (ModelRow & { score: number })[];
export function percentile(values: number[], share: number): number | null;
export const FEW_RUNS_BELOW: number;
export const WORKS_AS_OFTEN_SHARE: number;
export function minutesPerWorkingResult(runs: { minutes: number | null; success: boolean }[]): number | null;
export function worksAsOftenAsBest<T>(candidates: T[], rateOf: (candidate: T) => number): T[];
export function lowestBy<T>(candidates: T[], valueOf: (candidate: T) => number | null): T | null;
export function reliableChoices(rows: ModelRow[]): { best: ModelRow | null; eligible: ModelRow[]; cheapest: ModelRow | null; fastest: ModelRow | null };
