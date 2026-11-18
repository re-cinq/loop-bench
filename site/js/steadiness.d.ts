export interface SteadyRun { setup: string; task: string; knowledgeBase: string; ticket: number; size: string | null; replicate: number; success: boolean; costUsd: number | null; minutes: number | null; endReason: string }
export interface SetupGroup { task: string; knowledgeBase: string; ticket: number; size: string | null; runs: SteadyRun[] }
export interface Delta { without: number; withKb: number; delta: number }
export interface KnowledgeDifference { successRate: Delta; medianCostUsd: Delta; medianMinutes: Delta; runsWithout: number; runsWithKb: number }
export function groupSetups(runs: SteadyRun[]): SetupGroup[];
export function flipped(setup: SetupGroup): boolean;
export function steadinessSentences(setups: SetupGroup[]): string[];
export function failureCounts(runs: SteadyRun[]): Record<string, Record<string, number>>;
export function isFewRuns(runs: number): boolean;
export function knowledgeSentence(difference: KnowledgeDifference, knowledgeBaseLabel: string): string;
