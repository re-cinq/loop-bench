// Pure sentences for the Models page: one line per task for a model, and where it stands among the others.
import { TASKS, TASK_VERBS } from './words.js';

export const moneyText = (value) => {
  if (value == null) return null;
  return value < 0.01 ? 'under $0.01' : `$${value.toFixed(2)}`;
};

export const minutesText = (value) => {
  if (value == null) return null;
  if (value < 1) return 'under a minute';
  return Math.round(value) === 1 ? '1 minute' : `${Math.round(value)} minutes`;
};

/** "less than a cent to $0.05", "$0.10 to $0.40", or one figure when both ends read the same. */
export function moneyRangeText(low, high) {
  if (high < 0.01) return moneyText(high);
  const lowText = low < 0.01 ? 'less than a cent' : moneyText(low);
  return lowText === moneyText(high) ? lowText : `${lowText} to ${moneyText(high)}`;
}

/** "under a minute to 5 minutes", "2 to 9 minutes", or one figure when both ends read the same. */
export function minutesRangeText(low, high) {
  if (Math.round(low) === Math.round(high) || high < 1) return minutesText(high);
  return `${low < 1 ? 'under a minute' : Math.round(low)} to ${minutesText(high)}`;
}

const approximately = (text) => (text.startsWith('under') ? text : `about ${text}`);
const percent = (share) => `${Math.round(share * 100)}%`;

export function ordinal(number) {
  const lastTwo = number % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${number}th`;
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] ?? 'th';
  return `${number}${suffix}`;
}

/** The sentence on a model's card for one task, from its summarizeModels row. */
export function cardSentence(task, row) {
  const verb = TASK_VERBS[task];
  const usually = [moneyText(row.costUsd?.median), minutesText(row.minutes?.median)].filter(Boolean).map(approximately);
  const usuallyText = usually.length ? `, usually ${usually.join(' and ')}` : '';
  const fewText = row.strength === 'few' ? ' (few runs)' : '';
  return `${verb} ${row.successes} of ${row.runs} runs (${percent(row.successRate)})${usuallyText}${fewText}.`;
}

/** 1-based place among the values, best first; ties share the better place. */
export function placeOf(value, values, { lowerIsBetter }) {
  const ahead = values.filter((other) => (lowerIsBetter ? other < value : other > value)).length;
  return ahead + 1;
}

function placeFor(row, rows, pick, lowerIsBetter) {
  const value = pick(row);
  if (value == null) return null;
  const values = rows.map(pick).filter((other) => other != null);
  return { place: placeOf(value, values, { lowerIsBetter }), of: values.length };
}

/** Where one model's row stands among the rows of the same task, on working, cost and time. */
export function standingOf(row, rows) {
  return {
    works: placeFor(row, rows, (candidate) => candidate.successRate, false),
    cost: placeFor(row, rows, (candidate) => candidate.costUsd?.median ?? null, true),
    time: placeFor(row, rows, (candidate) => candidate.minutes?.median ?? null, true),
  };
}

function worksPhrase({ place, of }) {
  if (place === 1) return `best of ${of} for getting working results`;
  return `${ordinal(place)} of ${of} for getting working results`;
}

function extremePhrase({ place, of }, cheapestWord, dearestWord) {
  if (place === 1) return `${cheapestWord} of all`;
  if (place === of) return `${dearestWord} of all`;
  return `${ordinal(place)} ${cheapestWord}`;
}

/** The sentence for one task, from a standing. */
export function standingSentence(task, standing) {
  const activity = TASKS[task].activity;
  if (!standing.works) return `For ${activity} there are no results to compare yet.`;
  const clauses = [worksPhrase(standing.works)];
  if (standing.cost) clauses.push(`${extremePhrase(standing.cost, 'cheapest', 'dearest')} on cost`);
  if (standing.time) clauses.push(`${extremePhrase(standing.time, 'fastest', 'slowest')} on time`);
  return `For ${activity}: ${clauses.join('; ')}.`;
}

const worksShare = (standing) => (standing.works.of > 1 ? (standing.works.place - 1) / (standing.works.of - 1) : 0);

/** The plain paragraph at the top of a model's page; a standing with no works place (model not run on every ticket) is explained instead of ranked. */
export function summaryParagraph(model, standings) {
  const ranked = Object.entries(standings).filter(([, standing]) => standing.works);
  const unranked = Object.entries(standings).filter(([, standing]) => !standing.works);
  const sentences = ranked.map(([task, standing]) => standingSentence(task, standing));
  const byShare = [...ranked].sort(([, a], [, b]) => worksShare(a) - worksShare(b));
  const best = byShare[0];
  const worst = byShare.at(-1);
  const hasContrast = best && worst && best[0] !== worst[0] && worksShare(best[1]) !== worksShare(worst[1]);
  const verdict = hasContrast ? [`${model} is strongest at ${TASKS[best[0]].activity} and weakest at ${TASKS[worst[0]].activity}, compared with the other models.`] : [];
  const caveats = unranked.map(([task, standing]) => `For ${TASKS[task].activity} it is not ranked: ${standing.missingText ?? 'no results yet'}.`);
  return [...verdict, ...sentences, ...caveats].join(' ');
}
