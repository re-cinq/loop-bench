import type { ModelRow } from './rank.js';
export interface Place { place: number; of: number }
export interface Standing { works: Place | null; cost: Place | null; time: Place | null; missingText?: string }
export function moneyText(value: number | null | undefined): string | null;
export function minutesText(value: number | null | undefined): string | null;
export function ordinal(number: number): string;
export function cardSentence(task: string, row: ModelRow): string;
export function placeOf(value: number, values: number[], options: { lowerIsBetter: boolean }): number;
export function standingOf(row: ModelRow, rows: ModelRow[]): Standing;
export function standingSentence(task: string, standing: Standing): string;
export function summaryParagraph(model: string, standings: Record<string, Standing>): string;
export function moneyRangeText(low: number, high: number): string;
export function minutesRangeText(low: number, high: number): string;
