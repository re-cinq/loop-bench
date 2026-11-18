import type { KnowledgeRun } from './knowledge.js';
import type { RunRow } from './rank.js';

export type FindingRun = RunRow & KnowledgeRun & { size: string | null; setup: string; replicate: number; endReason: string };
export interface Recommendation { task: string; model: string; harness: string; successes: number; runs: number; successRate: number; costUsd: number | null; minutes: number | null; strength: string; href: string }
export interface Finding { text: string; href: string }
export const RECOMMENDED_WEIGHTS: { quality: number; price: number; speed: number };
export const RELIABLE_SHARE: number;
export function moneyText(value: number | null): string;
export function minutesText(value: number | null): string;
export function recommendations(runs: FindingRun[]): Recommendation[];
export function findingsOf(runs: FindingRun[]): Finding[];
export function factsOf(runs: { harness: string; model: string; ticket: number }[], totalCostUsd: number): { runs: number; models: number; tickets: number; totalCostUsd: number };
