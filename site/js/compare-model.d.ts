import type { ModelRow } from './rank.js';

export interface Thing { harness: string; model: string; kb: string; size: string }
export interface ComparedRun {
  task: string; harness: string; model: string; knowledgeBase: string; ticket: number; size: string | null;
  setup: string; replicate: number; success: boolean; costUsd: number | null; minutes: number | null; rounds: number | null;
  correctness: number | null; completeness: number | null; closeness: number | null; endReason: string;
}
export interface Failure { failures: number; count?: number; reason?: string; words?: string }
export interface Column {
  thing: Thing; name: string; empty: boolean; runs: number;
  row?: ModelRow; rounds?: number | null; steadiness?: { repeated: number; steady: number }; failure?: Failure;
  missing?: number[]; missingText?: string | null;
}
export interface Comparison { task: string; columns: Column[]; sharedTickets: boolean; commonTickets: number[]; leftOut: number[]; sizeOfTicket: Record<number, string | null> }
export interface BestColumns { works: number[]; cost: number[]; time: number[]; review: number[]; rounds: number[]; costPerWorking: number[]; steady: number[] }
export function thingKey(thing: Thing): string;
export function modelKeyOf(item: { harness: string; model: string }): string;
export function parseThing(text: string | null | undefined): Thing | null;
export function thingRuns(runs: ComparedRun[], thing: Thing, task: string): ComparedRun[];
export function qualifierText(thing: Thing): string;
export function thingNames(things: Thing[]): string[];
export function bestIndexes(values: (number | null)[], options: { lowerIsBetter: boolean; digits?: number }): number[];
export function buildComparison(allRuns: ComparedRun[], things: Thing[], task: string): Comparison;
export function fairnessLine(comparison: Comparison): string | null;
export function bestColumns(columns: Column[]): BestColumns;
export function sameModelSentences(columns: Column[]): string[];
export function comparisonParagraph(comparison: Comparison): string;
