import type { RunRow } from './rank.js';
export interface KnowledgeRun extends RunRow { knowledgeBase: string }
export interface KnowledgeMeasures { runs: number; successes: number; successRate: number | null; medianCostUsd: number | null; medianMinutes: number | null }
export interface KnowledgeComparison { task: string; setups: number; models: number; loreSetupsWithOneRun: number; byKnowledgeBase: Record<string, KnowledgeMeasures> }
export interface KnowledgeEffect { runs: number; deltaPoints: number; verdict: 'better' | 'about the same' | 'worse'; successRate: number }
export interface ModelEffect { harness: string; model: string; setups: number; none: KnowledgeMeasures; lore: KnowledgeEffect; utopia: KnowledgeEffect }
export const KNOWLEDGE_BASE_KEYS: string[];
export const ABOUT_THE_SAME_POINTS: number;
export function runsOfThreeWaySetups(runs: KnowledgeRun[]): KnowledgeRun[][];
export function compareKnowledgeBases(runs: KnowledgeRun[], task: string): KnowledgeComparison;
export function verdictOf(deltaPoints: number): 'better' | 'about the same' | 'worse';
export function effectPerModel(runs: KnowledgeRun[]): ModelEffect[];
export function knowledgeAnswer(comparison: KnowledgeComparison, labels: { activity: string; lore: string; utopia: string }): string;
