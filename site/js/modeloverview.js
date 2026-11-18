// The Models overview: a small profile card per model, or one table, sorted and grouped as chosen.
import { colourOf } from './grid-model.js';
import { el, harnessMark } from './lib.js';
import { DEFAULT_SORT, SORT_OPTIONS, compactMinutes, leaderSentence, sortEntries, trackPositions } from './modelcards.js';
import { moneyText } from './modelstory.js';
import { STRENGTHS, TASKS } from './words.js';

const taskKeys = Object.keys(TASKS);
const percent = (share) => `${Math.round(share * 100)}%`;
const money = (value) => (value == null ? '–' : moneyText(value));
const SEGMENTS = [
  ['always', 'always works', 'm-seg-always'],
  ['flips', 'flips between runs', 'm-seg-flips'],
  ['never', 'never works', 'm-seg-never'],
];

/** Where each model's price and time sit on one task's track, from cheapest (0) to dearest (1) on a log scale. */
function trackPlaces(entries) {
  const places = {};
  for (const task of taskKeys) {
    const withTask = entries.filter((entry) => entry.tasks[task]);
    const costPlaces = trackPositions(withTask.map((entry) => entry.tasks[task].cost));
    const timePlaces = trackPositions(withTask.map((entry) => entry.tasks[task].minutes));
    withTask.forEach((entry, index) => { places[`${entry.key}|${task}`] = { cost: costPlaces[index], time: timePlaces[index] }; });
  }
  return places;
}

function shareBar(figures) {
  const fill = el('div', { class: 'm-bar-fill', style: `width: ${figures.share * 100}%; background: ${colourOf(figures.share).background}` });
  return el('div', { class: 'm-bar-cell', title: `${percent(figures.share)} of runs work, each ticket counting equally` }, [el('div', { class: 'm-bar' }, fill), el('span', { class: 'm-bar-text' }, percent(figures.share))]);
}

function steadinessStrip(counts) {
  const total = counts.always + counts.flips + counts.never;
  const title = `${counts.always} setups always work, ${counts.flips} flip between runs, ${counts.never} never work`;
  const parts = SEGMENTS.filter(([key]) => counts[key]).map(([key, , cssClass]) => el('div', { class: `m-seg ${cssClass}`, style: `flex-grow: ${counts[key]}` }));
  return el('div', { class: 'm-strip-cell', title }, [el('div', { class: 'm-steady' }, parts), el('span', { class: 'm-strip-text' }, total ? `${counts.flips} flip` : '–')]);
}

function track(place, valueText, title) {
  return el('div', { class: 'm-track-cell', title }, [
    el('div', { class: 'm-track' }, place == null ? null : el('span', { class: 'm-track-dot', style: `left: calc(4px + ${place} * (100% - 8px))` })),
    el('span', { class: 'm-track-text' }, valueText),
  ]);
}

function taskRow(task, figures, counts, places, sentence) {
  const label = el('span', { class: 'm-row-label', title: TASKS[task].explain }, TASKS[task].label);
  if (!figures) return el('div', { class: 'm-task-row' }, [label, el('span', { class: 'm-row-empty' }, 'not run')]);
  return el('div', { class: 'm-task-row', role: 'group', 'aria-label': sentence, title: sentence }, [
    label,
    el('div', { class: 'm-graphics', 'aria-hidden': 'true' }, [
      shareBar(figures),
      steadinessStrip(counts),
      track(places?.cost, money(figures.cost), `Usual cost ${money(figures.cost)}; left is cheaper than the other models, right is dearer`),
      track(places?.time, compactMinutes(figures.minutes), `Usual time ${compactMinutes(figures.minutes)}; left is faster than the other models, right is slower`),
    ]),
  ]);
}

function card(entry, places, link) {
  const tags = [
    entry.notFullyTested ? el('span', { class: 'lore-tag', title: entry.notFullyTested }, 'not fully tested') : null,
    entry.fewRuns ? el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label) : null,
  ].filter(Boolean);
  return el('div', { class: 'm-card' }, [
    el('h3', {}, [link(entry, [harnessMark(entry.mark), ' ', entry.model])]),
    el('div', { class: 'm-card-tags' }, tags),
    el('div', { class: 'm-columns', 'aria-hidden': 'true' }, [el('span'), el('span', {}, 'works'), el('span', {}, 'steady?'), el('span', {}, 'price'), el('span', {}, 'time')]),
    ...taskKeys.map((task) => taskRow(task, entry.tasks[task], entry.counts[task], places[`${entry.key}|${task}`], entry.sentences[task])),
  ]);
}

function cardGrid(entries, places, link) {
  return el('div', { class: 'm-cards' }, entries.map((entry) => card(entry, places, link)));
}

function grouped(entries, group, render) {
  if (!group) return [render(entries)];
  return [...Map.groupBy(entries, (entry) => entry.maker).entries()].flatMap(([maker, makerEntries]) => [el('div', { class: 'm-maker' }, maker), render(makerEntries)]);
}

const TABLE_COLUMNS = taskKeys.flatMap((task) => [['works', task, 'works'], ['cost', task, 'cost'], ['time', task, 'time']]);

function squareCell(figures) {
  if (!figures) return el('td', { class: 'num' }, el('span', { class: 'm-sq m-sq-none' }, '–'));
  const colours = colourOf(figures.share);
  return el('td', { class: 'num' }, el('span', { class: 'm-sq', style: `background: ${colours.background}; color: ${colours.text}`, title: `${percent(figures.share)} of runs work` }, percent(figures.share)));
}

function tableView(entries, state, choose, link, group) {
  const headCell = ([measure, task, label]) => {
    const key = `${measure}:${task}`;
    const sorted = state.sort === key;
    return el('th', { class: `num sortable ${measure === 'works' ? 'first' : ''}`, 'aria-sort': sorted ? 'ascending' : 'none', title: `Sort by ${label} for ${TASKS[task].activity}` },
      el('button', { class: `m-sort-button ${sorted ? 'active' : ''}`, onclick: () => choose({ sort: key }) }, `${label}${sorted ? ' ▾' : ''}`));
  };
  const head = el('thead', {}, [
    el('tr', {}, [el('th', {}, ''), ...taskKeys.map((task) => el('th', { class: 'm-task-col', colspan: 3, title: TASKS[task].explain }, TASKS[task].label))]),
    el('tr', {}, [el('th', {}, el('button', { class: `m-sort-button ${state.sort === 'name' ? 'active' : ''}`, onclick: () => choose({ sort: 'name' }) }, 'Model')), ...TABLE_COLUMNS.map(headCell)]),
  ]);
  const rowOf = (entry) => el('tr', {}, [
    el('td', { class: 'm-model-cell' }, [link(entry, [harnessMark(entry.mark), ' ', entry.model]), entry.fewRuns ? el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label) : null]),
    ...taskKeys.flatMap((task) => {
      const figures = entry.tasks[task];
      return [squareCell(figures), el('td', { class: 'num' }, money(figures?.cost)), el('td', { class: 'num' }, compactMinutes(figures?.minutes ?? null))];
    }),
  ]);
  const body = group
    ? [...Map.groupBy(entries, (entry) => entry.maker).entries()].flatMap(([maker, makerEntries]) => [el('tr', { class: 'm-group-row' }, el('th', { colspan: 10 }, maker)), ...makerEntries.map(rowOf)])
    : entries.map(rowOf);
  return el('div', { class: 'm-table-wrap m-matrix' }, el('table', { class: 'm-table' }, [head, el('tbody', {}, body)]));
}

function legend() {
  const swatch = (cssClass) => el('span', { class: `m-seg-swatch ${cssClass}`, 'aria-hidden': 'true' });
  return el('p', { class: 'dim m-legend' }, [
    el('strong', {}, 'Bar: '), 'the share of runs that work, from none (orange) to all (blue). ',
    el('strong', {}, 'Strip: '), 'how steady the model is across its setups: ', swatch('m-seg-always'), ' always works, ', swatch('m-seg-flips'), ' flips between runs, ', swatch('m-seg-never'), ' never works. ',
    el('strong', {}, 'Price and time: '), 'the dot sits between the cheapest (left) and the dearest (right) model for that task, on a log scale; the figure is the usual cost and the time the model works. Hover a row for the full sentence.',
  ]);
}

function controls(state, choose, extra) {
  const sortSelect = el('select', { onchange: (event) => choose({ sort: event.target.value }) },
    SORT_OPTIONS.map((option) => el('option', { value: option.key, selected: state.sort === option.key }, option.label)));
  const viewButton = (view, label) => el('button', { class: state.view === view ? 'active' : '', 'aria-pressed': String(state.view === view), onclick: () => choose({ view }) }, label);
  return el('div', { class: 'm-picker' }, [
    ...extra,
    el('label', {}, ['Sort by', sortSelect]),
    el('label', {}, [el('input', { type: 'checkbox', checked: state.group, onchange: (event) => choose({ group: event.target.checked }) }), 'Group by maker']),
    el('div', { class: 'tabs' }, [viewButton('cards', 'Cards'), viewButton('table', 'Table')]),
  ]);
}

/** The overview's nodes. entries carry the figures per task; choose merges a change into the page state and redraws; link makes a model link. */
export function overviewNodes({ entries, state, choose, link, extraControls }) {
  const sorted = sortEntries(entries, state.sort ?? DEFAULT_SORT);
  const places = trackPlaces(entries);
  const body = state.view === 'table'
    ? [tableView(sorted, state, choose, link, state.group)]
    : grouped(sorted, state.group, (rows) => cardGrid(rows, places, link));
  return [
    el('p', { class: 'dim' }, 'Every model was run many times on real tickets. Each card is a small profile, one row per task, so cards can be compared by eye. The share that works counts every ticket equally. Pick a model to see how steady it is when the same setup is repeated, how it fails, and whether a knowledge base helps.'),
    el('p', { class: 'answer m-answer' }, leaderSentence(entries)),
    controls(state, choose, extraControls),
    legend(),
    ...body,
  ];
}
