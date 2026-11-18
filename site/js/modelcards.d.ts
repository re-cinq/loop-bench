import type { SteadyRun } from './steadiness.js';
export interface TaskFigures { share: number; cost: number | null; minutes: number | null; ranked: boolean }
export interface CardEntry { key: string; model: string; maker: string; tasks: Record<string, TaskFigures | undefined> }
export const SORT_OPTIONS: { key: string; label: string }[];
export const DEFAULT_SORT: string;
export function isSortKey(key: string | null | undefined): boolean;
export function segmentCounts(runs: SteadyRun[]): { always: number; flips: number; never: number };
export function trackPositions(values: (number | null)[]): (number | null)[];
export function sortEntries<T extends CardEntry>(entries: T[], sortKey: string): T[];
export function leaderSentence(entries: CardEntry[]): string;
export function compactMinutes(value: number | null): string;
