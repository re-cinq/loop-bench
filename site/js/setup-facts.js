// Pure helpers for the run-to-run and single-run pages: group runs into setups, pick examples, and word the numbers.
import { minutesRangeText, moneyRangeText, moneyText } from './modelstory.js';
import { ticketTitle } from './tickets.js';
import { END_REASONS } from './words.js';

const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const PASS_PHRASE = { dod: 'passed the check', 'tdd-round': 'produced working code', 'repair-build': 'fixed the build' };
const FAILURE_REASONS = { station_done: 'said they were done but the check did not pass', retry_budget: 'ran out of retries', round_budget: 'ran out of rounds', dod_scoped_out: 'left some tests out' };
const EDIT_REASONS = { 'fewer-tests': 'has fewer tests than before', 'disabled-test': 'a test was switched off', 'deleted-file': 'the file was deleted' };
const MAX_PER_MODEL = 2;
const MIN_RUNS_TO_COMPARE = 3;
const MIN_RUNS_TO_AGREE = 5;
const MIN_COST_FOR_RATIO = 0.01;

const known = (values) => values.filter((value) => value != null);
const sumOf = (values) => values.reduce((total, value) => total + value, 0);
const plural = (count, word) => (count === 1 ? word : `${word}s`);
const numberWord = (count) => NUMBER_WORDS[count] ?? String(count);
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const knownCosts = (runs) => known(runs.map((run) => run.costUsd));

export { moneyText };
export const minutesText = (value) => (value < 1 ? 'under a minute' : `${Math.round(value)} ${plural(Math.round(value), 'minute')}`);

export function reviewScoreOf(run) {
  const scores = known([run.correctness, run.completeness, run.closeness]);
  return scores.length ? sumOf(scores) / scores.length : null;
}

export function groupSetups(runs) {
  const bySetup = Map.groupBy(runs, (run) => run.setup);
  return [...bySetup.values()].map((group) => {
    const sorted = [...group].sort((first, second) => first.replicate - second.replicate);
    const { task, harness, model, knowledgeBase, ticket, size } = sorted[0];
    return { task, harness, model, knowledgeBase, ticket, size, runs: sorted };
  });
}

export const setupHash = ({ task, harness, model, knowledgeBase, ticket }) =>
  new URLSearchParams({ task, model: `${harness}/${model}`, kb: knowledgeBase, ticket: String(ticket) }).toString();

export function worked(group) {
  return group.runs.filter((run) => run.success).length;
}

function costSwing(group) {
  const costs = knownCosts(group.runs);
  if (costs.length < MIN_RUNS_TO_COMPARE || Math.min(...costs) < MIN_COST_FOR_RATIO) return null;
  return Math.max(...costs) / Math.min(...costs);
}

function capPerModel(groups, cap, limit) {
  const taken = new Map();
  return groups.filter((group) => {
    const count = taken.get(group.model) ?? 0;
    taken.set(group.model, count + 1);
    return count < cap;
  }).slice(0, limit);
}

const balanceOf = (group) => Math.min(worked(group), group.runs.length - worked(group)) / group.runs.length;

export function mostDisagreeing(groups, limit) {
  const mixed = groups.filter((group) => group.runs.length >= MIN_RUNS_TO_COMPARE && worked(group) > 0 && worked(group) < group.runs.length);
  const ordered = mixed.sort((first, second) => balanceOf(second) - balanceOf(first) || second.runs.length - first.runs.length);
  return capPerModel(ordered, MAX_PER_MODEL, limit);
}

export function widestCostSwing(groups, limit) {
  const swung = groups.map((group) => ({ group, swing: costSwing(group) })).filter((entry) => entry.swing != null);
  const ordered = swung.sort((first, second) => second.swing - first.swing).map((entry) => entry.group);
  return capPerModel(ordered, MAX_PER_MODEL, limit);
}

export function mostAgreeing(groups, limit) {
  const steady = groups.filter((group) => group.runs.length >= MIN_RUNS_TO_AGREE && worked(group) === group.runs.length && costSwing(group) != null);
  const ordered = steady.sort((first, second) => costSwing(first) - costSwing(second));
  return capPerModel(ordered, 1, limit);
}

export function agreementSentence(groups) {
  const comparable = groups.filter((group) => group.runs.length >= MIN_RUNS_TO_COMPARE);
  if (!comparable.length) return 'No setup has been run often enough to compare its runs yet.';
  const mixed = comparable.filter((group) => worked(group) > 0 && worked(group) < group.runs.length).length;
  const share = Math.round((mixed / comparable.length) * 100);
  return `Of ${comparable.length} setups run ${numberWord(MIN_RUNS_TO_COMPARE)} times or more, ${mixed} (${share}%) had some runs that worked and some that did not. The rest ended the same way every time.`;
}

function costGap(first, second) {
  if (first.costUsd != null && second.costUsd != null) return Math.abs(first.costUsd - second.costUsd);
  return Math.abs((first.minutes ?? 0) - (second.minutes ?? 0));
}

function mostDifferentPair(candidates) {
  const pairs = candidates.flatMap((first, index) => candidates.slice(index + 1).map((second) => [first, second]));
  return pairs.reduce((best, pair) => (costGap(...pair) > costGap(...best) ? pair : best), pairs[0]);
}

/** Replicate numbers of the two most different runs: one that worked and one that did not when both exist, else the cheapest and the dearest. */
export function defaultPair(runs) {
  if (runs.length < 2) return [runs[0]?.replicate, undefined];
  const mixed = runs.some((run) => run.success) && runs.some((run) => !run.success);
  const crossPairs = runs.filter((run) => run.success).flatMap((good) => runs.filter((run) => !run.success).map((bad) => [good, bad]));
  const pair = mixed ? crossPairs.reduce((best, candidate) => (costGap(...candidate) > costGap(...best) ? candidate : best)) : mostDifferentPair(runs);
  return pair.map((run) => run.replicate).sort((first, second) => first - second);
}

function testsSentence(task, counts) {
  const present = known(counts);
  if (!present.length) return null;
  const verb = task === 'dod' ? 'wrote' : 'added';
  const [fewest, most] = [Math.min(...present), Math.max(...present)];
  if (most === 0) return `No run ${verb} a test.`;
  if (fewest === most) return `Each ${verb} ${fewest} ${plural(fewest, 'test')}.`;
  return `Each ${verb} ${fewest} to ${most} tests.`;
}

function costClause(runs) {
  const costs = knownCosts(runs);
  if (!costs.length) return null;
  const [cheapest, dearest] = [Math.min(...costs), Math.max(...costs)];
  if (moneyText(cheapest) === moneyText(dearest)) return `cost was about ${moneyText(dearest)} each time`;
  return `cost ranged from ${moneyRangeText(cheapest, dearest)}`;
}

function timeClause(runs) {
  const times = known(runs.map((run) => run.minutes));
  if (!times.length) return null;
  const [quickest, slowest] = [Math.min(...times), Math.max(...times)];
  if (slowest < 1) return 'time stayed under a minute';
  if (Math.round(quickest) === Math.round(slowest)) return `time was about ${minutesText(slowest)} each time`;
  return `time ranged from ${minutesRangeText(quickest, slowest)}`;
}

function failureSentence(failed) {
  const reasons = [...Map.groupBy(failed, (run) => run.endReason).entries()]
    .map(([reason, runs]) => ({ text: FAILURE_REASONS[reason] ?? END_REASONS[reason]?.label ?? reason, count: runs.length }));
  if (reasons.length === 1) return `the ${numberWord(failed.length)} that failed ${reasons[0].text}`;
  return `of the ${numberWord(failed.length)} that failed, ${reasons.map(({ text, count }) => `${numberWord(count)} ${text}`).join(' and ')}`;
}

function outcomeSentence(task, runs) {
  const failed = runs.filter((run) => !run.success);
  const count = runs.length;
  if (count === 1) return `The one run ${failed.length ? 'did not work' : PASS_PHRASE[task]}.`;
  if (!failed.length) return `All ${count} runs ${PASS_PHRASE[task]}.`;
  const lead = failed.length === count ? `None of the ${count} runs ${PASS_PHRASE[task]}` : `${count - failed.length} of ${count} runs ${PASS_PHRASE[task]}`;
  const reason = failed.length === count ? failureSentence(failed).replace(/^the \w+ that failed/, 'they') : failureSentence(failed);
  return `${lead}; ${reason}.`;
}

/** One plain paragraph on how reliable a setup is. testCounts lines up with runs; null where the run's files are unknown. */
export function reliabilitySentence(task, runs, testCounts) {
  const costClauseText = costClause(runs);
  const timeClauseText = timeClause(runs);
  const spend = [costClauseText, timeClauseText].filter(Boolean).join(' and ');
  const unknownCosts = runs.length - knownCosts(runs).length;
  const unknownNote = unknownCosts ? ` (cost unknown for ${unknownCosts} of ${runs.length})` : '';
  const fewRuns = runs.length < MIN_RUNS_TO_AGREE ? ` Only ${numberWord(runs.length)} ${plural(runs.length, 'run')}, so treat this as a hint.` : '';
  return [outcomeSentence(task, runs), testsSentence(task, testCounts), spend && `${capitalize(spend)}${unknownNote}.`].filter(Boolean).join(' ') + fewRuns;
}

export const testsWrittenOf = (runFile) => runFile?.diff?.testsAddedCount ?? null;

/** The tests of a run as one list: the plan's tests (with what each proves) for writing the tests, the added tests otherwise. Code is matched by exact name. */
export function testsOf(task, runFile) {
  const added = (runFile?.diff?.testsAdded ?? []).filter((test) => test.kind === 'test');
  const codeOf = (name) => added.find((test) => test.name === name)?.code ?? null;
  if (task === 'dod' && runFile?.dod) return runFile.dod.tests.map((test) => ({ name: test.name, proves: test.proves, file: test.file, code: codeOf(test.name) }));
  return added.map((test) => ({ name: test.name, proves: null, file: test.file, code: test.code }));
}

/** Rows lining up tests that share an exact name; a test only one side has gets the other side as null. */
export function alignTests(testsA, testsB) {
  const unmatchedB = [...testsB];
  const rows = testsA.map((test) => {
    const index = unmatchedB.findIndex((other) => other.name === test.name);
    const match = index < 0 ? null : unmatchedB.splice(index, 1)[0];
    return { name: test.name, a: test, b: match };
  });
  return [...rows, ...unmatchedB.map((test) => ({ name: test.name, a: null, b: test }))];
}

export function orderOfWorkLine(round) {
  const label = round.round === 0 ? 'first try' : `retry ${round.round}`;
  const ran = round.testRuns === 0 ? 'did not run the tests' : `ran the tests ${round.testRuns === 1 ? 'once' : `${round.testRuns} times`}`;
  const writtenFirst = { true: 'wrote a test before changing the product code', false: 'changed the product code before writing a test' }[round.heuristicTestWrittenBeforeProductWrite];
  const ranFirst = { true: 'ran the tests before changing the product code', false: 'changed the product code before running the tests' }[round.heuristicTestRunBeforeProductWrite];
  const failed = round.outcome === 'failed' ? 'the round failed to finish' : null;
  return `${label}: ${[ran, writtenFirst ?? ranFirst, failed].filter(Boolean).join('; ')}`;
}

export function linesText(diff) {
  if (!diff) return null;
  const { addedTestLines: testLines, addedProductLines: productLines } = diff;
  if (productLines === 0) return `${testLines} lines of test code and no product code.`;
  return `${testLines} lines of test code against ${productLines} lines of product code.`;
}

export function editedTestText(entry) {
  const reasons = entry.reasons.map((reason) => EDIT_REASONS[reason]);
  return [`added ${entry.addedCount} ${plural(entry.addedCount, 'line')}, removed ${entry.removedCount}`, ...reasons].join('; ');
}

export function weakeningWarning(tampering) {
  if (!tampering?.flagged) return null;
  const parts = [
    tampering.weakenedCount && `weakened ${tampering.weakenedCount} ${plural(tampering.weakenedCount, 'test file')}`,
    tampering.disabledTests.length && `switched off ${tampering.disabledTests.length} ${plural(tampering.disabledTests.length, 'test')}`,
    tampering.deletedTestFiles.length && `deleted ${tampering.deletedTestFiles.length} ${plural(tampering.deletedTestFiles.length, 'test file')}`,
  ].filter(Boolean);
  return `Warning: this run made the tests it was given weaker. It ${parts.join(', ')}.`;
}

export function runSentence(run, { taskActivity, knowledgeBaseLabel }) {
  const outcome = run.success ? 'worked' : 'did not work';
  const cost = run.costUsd == null ? 'its cost is unknown' : `it cost ${moneyText(run.costUsd)}`;
  const time = run.minutes == null ? '' : ` and took ${minutesText(run.minutes)}`;
  return `This run of ${taskActivity} with ${run.model} (knowledge base: ${knowledgeBaseLabel}) on ticket #${run.ticket}${ticketTitle(run.ticket) ? ` ("${ticketTitle(run.ticket)}")` : ''} ${outcome}: ${cost}${time}.`;
}
