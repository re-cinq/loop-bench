import type { ModelRow, RunRow } from './rank.js';
export interface PricedRun extends RunRow { size: string | null; knowledgeBase: string; success: boolean }
export interface Spread { median: number; p25: number; p75: number }
export interface RunIndex { groups: Map<string, PricedRun[]>; models: string[] }
export interface SizeRatios { cost: number; minutes: number; share: number; models: number }
export type Basis = 'measured' | 'few' | 'estimated' | 'none';
export interface Figure {
  basis: Basis;
  runs: number;
  successes?: number;
  share?: number;
  cost?: Spread | null;
  minutes?: Spread | null;
  costUnknownRuns?: number;
  how?: { kind: 'all-knowledge-bases' } | { kind: 'scaled'; fromSize: string; ratios: SizeRatios };
}
export interface WorkingResult { attempts: number; capped: boolean; cost: Spread | null; minutes: Spread | null }
export type LineStatus = 'ok' | 'no-data' | 'never-works' | 'none-works';
export interface Line { task: string; size: string; count: number; model: string | null; figure: Figure; result: WorkingResult | null; status: LineStatus }
export interface Part { expected: number | null; low: number | null; high: number | null }
export interface Totals { cost: Part; minutes: Part; leftOut: Line[] }
export interface Pricing { lines: Line[]; totals: Totals }
export interface Work { counts: Record<string, number>; mix: Record<string, number>; modelFor: (task: string, size: string) => string | null; kb: string }
export interface Choice extends Pricing { key: string; label: string; shared: { lines: Line[]; totals: Totals; of: number } }
export const MIN_RUNS: number;
export const MAX_ATTEMPTS: number;
export const WORKS_AS_OFTEN_SHARE: number;
export const RECOMMENDED_WEIGHTS: { quality: number; price: number; speed: number };
export const TASK_KEYS: string[];
export const SIZE_KEYS: string[];
export const CHOICE_LABELS: Record<string, string>;
export function modelKeyOf(item: { harness: string; model: string }): string;
export function modelNameOf(key: string): string;
export function indexRuns(runs: PricedRun[]): RunIndex;
export function sizeRatios(index: RunIndex, query: { task: string; fromSize: string; toSize: string; excludeModel?: string }): SizeRatios | null;
export function figureFor(index: RunIndex, query: { task: string; model: string; kb: string; size: string }): Figure;
export function workingResult(figure: Figure): WorkingResult | null;
export function seenMix(sizeOfTicket: Record<number, string>): Record<string, number>;
export function wholeSizeMix(size: string): Record<string, number>;
export function mixFromPercents(percents: Record<string, number>): Record<string, number> | null;
export function totalsOf(lines: Line[]): Totals;
export function priceWork(index: RunIndex, work: Work): Pricing;
export function compareChoices(index: RunIndex, query: { counts: Record<string, number>; mix: Record<string, number>; kb: string; others?: Choice[] }): Choice[];
export function choicesFor(index: RunIndex, query: { task: string; size: string; kb: string }): { recommended: string | null; cheapest: string | null; fastest: string | null };
export function sameModelFor(models: Record<string, string>): (task: string) => string;
export function leftOutText(lines: Line[]): string;
export function hoursText(minutes: number): string;
export function totalMoneyText(value: number): string;
export function usedModels(lines: Line[]): string[];
export function answerSentence(pricing: Pricing): string;
export function surenessText(figure: Figure): string;
export function costUnknownText(figure: Figure): string | null;
export type { ModelRow };
