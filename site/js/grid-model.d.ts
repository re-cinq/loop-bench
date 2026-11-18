export interface GridRun { task: string; harness: string; model: string; knowledgeBase: string; ticket: number; size: string | null; success: boolean; costUsd: number | null; minutes: number | null; correctness: number | null; completeness: number | null; closeness: number | null }
export interface Setup { modelKey: string; harness: string; model: string; knowledgeBase: string; ticket: number; size: string | null; runs: number; successes: number; share: number; cost: number | null; costUnknownRuns: number; minutes: number | null; review: number | null; few: boolean; runList: GridRun[] }
export interface TicketColumn { ticket: number; size: string | null }
export interface ModelEntry { modelKey: string; harness: string; model: string; average: number | null; setups: Setup[]; runs: number; successes: number; missing: number[] }
export interface Square { value: number; goodness: number; text: string }
export interface TicketAgreement { ticket: number; size: string | null; models: number; always: number; never: number; mixed: number }
export interface ModelPair { first: string; second: string; shared: number; same: number; share: number }
export type MeasureKey = 'works' | 'price' | 'time' | 'review';
export interface Measure { label: string; better: 'higher' | 'lower'; format: (value: number) => string; averagePhrase: string; scaleEnds: [string, string] }
export const MEASURES: Record<MeasureKey, Measure>;
export const KNOWLEDGE_BASE_ORDER: string[];
export function modelKeyOf(item: { harness: string; model: string }): string;
export function ticketLabel(ticket: number, size: string | null): string;
export function formatMoney(value: number): string;
export function formatMinutes(value: number): string;
export function measuresFor(task: string): MeasureKey[];
export function colourOf(goodness: number): { background: string; text: string };
export function ticketColumns(runs: { ticket: number; size: string | null }[]): TicketColumn[];
export function buildSetups(runs: GridRun[]): Setup[];
export function setupKey(setup: Setup): string;
export function squareOf(measureKey: MeasureKey, setup: Setup): Square | null;
export function orderModels(measureKey: MeasureKey, setups: Setup[]): ModelEntry[];
export function setupWords(setup: Setup, options: { task: string; measureKey: MeasureKey }): string;
export function extremesText(input: { measureKey: MeasureKey; setups: Setup[]; tickets: TicketColumn[] }): { strongest: string[]; weakest: string[]; skipped: string[] };
export function ticketAgreement(input: { setups: Setup[]; tickets: TicketColumn[] }): TicketAgreement[];
export function ticketSentence(agreement: TicketAgreement): string;
export function agreementSummaryText(agreements: TicketAgreement[]): string[];
export function modelPairAgreement(setups: Setup[]): ModelPair[];
export function pairsText(pairs: ModelPair[]): { explanation: string; alike: string[]; different: string[] };
export function knowledgeBaseText(input: { measureKey: MeasureKey; setups: Setup[] }): string[];
