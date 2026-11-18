export interface Term { label: string; explain: string; activity?: string }
export const TASKS: Record<string, Term & { activity: string }>;
export const KNOWLEDGE_BASES: Record<string, Term>;
export const SIZES: Record<string, Term>;
export const MEASURES: Record<string, Term>;
export const END_REASONS: Record<string, Term>;
export const FAILURE_REASONS: Record<string, Term>;
export const TASK_VERBS: Record<string, string>;
export const MAKERS: Record<string, string>;
export const STRENGTHS: Record<string, Term>;
export const SIZE_MIXES: Record<string, { label: string }>;
export const NONE_OR_ALL: string;
export function labelOf(glossary: Record<string, { label: string }>, key: string): string;
