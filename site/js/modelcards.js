// Pure logic for the Models overview: steadiness segments, log-scale track positions, sort orders and the answer sentence.
import { flipped, groupSetups } from './steadiness.js';
import { TASKS } from './words.js';

export const SORT_OPTIONS = [
  { key: 'works:tdd-round', label: 'best at writing the code' },
  { key: 'works:dod', label: 'best at writing the tests' },
  { key: 'works:repair-build', label: 'best at fixing a broken build' },
  { key: 'cost:tdd-round', label: 'cheapest for writing the code' },
  { key: 'time:tdd-round', label: 'fastest at writing the code' },
  { key: 'name', label: 'maker and name' },
];
export const DEFAULT_SORT = SORT_OPTIONS[0].key;
export const isSortKey = (key) => SORT_OPTIONS.some((option) => option.key === key) || /^(works|cost|time):(dod|tdd-round|repair-build)$/.test(key ?? '');

/** How many setups of one model and task always work, flip between working and not, or never work; a setup run once counts by its one result. */
export function segmentCounts(runs) {
  const setups = groupSetups(runs);
  const flipping = setups.filter(flipped).length;
  const always = setups.filter((setup) => !flipped(setup) && setup.runs[0].success).length;
  return { always, flips: flipping, never: setups.length - flipping - always };
}

/** Each value as a 0 to 1 place between the smallest and largest on a log scale; null stays null and equal values sit in the middle. */
export function trackPositions(values) {
  const logs = values.map((value) => (value == null ? null : Math.log(Math.max(value, 1e-6))));
  const present = logs.filter((value) => value != null);
  const lowest = Math.min(...present);
  const span = Math.max(...present) - lowest;
  return logs.map((value) => {
    if (value == null) return null;
    return span === 0 ? 0.5 : (value - lowest) / span;
  });
}

const FIELD_OF_MEASURE = { works: 'share', cost: 'cost', time: 'minutes' };
const nameOrder = (a, b) => a.maker.localeCompare(b.maker) || a.model.localeCompare(b.model, undefined, { numeric: true });

/** Entries best first for the chosen key: works high to low (only for models that ran every ticket), cost and time low to high; models without a comparable value come last. */
export function sortEntries(entries, sortKey) {
  const [measure, task] = sortKey.split(':');
  if (measure === 'name') return [...entries].sort(nameOrder);
  const comparable = (entry) => measure !== 'works' || entry.tasks[task]?.ranked;
  const valueOf = (entry) => (comparable(entry) ? entry.tasks[task]?.[FIELD_OF_MEASURE[measure]] ?? null : null);
  const direction = measure === 'works' ? -1 : 1;
  return [...entries].sort((a, b) => {
    const [first, second] = [valueOf(a), valueOf(b)];
    if (first == null || second == null) return Number(first == null) - Number(second == null) || nameOrder(a, b);
    return direction * (first - second) || nameOrder(a, b);
  });
}

/** One sentence naming, for each task, the model that works most often among those that ran every ticket. */
export function leaderSentence(entries) {
  const parts = Object.keys(TASKS).map((task) => {
    const candidates = entries.filter((entry) => entry.tasks[task]?.ranked);
    const best = Math.max(...candidates.map((entry) => entry.tasks[task].share));
    const leaders = candidates.filter((entry) => entry.tasks[task].share === best);
    if (!leaders.length) return null;
    const others = leaders.length > 1 ? ` (level with ${leaders.length - 1} other${leaders.length > 2 ? 's' : ''})` : '';
    return `for ${TASKS[task].activity}, ${leaders[0].model} works most often, ${Math.round(best * 100)}% of the time${others}`;
  }).filter(Boolean);
  if (!parts.length) return 'There are no results to compare yet.';
  return `${parts.join('; ').replace(/^f/, 'F')}. Models that skipped a ticket are left out of this.`;
}

export const compactMinutes = (value) => {
  if (value == null) return '–';
  return value < 1 ? 'under 1 min' : `${Math.round(value)} min`;
};
