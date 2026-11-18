export interface SetupRun {
  loopId: string; task: string; harness: string; model: string; knowledgeBase: string; ticket: number; size: string | null; setup: string;
  replicate: number; success: boolean; costUsd: number | null; minutes: number | null; rounds: number;
  correctness: number | null; completeness: number | null; closeness: number | null; endReason: string;
}
export interface SetupGroup { task: string; harness: string; model: string; knowledgeBase: string; ticket: number; size: string | null; runs: SetupRun[] }
export interface RunTest { name: string; proves: string | null; file: string | null; code: string | null }
export interface TestRow { name: string; a: RunTest | null; b: RunTest | null }
export interface EditedTest { file: string; level: string; reasons: string[]; removedTitles: string[]; addedCount: number; removedCount: number; removedSample: string[] }
export interface Tampering { editedExistingTests: EditedTest[]; changedGivenTests: EditedTest[]; disabledTests: { file: string; line: number }[]; deletedTestFiles: string[]; changedCount: number; weakenedCount: number; flagged: boolean }
export interface RunFile {
  loopId: string; task: string;
  dod: null | { approach: string | null; tests: { name: string; proves: string; file: string | null }[]; outOfScope: string[] };
  diff: null | { testFilesTouched: string[]; testsAdded: { name: string; file: string; kind: string; code: string }[]; testsAddedCount: number; addedTestLines: number; addedProductLines: number; tampering: Tampering };
  orderOfWork: null | { round: number; visits: number; outcome: string; testRuns: number; heuristicTestWrittenBeforeProductWrite: boolean | null; heuristicTestRunBeforeProductWrite: boolean | null }[];
}
export function moneyText(value: number): string;
export function minutesText(value: number): string;
export function reviewScoreOf(run: Pick<SetupRun, 'correctness' | 'completeness' | 'closeness'>): number | null;
export function groupSetups(runs: SetupRun[]): SetupGroup[];
export function setupHash(group: Pick<SetupGroup, 'task' | 'harness' | 'model' | 'knowledgeBase' | 'ticket'>): string;
export function worked(group: SetupGroup): number;
export function mostDisagreeing(groups: SetupGroup[], limit: number): SetupGroup[];
export function widestCostSwing(groups: SetupGroup[], limit: number): SetupGroup[];
export function mostAgreeing(groups: SetupGroup[], limit: number): SetupGroup[];
export function agreementSentence(groups: SetupGroup[]): string;
export function defaultPair(runs: SetupRun[]): [number | undefined, number | undefined];
export function reliabilitySentence(task: string, runs: SetupRun[], testCounts: (number | null)[]): string;
export function testsWrittenOf(runFile: RunFile | null | undefined): number | null;
export function testsOf(task: string, runFile: RunFile | null | undefined): RunTest[];
export function alignTests(testsA: RunTest[], testsB: RunTest[]): TestRow[];
export function orderOfWorkLine(round: NonNullable<RunFile['orderOfWork']>[number]): string;
export function linesText(diff: RunFile['diff']): string | null;
export function editedTestText(entry: EditedTest): string;
export function weakeningWarning(tampering: Tampering | undefined): string | null;
export function runSentence(run: SetupRun, words: { taskActivity: string; knowledgeBaseLabel: string }): string;
