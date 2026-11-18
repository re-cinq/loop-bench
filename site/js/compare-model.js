// Pure logic for the Compare page: things (a model, optionally narrowed to a knowledge base and a task size), a fair side-by-side summary, and the plain paragraph on top.
import { minutesText, moneyText } from './modelstory.js';
import { missingText, percentile, summarizeModels } from './rank.js';
import { flipped, groupSetups } from './steadiness.js';
import { FAILURE_REASONS, KNOWLEDGE_BASES, NONE_OR_ALL } from './words.js';

const SEPARATOR = '~';
const percent = (share) => `${Math.round(share * 100)}%`;
const approximately = (text) => (text.startsWith('under') ? text : `about ${text}`);
const joinWithAnd = (items) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);

export const thingKey = (thing) => `${thing.harness}/${thing.model}${SEPARATOR}${thing.kb}${SEPARATOR}${thing.size}`;
export const modelKeyOf = (item) => `${item.harness}/${item.model}`;

/** "claude/claude-sonnet-5-5~lore-utopia~small" into a thing; null when it is not shaped like one. */
export function parseThing(text) {
  const [modelKey, kb = NONE_OR_ALL, size = NONE_OR_ALL] = String(text ?? '').split(SEPARATOR);
  const slash = modelKey.indexOf('/');
  if (slash < 1 || slash === modelKey.length - 1) return null;
  return { harness: modelKey.slice(0, slash), model: modelKey.slice(slash + 1), kb, size };
}

const matchesThing = (thing) => (run) => run.harness === thing.harness && run.model === thing.model
  && (thing.kb === NONE_OR_ALL || run.knowledgeBase === thing.kb)
  && (thing.size === NONE_OR_ALL || run.size === thing.size);

/** The runs of one task that a thing covers. */
export const thingRuns = (runs, thing, task) => runs.filter((run) => run.task === task && matchesThing(thing)(run));

const kbWords = (kb) => (kb === 'none' ? 'no knowledge base' : KNOWLEDGE_BASES[kb]?.label ?? kb);

/** What narrows a thing, in words: "Utopia, small tickets"; empty when it covers everything. */
export function qualifierText(thing) {
  const parts = [thing.kb === NONE_OR_ALL ? null : kbWords(thing.kb), thing.size === NONE_OR_ALL ? null : `${thing.size} tickets`];
  return parts.filter(Boolean).join(', ');
}

/** The model name alone when it appears once, otherwise the name with what narrows it. */
export function thingNames(things) {
  const appearances = Map.groupBy(things, modelKeyOf);
  return things.map((thing) => {
    if (appearances.get(modelKeyOf(thing)).length === 1) return thing.model;
    return `${thing.model} (${qualifierText(thing) || 'everything'})`;
  });
}

/** Indexes of the best value; none when fewer than two values are known or all are equal. */
export function bestIndexes(values, { lowerIsBetter, digits = 9 }) {
  const factor = 10 ** digits;
  const known = values.filter((value) => value != null).map((value) => Math.round(value * factor) / factor);
  if (known.length < 2) return [];
  const best = lowerIsBetter ? Math.min(...known) : Math.max(...known);
  if (known.every((value) => Math.abs(value - best) < 1e-9)) return [];
  return values.flatMap((value, index) => (value != null && Math.abs(Math.round(value * factor) / factor - best) < 1e-9 ? [index] : []));
}

function steadinessOf(runs) {
  const repeated = groupSetups(runs).filter((setup) => setup.runs.length >= 2);
  return { repeated: repeated.length, steady: repeated.filter((setup) => !flipped(setup)).length };
}

function topFailureOf(runs) {
  const failures = runs.filter((run) => !run.success);
  const counts = Object.entries(Object.groupBy(failures, (run) => run.endReason)).map(([reason, group]) => [reason, group.length]);
  const [reason, count] = counts.sort((a, b) => b[1] - a[1])[0] ?? [];
  if (!reason) return { failures: 0 };
  return { failures: failures.length, count, reason, words: FAILURE_REASONS[reason]?.label ?? reason };
}

const commonTicketsOf = (ticketSets) => (ticketSets.length ? [...ticketSets[0]].filter((ticket) => ticketSets.every((set) => set.has(ticket))) : []);

function columnFor({ thing, name, ownRuns, fairRuns, taskRuns, sizeOfTicket, reviewed }) {
  if (!ownRuns.length) return { thing, name, empty: true, runs: 0 };
  const available = new Set(taskRuns.filter((run) => (thing.kb === NONE_OR_ALL || run.knowledgeBase === thing.kb) && (thing.size === NONE_OR_ALL || run.size === thing.size)).map((run) => run.ticket));
  const ran = new Set(ownRuns.map((run) => run.ticket));
  const missing = [...available].filter((ticket) => !ran.has(ticket));
  const [row] = summarizeModels(fairRuns, { reviewed });
  return {
    thing, name, empty: false, runs: fairRuns.length, row,
    rounds: percentile(fairRuns.map((run) => run.rounds).filter((rounds) => rounds != null), 0.5),
    steadiness: steadinessOf(fairRuns),
    failure: topFailureOf(fairRuns),
    missing, missingText: missing.length ? missingText(missing, sizeOfTicket) : null,
  };
}

/**
 * One column per thing, all measured on the tickets every non-empty column ran. When the columns share no ticket
 * (for example small against large tasks) each is measured on its own tickets and `sharedTickets` is false.
 */
export function buildComparison(allRuns, things, task) {
  const taskRuns = allRuns.filter((run) => run.task === task);
  const sizeOfTicket = Object.fromEntries(allRuns.map((run) => [run.ticket, run.size]));
  const names = thingNames(things);
  const ownRunsByThing = things.map((thing) => taskRuns.filter(matchesThing(thing)));
  const filled = ownRunsByThing.filter((runs) => runs.length);
  const ticketSets = filled.map((runs) => new Set(runs.map((run) => run.ticket)));
  const commonTickets = commonTicketsOf(ticketSets);
  const sharedTickets = filled.length < 2 || commonTickets.length > 0;
  const allTickets = [...new Set(filled.flat().map((run) => run.ticket))];
  const columns = things.map((thing, index) => {
    const ownRuns = ownRunsByThing[index];
    const fairRuns = sharedTickets ? ownRuns.filter((run) => commonTickets.includes(run.ticket)) : ownRuns;
    return columnFor({ thing, name: names[index], ownRuns, fairRuns, taskRuns, sizeOfTicket, reviewed: task !== 'dod' });
  });
  const leftOut = sharedTickets && filled.length > 1 ? allTickets.filter((ticket) => !commonTickets.includes(ticket)) : [];
  return { task, columns, sharedTickets, commonTickets, leftOut, sizeOfTicket };
}

/** The one line on which tickets were compared; null when nothing had to be left out. */
export function fairnessLine(comparison) {
  const { columns, sharedTickets, leftOut, sizeOfTicket } = comparison;
  if (!sharedTickets) return 'These columns share no ticket, so each is measured on its own tickets. Treat the numbers as a rough guide, not a like-for-like comparison.';
  if (!leftOut.length) return null;
  const reasons = columns.filter((column) => !column.empty && column.missing.some((ticket) => leftOut.includes(ticket)))
    .map((column) => `${column.name} was ${missingText(column.missing.filter((ticket) => leftOut.includes(ticket)), sizeOfTicket)}`);
  const leftOutWords = missingText(leftOut, sizeOfTicket).replace('not run on ', '');
  return `Compared only on the tickets every column ran. ${joinWithAnd(reasons)}, so ${leftOutWords} ${leftOut.length === 1 ? 'is' : 'are'} left out for everyone.`;
}

const valueOf = {
  works: (column) => column.row.successRate,
  cost: (column) => column.row.costUsd?.median ?? null,
  time: (column) => column.row.minutes?.median ?? null,
  costPerWorking: (column) => column.row.costPerSuccessUsd,
  review: (column) => column.row.review,
};

/** The indexes of the best column for each measure of a comparison. */
export function bestColumns(columns) {
  const measure = (pick, lowerIsBetter, digits) => bestIndexes(columns.map((column) => (column.empty ? null : pick(column))), { lowerIsBetter, digits });
  return {
    works: measure(valueOf.works, false, 2),
    cost: measure(valueOf.cost, true, 2),
    time: measure(valueOf.time, true, 0),
    review: measure(valueOf.review, false, 1),
    rounds: measure((column) => column.rounds, true, 0),
    costPerWorking: measure(valueOf.costPerWorking, true, 2),
    steady: measure((column) => (column.steadiness.repeated ? column.steadiness.steady / column.steadiness.repeated : null), false, 2),
  };
}

const namesOf = (columns, indexes) => joinWithAnd(indexes.map((index) => columns[index].name));

function worksClause(columns, leaders) {
  const others = columns.filter((_, index) => !leaders.includes(index)).map((column) => percent(column.row.successRate));
  return { who: namesOf(columns, leaders), plural: leaders.length > 1, verb: ['works', 'work'], rest: `most often (${percent(columns[leaders[0]].row.successRate)} against ${joinWithAnd(others)})` };
}

function leaderClause(columns, leaders, { is, are, rest }) {
  return { who: namesOf(columns, leaders), plural: leaders.length > 1, verb: [is, are], rest };
}

/** "a works most often (..), is the cheapest at ..": the name is dropped when the same columns lead the previous clause. */
function joinClauses(clauses) {
  const parts = clauses.map((clause, index) => {
    const verb = clause.verb[clause.plural ? 1 : 0];
    const sameAsPrevious = index > 0 && clauses[index - 1].who === clause.who;
    return sameAsPrevious ? `${verb} ${clause.rest}` : `${clause.who} ${verb} ${clause.rest}`;
  });
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')}, and ${parts.at(-1)}` : parts[0];
}

const sameModel = (a, b) => modelKeyOf(a.thing) === modelKeyOf(b.thing);
const pointsText = (delta) => `${Math.round(Math.abs(delta) * 100)} points`;
const dollarsText = (delta) => `$${Math.abs(delta).toFixed(2)}`;

function changeClauses(base, other) {
  const worksDelta = other.row.successRate - base.row.successRate;
  const worksClauseText = pointsText(worksDelta) === '0 points'
    ? `works about as often (${percent(other.row.successRate)})`
    : `works ${pointsText(worksDelta)} ${worksDelta > 0 ? 'more' : 'less'} often (${percent(other.row.successRate)} against ${percent(base.row.successRate)})`;
  const costDelta = (other.row.costUsd?.median ?? NaN) - (base.row.costUsd?.median ?? NaN);
  const timeDelta = (other.row.minutes?.median ?? NaN) - (base.row.minutes?.median ?? NaN);
  const costText = dollarsText(costDelta) === '$0.00' || Number.isNaN(costDelta) ? null : `a usual run costs ${dollarsText(costDelta)} ${costDelta > 0 ? 'more' : 'less'}`;
  const timeText = Math.round(Math.abs(timeDelta)) === 0 || Number.isNaN(timeDelta) ? null : `${timeDelta > 0 ? 'takes' : 'is'} ${Math.round(Math.abs(timeDelta))} ${Math.round(Math.abs(timeDelta)) === 1 ? 'minute' : 'minutes'} ${timeDelta > 0 ? 'longer' : 'quicker'}`;
  return [worksClauseText, [costText, timeText].filter(Boolean).join(' and ')].filter(Boolean);
}

/** One sentence per column that repeats an earlier column's model: what the narrower or different setup changed. */
export function sameModelSentences(columns) {
  const filled = columns.filter((column) => !column.empty);
  return filled.flatMap((column, index) => {
    const base = filled.slice(0, index).find((earlier) => sameModel(earlier, column));
    if (!base) return [];
    const [works, rest] = changeClauses(base, column);
    return [`${column.name} compared with ${base.name}: ${works}${rest ? `; ${rest}` : ''}.`];
  });
}

/** The plain paragraph on top: who wins on what, with numbers, what a change of knowledge base or size did, and which columns rest on few runs. */
export function comparisonParagraph(comparison) {
  const filled = comparison.columns.filter((column) => !column.empty);
  const emptyNames = comparison.columns.filter((column) => column.empty).map((column) => column.name);
  const emptyText = emptyNames.length ? [`${joinWithAnd(emptyNames)} has no runs for this task with these choices.`] : [];
  if (filled.length < 2) return ['There are not enough runs to compare yet.', ...emptyText].join(' ');
  const best = bestColumns(filled);
  const lowestOf = (indexes, pick) => approximately(pick(filled[indexes[0]]));
  const clauses = [];
  if (best.works.length) clauses.push(worksClause(filled, best.works));
  if (best.cost.length) clauses.push(leaderClause(filled, best.cost, { is: 'is', are: 'are', rest: `the cheapest at ${lowestOf(best.cost, (column) => moneyText(valueOf.cost(column)))} a run` }));
  if (best.time.length) clauses.push(leaderClause(filled, best.time, { is: 'is', are: 'are', rest: `the fastest at ${lowestOf(best.time, (column) => minutesText(valueOf.time(column)))} a run` }));
  const costPerWorkingDiffers = best.costPerWorking.length && best.costPerWorking.join() !== best.cost.join();
  if (costPerWorkingDiffers) clauses.push(leaderClause(filled, best.costPerWorking, { is: 'costs', are: 'cost', rest: `least per working result (${moneyText(valueOf.costPerWorking(filled[best.costPerWorking[0]]))})` }));
  const opening = clauses.length ? `${joinClauses(clauses)}.` : `Every column works equally often (${percent(filled[0].row.successRate)}) and none is clearly cheaper or faster.`;
  const fewColumns = filled.filter((column) => column.row.strength === 'few');
  const fewText = fewColumns.length ? [`${joinWithAnd(fewColumns.map((column) => `${column.name} (${column.runs} ${column.runs === 1 ? 'run' : 'runs'})`))} rest${fewColumns.length === 1 ? 's' : ''} on only a few runs, so treat ${fewColumns.length === 1 ? 'it as a hint' : 'them as hints'}.`] : [];
  const sentences = [opening, ...sameModelSentences(filled), ...fewText, ...emptyText];
  return sentences.join(' ');
}
