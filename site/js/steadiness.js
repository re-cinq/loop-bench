// Pure helpers for the Models page: how steady a model is between repeats of the same setup, and how it fails.
const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
const known = (values) => values.filter((value) => value != null);

function medianOf(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

const ratioText = (ratio) => `${ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)}x`;

/** One group per setup (task, knowledge base, ticket) of a single model, its runs in run-number order. */
export function groupSetups(runs) {
  const bySetup = Map.groupBy(runs, (run) => run.setup);
  return [...bySetup.values()].map((group) => ({
    task: group[0].task,
    knowledgeBase: group[0].knowledgeBase,
    ticket: group[0].ticket,
    size: group[0].size,
    runs: [...group].sort((a, b) => a.replicate - b.replicate),
  }));
}

export const flipped = (setup) => new Set(setup.runs.map((run) => run.success)).size > 1;

function swingRatios(repeatedSetups, measure) {
  return repeatedSetups.map((setup) => known(setup.runs.map(measure)))
    .filter((values) => values.length >= 2 && Math.min(...values) > 0)
    .map((values) => Math.max(...values) / Math.min(...values));
}

function swingSentence(ratios, { swingPhrase, narrowPhrase }) {
  if (!ratios.length) return null;
  const usual = medianOf(ratios);
  if (usual < 1.15) return narrowPhrase;
  return `${swingPhrase(ratioText(usual))} (widest gap ${ratioText(Math.max(...ratios))}).`;
}

/** Plain sentences on how steady a model is, over the setups that were run at least twice. */
export function steadinessSentences(setups) {
  const repeated = setups.filter((setup) => setup.runs.length >= 2);
  if (!repeated.length) return ['No setup was run more than once, so how steady this model is cannot be judged yet.'];
  const flippedCount = repeated.filter(flipped).length;
  const steady = repeated.filter((setup) => !flipped(setup));
  const alwaysWorked = steady.filter((setup) => setup.runs[0].success).length;
  const steadyText = steady.length
    ? `every run ended the same way in ${steady.length} (${alwaysWorked} always worked, ${steady.length - alwaysWorked} never did)`
    : 'no setup gave the same result every time';
  const first = `Of ${plural(repeated.length, 'setup')} run 2 or more times, ${steadyText}, and the result flipped between working and not working in ${flippedCount}.`;
  const cost = swingSentence(swingRatios(repeated, (run) => run.costUsd), {
    swingPhrase: (ratio) => `The dearest repeat of a setup usually costs about ${ratio} the cheapest`,
    narrowPhrase: 'Cost barely changes between repeats of the same setup.',
  });
  const time = swingSentence(swingRatios(repeated, (run) => run.minutes), {
    swingPhrase: (ratio) => `The slowest repeat of a setup usually takes about ${ratio} as long as the fastest`,
    narrowPhrase: 'Time barely changes between repeats of the same setup.',
  });
  return [first, cost, time].filter(Boolean);
}

/** For each task, how many runs that did not work ended for each reason. */
export function failureCounts(runs) {
  const counts = {};
  for (const run of runs.filter((candidate) => !candidate.success)) {
    counts[run.task] ??= {};
    counts[run.task][run.endReason] = (counts[run.task][run.endReason] ?? 0) + 1;
  }
  return counts;
}

const FEW_RUNS_BELOW = 5;
export const isFewRuns = (runs) => runs < FEW_RUNS_BELOW;

const points = (delta) => `${Math.round(Math.abs(delta) * 100)} points`;
const dollars = (value) => `$${Math.abs(value).toFixed(2)}`;
const minutesGap = (value) => `${Math.round(Math.abs(value))} min`;

function differenceClause(delta, formatAmount, higher, lower) {
  if (formatAmount(delta) === formatAmount(0)) return null;
  return `${formatAmount(delta)} ${delta > 0 ? higher : lower}`;
}

/** One sentence on what a knowledge base changed, from a knowledgeDifferences row. */
export function knowledgeSentence(difference, knowledgeBaseLabel) {
  const works = difference.successRate;
  const worksPart = points(works.delta) === '0 points'
    ? `works about as often (${Math.round(works.withKb * 100)}%)`
    : `works ${points(works.delta)} ${works.delta > 0 ? 'more' : 'less'} often (${Math.round(works.withKb * 100)}% against ${Math.round(works.without * 100)}%)`;
  const extras = [
    differenceClause(difference.medianCostUsd.delta, dollars, 'dearer', 'cheaper'),
    differenceClause(difference.medianMinutes.delta, minutesGap, 'slower', 'faster'),
  ].filter(Boolean);
  return `With ${knowledgeBaseLabel} it ${worksPart}${extras.length ? `; a usual run is ${extras.join(' and ')}` : ''}.`;
}
