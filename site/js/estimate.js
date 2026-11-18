// Pure estimates for the Calculator: what a number of tasks costs and how long it takes, from the measured runs.
import { FEW_RUNS_BELOW, WORKS_AS_OFTEN_SHARE, lowestBy, percentile, rank, summarizeModels, ticketAveragedSuccessRate, worksAsOftenAsBest } from './rank.js';
import { minutesText, moneyText } from './modelstory.js';
import { TASKS } from './words.js';

export const MIN_RUNS = 3;
export const MAX_ATTEMPTS = 10;
export { WORKS_AS_OFTEN_SHARE };
export const RECOMMENDED_WEIGHTS = { quality: 6, price: 2, speed: 2 };
export const TASK_KEYS = ['dod', 'tdd-round', 'repair-build'];
export const SIZE_KEYS = ['small', 'medium', 'large'];
const NEAREST_SIZES = { small: ['medium', 'large'], medium: ['small', 'large'], large: ['medium', 'small'] };

export const modelKeyOf = (item) => `${item.harness}/${item.model}`;
const sum = (values) => values.reduce((total, value) => total + value, 0);
const median = (values) => percentile(values, 0.5);
const groupKey = (task, model, size) => `${task}|${model}|${size}`;

export function indexRuns(runs) {
  return {
    groups: Map.groupBy(runs, (run) => groupKey(run.task, modelKeyOf(run), run.size)),
    models: [...new Set(runs.map(modelKeyOf))],
  };
}

const runsOf = (index, task, model, size) => index.groups.get(groupKey(task, model, size)) ?? [];

function spreadOf(values) {
  const known = values.filter((value) => value != null);
  if (!known.length) return null;
  return { median: median(known), p25: percentile(known, 0.25), p75: percentile(known, 0.75) };
}

function summarize(group) {
  const successes = group.filter((run) => run.success).length;
  return {
    runs: group.length,
    successes,
    share: ticketAveragedSuccessRate(group),
    cost: spreadOf(group.map((run) => run.costUsd)),
    minutes: spreadOf(group.map((run) => run.minutes)),
    costUnknownRuns: group.filter((run) => run.costUsd == null).length,
  };
}

const scaleSpread = (spread, ratio) => spread && { median: spread.median * ratio, p25: spread.p25 * ratio, p75: spread.p75 * ratio };
const ratioOf = (from, to) => (from > 0 && to != null ? to / from : null);

/** The typical change from one size to another: the median over models that ran both of each model's own ratio. */
export function sizeRatios(index, { task, fromSize, toSize, excludeModel }) {
  const pairs = index.models
    .filter((model) => model !== excludeModel)
    .map((model) => [runsOf(index, task, model, fromSize), runsOf(index, task, model, toSize)])
    .filter(([from, to]) => from.length >= MIN_RUNS && to.length >= MIN_RUNS)
    .map(([from, to]) => [summarize(from), summarize(to)]);
  const ratiosOf = (pick) => pairs.map(([from, to]) => ratioOf(pick(from), pick(to))).filter((ratio) => ratio != null);
  const ratios = { cost: ratiosOf((s) => s.cost?.median), minutes: ratiosOf((s) => s.minutes?.median), share: ratiosOf((s) => s.share) };
  if (Object.values(ratios).some((list) => !list.length)) return null;
  return { cost: median(ratios.cost), minutes: median(ratios.minutes), share: median(ratios.share), models: pairs.length };
}

function scaledFigure(index, { task, model, size }) {
  for (const fromSize of NEAREST_SIZES[size]) {
    const source = runsOf(index, task, model, fromSize);
    const ratios = source.length >= MIN_RUNS ? sizeRatios(index, { task, fromSize, toSize: size, excludeModel: model }) : null;
    if (!ratios) continue;
    const base = summarize(source);
    return {
      ...base,
      share: Math.min(1, base.share * ratios.share),
      cost: scaleSpread(base.cost, ratios.cost),
      minutes: scaleSpread(base.minutes, ratios.minutes),
      basis: 'estimated',
      how: { kind: 'scaled', fromSize, ratios },
    };
  }
  return null;
}

/** What one attempt at one task of one size looks like: measured, few runs, estimated (with how), or none. */
export function figureFor(index, { task, model, kb, size }) {
  const together = runsOf(index, task, model, size);
  const exact = together.filter((run) => run.knowledgeBase === kb);
  if (exact.length >= MIN_RUNS) return { ...summarize(exact), basis: exact.length < FEW_RUNS_BELOW ? 'few' : 'measured' };
  if (together.length >= MIN_RUNS) return { ...summarize(together), basis: 'estimated', how: { kind: 'all-knowledge-bases' } };
  return scaledFigure(index, { task, model, size }) ?? { basis: 'none', runs: exact.length };
}

/** One working result costs the attempts it takes: 1 divided by the share that works, at most MAX_ATTEMPTS. Null when nothing works. */
export function workingResult(figure) {
  if (figure.basis === 'none' || !(figure.share > 0)) return null;
  const attempts = Math.min(1 / figure.share, MAX_ATTEMPTS);
  return { attempts, capped: 1 / figure.share > MAX_ATTEMPTS, cost: scaleSpread(figure.cost, attempts), minutes: scaleSpread(figure.minutes, attempts) };
}

export function seenMix(sizeOfTicket) {
  const sizes = Object.values(sizeOfTicket);
  return Object.fromEntries(SIZE_KEYS.map((size) => [size, sizes.filter((candidate) => candidate === size).length / sizes.length]));
}

export const wholeSizeMix = (size) => Object.fromEntries(SIZE_KEYS.map((key) => [key, key === size ? 1 : 0]));

/** Percentages as shares, or null unless they add up to 100. */
export function mixFromPercents(percents) {
  const values = SIZE_KEYS.map((size) => percents[size]);
  if (values.some((value) => !Number.isFinite(value) || value < 0) || sum(values) !== 100) return null;
  return Object.fromEntries(SIZE_KEYS.map((size) => [size, percents[size] / 100]));
}

const NO_FIGURE = { basis: 'none', runs: 0 };

function lineOf(index, { task, size, count, model, kb }) {
  if (model == null) return { task, size, count, model, figure: NO_FIGURE, result: null, status: 'none-works' };
  const figure = figureFor(index, { task, model, kb, size });
  const result = workingResult(figure);
  const status = figure.basis === 'none' ? 'no-data' : result ? 'ok' : 'never-works';
  return { task, size, count, model, figure, result, status };
}

const sumOver = (lines, pick) => {
  const lineTotals = lines.map((line) => pick(line)).filter((value) => value != null);
  return lineTotals.length === lines.length ? sum(lineTotals) : null;
};

/** Expected, low and high totals over the lines that could be priced; every other line is in leftOut. */
export function totalsOf(lines) {
  const priced = lines.filter((line) => line.status === 'ok');
  const total = (measure, field) => sumOver(priced, (line) => line.result[measure] && line.count * line.result[measure][field]);
  const part = (measure) => ({ expected: total(measure, 'median'), low: total(measure, 'p25'), high: total(measure, 'p75') });
  return {
    cost: part('cost'),
    minutes: part('minutes'),
    leftOut: lines.filter((line) => line.status !== 'ok'),
  };
}

/** Every task and size with work to do, priced. modelFor(task, size) names the model, or null when none can do it. */
export function priceWork(index, { counts, mix, modelFor, kb }) {
  const lines = TASK_KEYS.flatMap((task) => SIZE_KEYS
    .filter((size) => counts[task] > 0 && mix[size] > 0)
    .map((size) => lineOf(index, { task, size, count: counts[task] * mix[size], model: modelFor(task, size), kb })));
  return { lines, totals: totalsOf(lines) };
}

export const sameModelFor = (models) => (task) => models[task];

/** Models that have runs of this task and size, at least one that worked, and a working-result price. */
function candidatesFor(index, { task, size, kb }) {
  return index.models.flatMap((model) => {
    const together = runsOf(index, task, model, size);
    if (together.length < MIN_RUNS || !together.some((run) => run.success)) return [];
    const figure = figureFor(index, { task, model, kb, size });
    const result = workingResult(figure);
    if (!result) return [];
    const review = summarizeModels(together, { reviewed: task !== 'dod' })[0].review;
    return [{ model, figure, result, review }];
  });
}

/** For one task and size, among models that work at least three quarters as often as the best: the recommended, cheapest and fastest. */
export function choicesFor(index, { task, size, kb }) {
  const eligible = worksAsOftenAsBest(candidatesFor(index, { task, size, kb }), (candidate) => candidate.figure.share);
  if (!eligible.length) return { recommended: null, cheapest: null, fastest: null };
  const rows = eligible.map((candidate) => ({ ...candidate, successRate: candidate.figure.share, costUsd: candidate.figure.cost, minutes: candidate.figure.minutes }));
  const topScore = rank(rows, RECOMMENDED_WEIGHTS).reduce((top, row) => (row.score > top.score ? row : top));
  return {
    recommended: topScore.model,
    cheapest: lowestBy(eligible, (candidate) => candidate.result.cost?.median ?? null)?.model ?? null,
    fastest: lowestBy(eligible, (candidate) => candidate.result.minutes?.median ?? null)?.model ?? null,
  };
}

export const CHOICE_LABELS = { recommended: 'Recommended', cheapest: 'Cheapest that still works', fastest: 'Fastest that still works' };

const lineKey = (line) => `${line.task}|${line.size}`;

/** The same work priced with the recommended, the cheapest and the fastest model for each task and size, plus any other choices; totals cover only the lines every choice could do. */
export function compareChoices(index, { counts, mix, kb, others = [] }) {
  const choiceOf = (key) => (task, size) => choicesFor(index, { task, size, kb })[key];
  const priced = [
    ...Object.keys(CHOICE_LABELS).map((key) => ({ key, label: CHOICE_LABELS[key], ...priceWork(index, { counts, mix, kb, modelFor: choiceOf(key) }) })),
    ...others,
  ];
  const everyoneCanDo = (line) => priced.every((choice) => choice.lines.find((other) => lineKey(other) === lineKey(line)).status === 'ok');
  const comparable = priced[0].lines.filter(everyoneCanDo).map(lineKey);
  return priced.map((choice) => {
    const sharedLines = choice.lines.filter((line) => comparable.includes(lineKey(line)));
    return { ...choice, shared: { lines: sharedLines, totals: totalsOf(sharedLines), of: choice.lines.length } };
  });
}

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

export function hoursText(minutes) {
  if (minutes < 60) return minutesText(minutes);
  const hours = minutes / 60;
  return plural(hours >= 10 ? Math.round(hours) : Number(hours.toFixed(1)), 'hour');
}

export const totalMoneyText = (value) => (value >= 100 ? `$${Math.round(value).toLocaleString('en-US')}` : moneyText(value));

const listText = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0]);
export const modelNameOf = (key) => key.split('/').slice(1).join('/');

export function usedModels(lines) {
  return [...new Set(lines.filter((line) => line.status === 'ok').map((line) => line.model))].map(modelNameOf);
}

const LEFT_OUT_REASON = {
  'no-data': 'no data',
  'never-works': 'the chosen model did not produce a working result here',
  'none-works': 'no model produced a working result here',
};

const lineName = (line) => `${TASKS[line.task].label.toLowerCase()} on ${line.size} tickets`;
export const leftOutText = (lines) => lines.map((line) => `${lineName(line)} (${LEFT_OUT_REASON[line.status]})`).join(', ');

/** The one sentence that answers the page's question; it says which kinds of work it leaves out. */
export function answerSentence({ lines, totals }) {
  if (!lines.length) return 'There is no work to price yet: set how many times each task is done.';
  const priced = lines.length - totals.leftOut.length;
  if (!priced) return `No chosen model produced a working result for any of the ${lines.length} kinds of work (${leftOutText(totals.leftOut)}), so none of it can be priced.`;
  const scope = totals.leftOut.length ? ` for ${priced} of the ${lines.length} kinds of work` : '';
  const rest = totals.leftOut.length ? `; no chosen model could do the rest: ${leftOutText(totals.leftOut)}` : '';
  if (totals.cost.expected == null || totals.minutes.expected == null) return `Doing this work with ${listText(usedModels(lines))}${scope} cannot be priced: no usual cost or time is known for it${rest}.`;
  const hoursRange = `${hoursText(totals.minutes.low)} and ${hoursText(totals.minutes.high)}`;
  return `Doing this work with ${listText(usedModels(lines))}${scope} will cost about ${totalMoneyText(totals.cost.expected)} and take about ${hoursText(totals.minutes.expected)} of the models' own working time; expect between ${totalMoneyText(totals.cost.low)} and ${totalMoneyText(totals.cost.high)}, and between ${hoursRange}${rest}.`;
}

/** What a figure rests on, in words. */
export function surenessText(figure) {
  if (figure.basis === 'none') return 'no data: this model has no usable runs for this size';
  if (figure.basis === 'measured') return `measured on ${figure.runs} runs`;
  if (figure.basis === 'few') return `few runs: measured on only ${figure.runs} runs`;
  if (figure.how.kind === 'all-knowledge-bases') return `estimated: too few runs with this knowledge base, so all ${figure.runs} runs of this model on this size are used`;
  const { fromSize, ratios } = figure.how;
  return `estimated: this model's ${figure.runs} runs on ${fromSize} tickets, scaled by the usual change to this size seen across ${ratios.models} models (cost x${ratios.cost.toFixed(1)}, time x${ratios.minutes.toFixed(1)}, how often it works x${ratios.share.toFixed(1)})`;
}

export const costUnknownText = (figure) => (figure.costUnknownRuns ? `cost unknown for ${figure.costUnknownRuns} of ${figure.runs} runs, left out of the cost` : null);
