// Pure text for the home page: the recommended model per task and the findings, all computed from the runs.
import { compareKnowledgeBases, KNOWLEDGE_BASE_KEYS } from './knowledge.js';
import { ranked, reliableChoices, splitByCoverage, summarizeModels } from './rank.js';
import { flipped, groupSetups } from './steadiness.js';
import { KNOWLEDGE_BASES, SIZES, TASKS } from './words.js';

export const RECOMMENDED_WEIGHTS = { quality: 6, price: 2, speed: 2 };
export const RELIABLE_SHARE = 0.75;
const taskKeys = Object.keys(TASKS);

const percent = (share) => `${Math.round(share * 100)}%`;
const sum = (values) => values.reduce((total, value) => total + value, 0);
const hasReview = (task) => task !== 'dod';

export function moneyText(value) {
  if (value == null) return 'unknown';
  if (value < 0.01) return 'under $0.01';
  const digits = value >= 1000 ? 0 : 2;
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export function minutesText(value) {
  if (value == null) return 'unknown';
  return value < 1 ? 'under a minute' : `about ${Math.round(value)} ${Math.round(value) === 1 ? 'minute' : 'minutes'}`;
}

function fullyTestedRows(runs, task) {
  const sizeOfTicket = Object.fromEntries(runs.map((run) => [run.ticket, run.size]));
  const rows = summarizeModels(runs.filter((run) => run.task === task), { reviewed: hasReview(task) });
  return splitByCoverage(rows, sizeOfTicket).fullyTested;
}

/** One card per task: the model that scores best at quality 6, price 2, speed 2, among models that ran every ticket. */
export function recommendations(runs) {
  return taskKeys.flatMap((task) => {
    const winner = ranked(fullyTestedRows(runs, task), RECOMMENDED_WEIGHTS)[0];
    if (!winner) return [];
    return [{
      task,
      model: winner.model,
      harness: winner.harness,
      successes: winner.successes,
      runs: winner.runs,
      successRate: winner.successRate,
      costUsd: winner.costUsd?.median ?? null,
      minutes: winner.minutes?.median ?? null,
      strength: winner.strength,
      href: `best.html#task=${task}`,
    }];
  });
}

function knowledgeBaseFinding(runs) {
  const effects = taskKeys.map((task) => {
    const comparison = compareKnowledgeBases(runs, task);
    const rates = KNOWLEDGE_BASE_KEYS.map((kb) => comparison.byKnowledgeBase[kb].successRate);
    const biggestChange = Math.max(...rates.slice(1).map((rate) => Math.abs(rate - rates[0])));
    return { comparison, rates, points: Math.round(biggestChange * 100) };
  });
  const [largest, ...others] = effects.sort((a, b) => b.points - a.points);
  const [none, lore, utopia] = largest.rates.map(percent);
  const othersText = others.map((item) => `${TASKS[item.comparison.task].activity} by at most ${item.points} ${item.points === 1 ? 'point' : 'points'}`).join(' and ');
  return {
    text: `A knowledge base mattered most for ${TASKS[largest.comparison.task].activity}: runs work ${none} of the time with none, ${lore} with ${KNOWLEDGE_BASES['lore-mcp'].label} and ${utopia} with ${KNOWLEDGE_BASES['lore-utopia'].label}, over ${largest.comparison.setups} setups; it moved ${othersText}.`,
    href: `lore.html#task=${largest.comparison.task}`,
  };
}

function flipFinding(runs) {
  const repeated = groupSetups(runs).filter((setup) => setup.runs.length >= 3);
  const flips = repeated.filter(flipped).length;
  return {
    text: `Of ${repeated.length} setups run three or more times, ${flips} (${percent(flips / repeated.length)}) both worked and failed on different repeats, so one run is a weak guide.`,
    href: 'setup.html',
  };
}

function bestShareBySizeAndTask(runs) {
  return taskKeys.flatMap((task) => Object.keys(SIZES).flatMap((size) => {
    const rows = summarizeModels(runs.filter((run) => run.task === task && run.size === size), { reviewed: false }).filter((row) => row.strength === 'measured');
    if (!rows.length) return [];
    const best = rows.reduce((top, row) => (row.successRate > top.successRate ? row : top));
    return [{ task, size, model: best.model, successRate: best.successRate }];
  }));
}

function reliabilityFinding(runs) {
  const shaky = bestShareBySizeAndTask(runs).filter((item) => item.successRate < RELIABLE_SHARE).sort((a, b) => a.successRate - b.successRate);
  const text = shaky.length
    ? `No model works in three quarters of runs for ${shaky.map((item) => `${TASKS[item.task].activity} on the ${item.size} ticket (best: ${percent(item.successRate)})`).join(', ')}.`
    : 'For every task and ticket size, at least one model works in three quarters of runs.';
  return { text, href: 'grid.html' };
}

function cheapestFinding(runs) {
  const clauses = taskKeys.flatMap((task) => {
    const { best, cheapest } = reliableChoices(fullyTestedRows(runs, task));
    if (!cheapest) return [];
    if (best.model === cheapest.model) return [`${TASKS[task].activity}: ${best.model}, which is also the most reliable`];
    return [`${TASKS[task].activity}: ${cheapest.model} (works ${percent(cheapest.successRate)}, ${moneyText(cheapest.costPerSuccessUsd)} per working result) against ${best.model} (${percent(best.successRate)}, ${moneyText(best.costPerSuccessUsd)})`];
  });
  return { text: `The cheapest model that works at least three quarters as often as the most reliable one, by task: ${clauses.join('; ')}.`, href: 'best.html#rule=cheapest' };
}

function wastedMoneyFinding(runs) {
  const priced = runs.filter((run) => run.costUsd != null);
  const total = sum(priced.map((run) => run.costUsd));
  const wasted = sum(priced.filter((run) => !run.success).map((run) => run.costUsd));
  return {
    text: `${moneyText(wasted)} of the ${moneyText(total)} with a recorded cost (${percent(wasted / total)}) went to runs that did not work; ${runs.length - priced.length} runs have no recorded cost and are left out.`,
    href: 'best.html',
  };
}

function priceGapFinding(runs) {
  const gaps = taskKeys.flatMap((task) => {
    const rows = fullyTestedRows(runs, task).filter((row) => row.strength === 'measured' && row.costUsd?.median > 0);
    if (rows.length < 2) return [];
    const byCost = [...rows].sort((a, b) => a.costUsd.median - b.costUsd.median);
    const [cheap, dear] = [byCost[0], byCost.at(-1)];
    return [{ task, cheap, dear, ratio: dear.costUsd.median / cheap.costUsd.median }];
  });
  const widest = gaps.sort((a, b) => b.ratio - a.ratio)[0];
  return {
    text: `Price differs enormously between models: for ${TASKS[widest.task].activity} a usual run costs ${moneyText(widest.cheap.costUsd.median)} with ${widest.cheap.model} and ${moneyText(widest.dear.costUsd.median)} with ${widest.dear.model}, ${Math.round(widest.ratio)} times as much.`,
    href: `best.html#task=${widest.task}`,
  };
}

/** The findings shown on the home page, each one sentence with its numbers and the page that shows them. */
export function findingsOf(runs) {
  return [knowledgeBaseFinding(runs), flipFinding(runs), reliabilityFinding(runs), cheapestFinding(runs), wastedMoneyFinding(runs), priceGapFinding(runs)];
}

/** The plain facts for the strip at the top of every page. */
export function factsOf(runs, totalCostUsd) {
  return {
    runs: runs.length,
    models: new Set(runs.map((run) => `${run.harness}/${run.model}`)).size,
    tickets: new Set(runs.map((run) => run.ticket)).size,
    totalCostUsd,
  };
}
