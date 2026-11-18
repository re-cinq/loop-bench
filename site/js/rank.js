// Pure ranking: summarise runs per model, then score each model on quality, price and speed.
export const FEW_RUNS_BELOW = 5;
export const WORKS_AS_OFTEN_SHARE = 0.75;
const REVIEW_SCALE = { min: 1, max: 5 };
const SUCCESS_SHARE_OF_QUALITY = 0.7;

const sum = (values) => values.reduce((total, value) => total + value, 0);
const present = (values) => values.filter((value) => value != null);

export function percentile(values, share) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * share;
  const below = Math.floor(position);
  const above = Math.ceil(position);
  return sorted[below] + (sorted[above] - sorted[below]) * (position - below);
}

function spreadOf(values) {
  const known = present(values);
  if (!known.length) return null;
  return { median: percentile(known, 0.5), p25: percentile(known, 0.25), p75: percentile(known, 0.75) };
}

function reviewOf(runs) {
  const scores = present(runs.flatMap((run) => [run.correctness, run.completeness, run.closeness]));
  return scores.length ? sum(scores) / scores.length : null;
}

/** The average of the per-ticket success shares, so every ticket counts once however often it was run. */
export function ticketAveragedSuccessRate(runs) {
  const byTicket = [...Map.groupBy(runs, (run) => run.ticket).values()];
  return sum(byTicket.map((ticketRuns) => ticketRuns.filter((run) => run.success).length / ticketRuns.length)) / byTicket.length;
}

/** Mean known cost times all runs, over the runs that worked; null when nothing worked or no cost is known. */
export function costPerWorkingResult(runs) {
  const costs = present(runs.map((run) => run.costUsd));
  const successes = runs.filter((run) => run.success).length;
  if (!successes || !costs.length) return null;
  return (sum(costs) / costs.length) * runs.length / successes;
}

/** Mean known minutes times all runs, over the runs that worked; null when nothing worked or no time is known. */
export function minutesPerWorkingResult(runs) {
  const minutes = present(runs.map((run) => run.minutes));
  const successes = runs.filter((run) => run.success).length;
  if (!successes || !minutes.length) return null;
  return (sum(minutes) / minutes.length) * runs.length / successes;
}

/** Candidates that worked at all and work at least three quarters as often as the best of them. */
export function worksAsOftenAsBest(candidates, rateOf) {
  const best = Math.max(0, ...candidates.map(rateOf));
  return candidates.filter((candidate) => rateOf(candidate) > 0 && rateOf(candidate) >= WORKS_AS_OFTEN_SHARE * best);
}

/** The candidate with the smallest known value; null when none has one. */
export function lowestBy(candidates, valueOf) {
  const known = candidates.filter((candidate) => valueOf(candidate) != null);
  if (!known.length) return null;
  return known.reduce((lowest, candidate) => (valueOf(candidate) < valueOf(lowest) ? candidate : lowest));
}

/** One row per harness and model from a task's runs. Pass reviewed: false for a task the AI reviewer cannot judge. */
export function summarizeModels(runs, { reviewed = true } = {}) {
  const byModel = Map.groupBy(runs, (run) => `${run.harness}/${run.model}`);
  return [...byModel.values()].map((group) => ({
    task: group[0].task,
    harness: group[0].harness,
    model: group[0].model,
    runs: group.length,
    successes: group.filter((run) => run.success).length,
    successRate: ticketAveragedSuccessRate(group),
    tickets: [...new Set(group.map((run) => run.ticket))],
    costUsd: spreadOf(group.map((run) => run.costUsd)),
    costUnknownRuns: group.filter((run) => run.costUsd == null).length,
    minutes: spreadOf(group.map((run) => run.minutes)),
    review: reviewed ? reviewOf(group) : null,
    costPerSuccessUsd: costPerWorkingResult(group),
    minutesPerSuccess: minutesPerWorkingResult(group),
    strength: group.length < FEW_RUNS_BELOW ? 'few' : 'measured',
  }));
}

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

/** "not run on the large ticket" from the tickets a model is missing, using the size of each ticket. */
export function missingText(missingTickets, sizeOfTicket) {
  const bySize = [...Map.groupBy(missingTickets, (ticket) => sizeOfTicket[ticket] ?? 'other').entries()];
  const parts = bySize.map(([size, tickets]) => (tickets.length === 1 ? `the ${size} ticket` : plural(tickets.length, `${size} ticket`)));
  const last = parts.pop();
  return `not run on ${parts.length ? `${parts.join(', ')} or ${last}` : last}`;
}

/** Models that ran every ticket anyone ran come first; the rest, each with what it lacks, go in their own list. */
export function splitByCoverage(rows, sizeOfTicket) {
  const allTickets = [...new Set(rows.flatMap((row) => row.tickets))];
  const withMissing = rows.map((row) => ({ ...row, missing: allTickets.filter((ticket) => !row.tickets.includes(ticket)) }));
  return {
    fullyTested: withMissing.filter((row) => !row.missing.length),
    notFullyTested: withMissing.filter((row) => row.missing.length).map((row) => ({ ...row, missingText: missingText(row.missing, sizeOfTicket) })),
  };
}

/** 1 for the highest value, 0 for the lowest; every value scores 1 when they are all equal. */
export function spreadScores(values) {
  const lowest = Math.min(...values);
  const span = Math.max(...values) - lowest;
  return values.map((value) => (span === 0 ? 1 : (value - lowest) / span));
}

/** 1 for the smallest value, 0 for the largest, on a log scale; missing values score 0. */
export function cheapnessScores(values) {
  const logs = present(values).map((value) => Math.log(Math.max(value, 1e-6)));
  const lowest = Math.min(...logs);
  const span = Math.max(...logs) - lowest;
  return values.map((value) => {
    if (value == null) return 0;
    if (span === 0) return 1;
    return 1 - (Math.log(Math.max(value, 1e-6)) - lowest) / span;
  });
}

export function qualityOf(row) {
  if (row.review == null) return row.successRate;
  const reviewShare = (row.review - REVIEW_SCALE.min) / (REVIEW_SCALE.max - REVIEW_SCALE.min);
  return SUCCESS_SHARE_OF_QUALITY * row.successRate + (1 - SUCCESS_SHARE_OF_QUALITY) * reviewShare;
}

export function normalizeWeights({ quality, price, speed }) {
  const total = quality + price + speed;
  if (total <= 0) return { quality: 1 / 3, price: 1 / 3, speed: 1 / 3 };
  return { quality: quality / total, price: price / total, speed: speed / total };
}

/** The rows with a 0-1 score, in the order given. */
export function rank(rows, weights) {
  const { quality, price, speed } = normalizeWeights(weights);
  const qualityScores = spreadScores(rows.map(qualityOf));
  const priceScores = cheapnessScores(rows.map((row) => row.costUsd?.median ?? null));
  const speedScores = cheapnessScores(rows.map((row) => row.minutes?.median ?? null));
  return rows.map((row, index) => ({ ...row, score: quality * qualityScores[index] + price * priceScores[index] + speed * speedScores[index] }));
}

const canLead = (row) => row.successes > 0 && row.strength === 'measured';

/** Best score first; models that never worked, or have few runs, come after every model that can lead. */
export function ranked(rows, weights) {
  return rank(rows, weights).sort((a, b) => Number(canLead(b)) - Number(canLead(a)) || b.score - a.score);
}

/** Among measured rows: the most reliable, those that work at least three quarters as often, and of those the cheapest and fastest per working result. */
export function reliableChoices(rows) {
  const measured = rows.filter((row) => row.strength === 'measured');
  const eligible = worksAsOftenAsBest(measured, (row) => row.successRate);
  const best = measured.reduce((top, row) => (top == null || row.successRate > top.successRate ? row : top), null);
  return { best, eligible, cheapest: lowestBy(eligible, (row) => row.costPerSuccessUsd), fastest: lowestBy(eligible, (row) => row.minutesPerSuccess) };
}
