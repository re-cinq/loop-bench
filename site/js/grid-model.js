// Pure logic of the "At a glance" grid: setups, measures, colours, row order and the plain-text summaries.
import { FEW_RUNS_BELOW, missingText, percentile, summarizeModels } from './rank.js';
import { shortTitle, ticketTitle } from './tickets.js';
import { KNOWLEDGE_BASES } from './words.js';

export const KNOWLEDGE_BASE_ORDER = ['none', 'lore-mcp', 'lore-utopia'];
const SIZE_ORDER = ['small', 'medium', 'large'];
const MOSTLY_WORKS_FROM = 0.5;
const MIN_SHARED_SETUPS_FOR_PAIR = 6;
const EXTREMES_SHOWN = 3;

const sum = (values) => values.reduce((total, value) => total + value, 0);
const mean = (values) => (values.length ? sum(values) / values.length : null);
const known = (values) => values.filter((value) => value != null);
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const percent = (share) => `${Math.round(share * 100)}%`;
const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
export const modelKeyOf = (item) => `${item.harness}/${item.model}`;
export function ticketLabel(ticket, size) {
  const title = ticketTitle(ticket);
  return `ticket ${ticket}${title ? ` "${shortTitle(title)}"` : ''}${size ? ` (${size})` : ''}`;
}
const joinWords = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0] ?? '');
const reviewOf = (runs) => mean(known(runs.flatMap((run) => [run.correctness, run.completeness, run.closeness])));
const medianOf = (values) => (values.length ? percentile(values, 0.5) : null);

export function formatMoney(value) {
  if (value < 0.01) return '<$0.01';
  return value >= 10 ? `$${Math.round(value)}` : `$${value.toFixed(2)}`;
}

export function formatMinutes(value) {
  if (value < 1) return '<1m';
  return `${Math.round(value)}m`;
}

function minutesInWords(value) {
  if (value < 1) return 'under a minute';
  const rounded = Math.round(value);
  return rounded === 1 ? 'about 1 minute' : `about ${rounded} minutes`;
}

/** Each measure: where its value comes from, which way is better, the fixed scale for colour, and how it reads. */
export const MEASURES = {
  works: {
    label: 'Works',
    better: 'higher',
    valueOf: (setup) => setup.share,
    goodnessOf: (value) => clamp01(value),
    cellText: (setup) => `${setup.successes}/${setup.runs}`,
    format: percent,
    averagePhrase: 'the share of runs that work',
    isSame: (a, b) => Math.abs(a - b) < 0.1,
    scaleEnds: ['no run works', 'every run works'],
  },
  price: {
    label: 'Price',
    better: 'lower',
    valueOf: (setup) => setup.cost,
    goodnessOf: (value) => clamp01(1 - Math.log(value / 0.02) / Math.log(5 / 0.02)),
    cellText: (setup) => formatMoney(setup.cost),
    format: formatMoney,
    averagePhrase: 'the usual cost of a run',
    isSame: (a, b) => Math.max(a, b) / Math.max(Math.min(a, b), 1e-6) < 1.25,
    scaleEnds: ['$5 or more', '$0.02 or less'],
  },
  time: {
    label: 'Time',
    better: 'lower',
    valueOf: (setup) => setup.minutes,
    goodnessOf: (value) => clamp01(1 - Math.log(value / 1) / Math.log(60 / 1)),
    cellText: (setup) => formatMinutes(setup.minutes),
    format: minutesInWords,
    averagePhrase: 'the usual time of a run',
    isSame: (a, b) => Math.max(a, b) / Math.max(Math.min(a, b), 1e-6) < 1.25,
    scaleEnds: ['an hour or more', 'a minute or less'],
  },
  review: {
    label: 'AI reviewer score',
    better: 'higher',
    valueOf: (setup) => setup.review,
    goodnessOf: (value) => clamp01((value - 1) / 4),
    cellText: (setup) => setup.review.toFixed(1),
    format: (value) => `${value.toFixed(1)} of 5`,
    averagePhrase: 'the AI reviewer score',
    isSame: (a, b) => Math.abs(a - b) < 0.3,
    scaleEnds: ['1 of 5', '5 of 5'],
  },
};

export const measuresFor = (task) => Object.keys(MEASURES).filter((key) => key !== 'review' || task !== 'dod');

const COLOUR_STOPS = [
  { at: 0, rgb: [179, 71, 0] },
  { at: 0.5, rgb: [247, 240, 225] },
  { at: 1, rgb: [31, 95, 168] },
];

const DARK_TEXT_RGB = [0, 0, 0];

const luminanceOf = ([red, green, blue]) => {
  const linear = (channel) => ((channel / 255) <= 0.03928 ? channel / 255 / 12.92 : (((channel / 255) + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
};

/** Orange for 0 (worst) through pale to blue for 1 (best), with the text colour that reads on it. */
export function colourOf(goodness) {
  const upper = COLOUR_STOPS.find((stop) => stop.at >= goodness) ?? COLOUR_STOPS.at(-1);
  const lower = COLOUR_STOPS[Math.max(0, COLOUR_STOPS.indexOf(upper) - 1)];
  const span = upper.at - lower.at;
  const mix = span === 0 ? 0 : (goodness - lower.at) / span;
  const rgb = lower.rgb.map((channel, index) => Math.round(channel + (upper.rgb[index] - channel) * mix));
  const lightness = luminanceOf(rgb);
  const darkTextContrast = (lightness + 0.05) / (luminanceOf(DARK_TEXT_RGB) + 0.05);
  const whiteTextContrast = 1.05 / (lightness + 0.05);
  return { background: `rgb(${rgb.join(', ')})`, text: darkTextContrast > whiteTextContrast ? '#000000' : '#ffffff' };
}

/** One entry per ticket, small before medium before large, then by number. */
export function ticketColumns(runs) {
  const sizeOfTicket = new Map(runs.map((run) => [run.ticket, run.size]));
  const rank = (size) => (SIZE_ORDER.indexOf(size) === -1 ? SIZE_ORDER.length : SIZE_ORDER.indexOf(size));
  return [...sizeOfTicket].map(([ticket, size]) => ({ ticket, size })).sort((a, b) => rank(a.size) - rank(b.size) || a.ticket - b.ticket);
}

/** One entry per model, knowledge base and ticket, with its run count, share that works and middle cost and time. */
export function buildSetups(runs) {
  const groups = Map.groupBy(runs, (run) => `${modelKeyOf(run)}|${run.knowledgeBase}|${run.ticket}`);
  return [...groups.values()].map((group) => {
    const [first] = group;
    const successes = group.filter((run) => run.success).length;
    return {
      modelKey: modelKeyOf(first),
      harness: first.harness,
      model: first.model,
      knowledgeBase: first.knowledgeBase,
      ticket: first.ticket,
      size: first.size,
      runs: group.length,
      successes,
      share: successes / group.length,
      cost: medianOf(known(group.map((run) => run.costUsd))),
      costUnknownRuns: group.filter((run) => run.costUsd == null).length,
      minutes: medianOf(known(group.map((run) => run.minutes))),
      review: reviewOf(group),
      few: group.length < FEW_RUNS_BELOW,
      runList: group,
    };
  });
}

export const setupKey = (setup) => `${setup.modelKey}|${setup.knowledgeBase}|${setup.ticket}`;

/** A square's goodness from 0 to 1 and its label, or null when the measure is unknown for that setup. */
export function squareOf(measureKey, setup) {
  const measure = MEASURES[measureKey];
  const value = measure.valueOf(setup);
  if (value == null) return null;
  return { value, goodness: measure.goodnessOf(value), text: measure.cellText(setup) };
}

const MODEL_VALUES = {
  works: (row) => row.successRate,
  price: (row) => row.costUsd?.median ?? null,
  time: (row) => row.minutes?.median ?? null,
  review: (row) => row.review,
};

/** Models that ran every ticket come best first on the measure, from the same per-model summary the other pages use; the rest follow, each with the tickets it lacks. */
export function orderModels(measureKey, setups) {
  const allTickets = [...new Set(setups.map((setup) => setup.ticket))];
  const sign = MEASURES[measureKey].better === 'lower' ? 1 : -1;
  const models = [...Map.groupBy(setups, (setup) => setup.modelKey).values()].map((modelSetups) => {
    const [row] = summarizeModels(modelSetups.flatMap((setup) => setup.runList));
    return {
      modelKey: modelSetups[0].modelKey,
      harness: modelSetups[0].harness,
      model: modelSetups[0].model,
      average: MODEL_VALUES[measureKey](row),
      setups: modelSetups,
      runs: row.runs,
      successes: row.successes,
      missing: allTickets.filter((ticket) => !row.tickets.includes(ticket)),
    };
  });
  return models.sort((a, b) => {
    if (a.missing.length !== b.missing.length) return Number(a.missing.length > 0) - Number(b.missing.length > 0) || a.missing.length - b.missing.length;
    if (a.average == null || b.average == null) return Number(a.average == null) - Number(b.average == null) || a.model.localeCompare(b.model);
    return sign * (a.average - b.average) || a.model.localeCompare(b.model);
  });
}

export function setupWords(setup, { task, measureKey }) {
  const kb = KNOWLEDGE_BASES[setup.knowledgeBase]?.label ?? setup.knowledgeBase;
  const kbText = setup.knowledgeBase === 'none' ? 'no knowledge base' : `the ${kb} knowledge base`;
  const works = `${setup.successes} of ${plural(setup.runs, 'run')} work (${percent(setup.share)})`;
  const cost = setup.cost == null ? 'cost unknown' : `usual cost ${MEASURES.price.format(setup.cost)}`;
  const time = setup.minutes == null ? 'time unknown' : `usual time ${minutesInWords(setup.minutes)}`;
  const review = task !== 'dod' && setup.review != null ? `; AI reviewer score ${MEASURES.review.format(setup.review)}` : '';
  const few = setup.few ? ` Only ${plural(setup.runs, 'run')}, so treat this as a hint.` : '';
  return `${setup.model} on ${ticketLabel(setup.ticket, setup.size)} with ${kbText}: ${works}; ${cost}; ${time}${review}.${few}`;
}

function modelSentence(measureKey, entry) {
  if (measureKey === 'works') return `${entry.model} works in ${MEASURES.works.format(entry.average)} of runs, with every ticket counting equally.`;
  if (measureKey === 'review') return `${entry.model} has an AI reviewer score of ${MEASURES.review.format(entry.average)} on average.`;
  if (measureKey === 'price') return `${entry.model} costs about ${formatMoney(entry.average)} for a usual run.`;
  return `${entry.model} works for ${minutesInWords(entry.average)} on a usual run.`;
}

/** Models that ran every ticket are ranked; the others are named with what they skipped. */
export function extremesText({ measureKey, setups, tickets }) {
  const ordered = orderModels(measureKey, setups).filter((entry) => entry.average != null);
  const sizeOfTicket = Object.fromEntries(tickets.map(({ ticket, size }) => [ticket, size]));
  const full = ordered.filter((entry) => !entry.missing.length);
  const skippers = ordered.filter((entry) => entry.missing.length);
  const strongest = full.slice(0, EXTREMES_SHOWN);
  const weakest = full.slice(strongest.length).slice(-EXTREMES_SHOWN).reverse();
  return {
    strongest: strongest.map((entry) => modelSentence(measureKey, entry)),
    weakest: weakest.map((entry) => modelSentence(measureKey, entry)),
    skipped: skippers.map((entry) => `${entry.model} was ${missingText(entry.missing, sizeOfTicket)}, so it is not ranked.`),
  };
}

/** For each ticket, how many models work in every run, never work, or sit in between. */
export function ticketAgreement({ setups, tickets }) {
  return tickets.map(({ ticket, size }) => {
    const byModel = [...Map.groupBy(setups.filter((setup) => setup.ticket === ticket), (setup) => setup.modelKey).values()];
    const totals = byModel.map((modelSetups) => ({ runs: sum(modelSetups.map((setup) => setup.runs)), successes: sum(modelSetups.map((setup) => setup.successes)) }));
    const always = totals.filter((total) => total.successes === total.runs).length;
    const never = totals.filter((total) => total.successes === 0).length;
    return { ticket, size, models: totals.length, always, never, mixed: totals.length - always - never };
  });
}

export function ticketSentence({ ticket, size, models, always, never, mixed }) {
  const base = `Ticket ${ticket}${size ? ` (${size})` : ''}: ${always} of ${models} models work in every run, ${never} never do`;
  return mixed ? `${base}, ${mixed} work in some runs and not in others.` : `${base}.`;
}

export function agreementSummaryText(agreements) {
  const names = (rows) => joinWords(rows.map((row) => ticketLabel(row.ticket, row.size)));
  const everyModel = agreements.filter((row) => row.models > 0 && row.always === row.models);
  const noModel = agreements.filter((row) => row.always === 0);
  const split = agreements.filter((row) => row.always > 0 && row.never > 0);
  return [
    everyModel.length ? `Every model works in every run on ${names(everyModel)}.` : 'No ticket is handled in every run by every model.',
    noModel.length ? `No model works in every run on ${names(noModel)}.` : 'Every ticket has at least one model that works in every run.',
    split.length ? `The models split on ${names(split)}: some always work, some never do.` : 'No ticket splits the models into some that always work and some that never do.',
  ];
}

/** How alike two models are: the share of setups both ran on which both mostly work or both mostly fail. */
export function modelPairAgreement(setups) {
  const verdicts = new Map();
  for (const setup of setups) {
    const own = verdicts.get(setup.modelKey) ?? new Map();
    own.set(`${setup.knowledgeBase}|${setup.ticket}`, setup.share >= MOSTLY_WORKS_FROM);
    verdicts.set(setup.modelKey, own);
  }
  const modelOf = new Map(setups.map((setup) => [setup.modelKey, setup.model]));
  const keys = [...verdicts.keys()].sort();
  const pairs = [];
  for (const [index, first] of keys.entries()) {
    for (const second of keys.slice(index + 1)) {
      const firstVerdicts = verdicts.get(first);
      const secondVerdicts = verdicts.get(second);
      const sharedKeys = [...firstVerdicts.keys()].filter((key) => secondVerdicts.has(key));
      if (sharedKeys.length < MIN_SHARED_SETUPS_FOR_PAIR) continue;
      const same = sharedKeys.filter((key) => firstVerdicts.get(key) === secondVerdicts.get(key)).length;
      pairs.push({ first: modelOf.get(first), second: modelOf.get(second), shared: sharedKeys.length, same, share: same / sharedKeys.length });
    }
  }
  return pairs;
}

const pairSentence = (pair) => `${pair.first} and ${pair.second} reach the same result in ${pair.same} of ${pair.shared} setups (${percent(pair.share)}).`;

export function pairsText(pairs) {
  const mostAlike = [...pairs].sort((a, b) => b.share - a.share || b.shared - a.shared || a.first.localeCompare(b.first));
  const mostDifferent = [...pairs].sort((a, b) => a.share - b.share || b.shared - a.shared || a.first.localeCompare(b.first));
  const perfect = pairs.filter((pair) => pair.share === 1).length;
  const perfectNote = perfect > EXTREMES_SHOWN ? [`${perfect} pairs in all agree on every setup they both ran, so only three are listed.`] : [];
  return {
    explanation: 'Two models reach the same result in a setup when both mostly work there or both mostly fail there. The share is how many of the setups they both ran they agree on.',
    alike: [...mostAlike.slice(0, EXTREMES_SHOWN).map(pairSentence), ...perfectNote],
    different: mostDifferent.slice(0, EXTREMES_SHOWN).map(pairSentence),
  };
}

/** Compares none, Lore and Utopia on the setups (a model on a ticket) that ran with all three. */
export function knowledgeBaseText({ measureKey, setups }) {
  const measure = MEASURES[measureKey];
  const byModelAndTicket = Map.groupBy(setups, (setup) => `${setup.modelKey}|${setup.ticket}`);
  const complete = [...byModelAndTicket.values()]
    .map((group) => Object.fromEntries(group.map((setup) => [setup.knowledgeBase, setup])))
    .filter((byKb) => KNOWLEDGE_BASE_ORDER.every((kb) => byKb[kb] && measure.valueOf(byKb[kb]) != null));
  if (!complete.length) return ['No model ran the same ticket with all three knowledge bases, so they cannot be compared yet.'];
  const averages = Object.fromEntries(KNOWLEDGE_BASE_ORDER.map((kb) => [kb, mean(complete.map((byKb) => measure.valueOf(byKb[kb])))]));
  const first = `Across ${plural(complete.length, 'setup')} (a model on a ticket) that ran with all three, ${measure.averagePhrase} averages ${measure.format(averages.none)} with no knowledge base, ${measure.format(averages['lore-mcp'])} with Lore and ${measure.format(averages['lore-utopia'])} with Utopia.`;
  const verdict = (kb) => {
    const sign = measure.better === 'higher' ? 1 : -1;
    const diffs = complete.map((byKb) => ({ same: measure.isSame(measure.valueOf(byKb[kb]), measure.valueOf(byKb.none)), delta: sign * (measure.valueOf(byKb[kb]) - measure.valueOf(byKb.none)) }));
    const better = diffs.filter((diff) => !diff.same && diff.delta > 0).length;
    const worse = diffs.filter((diff) => !diff.same && diff.delta < 0).length;
    return `${KNOWLEDGE_BASES[kb].label} did better than none in ${better}, worse in ${worse} and about the same in ${complete.length - better - worse}`;
  };
  const fewLore = complete.filter((byKb) => byKb['lore-mcp'].few).length;
  const second = `${verdict('lore-mcp')}; ${verdict('lore-utopia')}. Lore rests on fewer than ${FEW_RUNS_BELOW} runs in ${fewLore} of those ${complete.length}, so read it as a hint.`;
  return [first, second];
}
