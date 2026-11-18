// Every setup in a table for people who want every number: filter, sort, and tick 2–4 to compare. Technical names sit in tooltips.
import { mountChrome } from './chrome.js';
import { TASKS, labelOf } from './words.js';
import { contextLabel, copyLinkButton, deltaBar, deltaClass, el, harnessMark, markOf, header, isDone, loadBench, meanOf, METRICS, metricNode, modelCell, mount, niceBound, one, panel, readHash, signed, spreadNode, two, unique, whole, writeHash } from './lib.js';

const MAX_COMPARED = 4;
const DOMINATED = { title: 'dominated: another cell of this station is as cheap, as fast and as well judged, and better on one' };
const effortLevel = (cell) => cell.effort.replace(/ \(.*\)$/, '');
const FACETS = [
  { key: 'ticket', label: 'ticket', of: (c) => `#${c.ticket}` },
  { key: 'station', label: 'task', of: (c) => labelOf(TASKS, c.station) },
  { key: 'harness', label: 'tool', of: (c) => c.harness },
  { key: 'context', label: 'knowledge base', of: (c) => contextLabel(c) },
  { key: 'effort', label: 'thinking effort', of: (c) => effortLevel(c) },
  { key: 'prompt', label: 'instructions variant', of: (c) => c.prompt },
];
/** The facets a row's second line names; one shared by every shown row moves to the caption instead. */
const DESCRIBED = [
  { key: 'station', of: (c) => labelOf(TASKS, c.station) },
  { key: 'effort', of: (c) => `${effortLevel(c)} effort` },
  { key: 'prompt', of: (c) => `${c.prompt} instructions` },
  { key: 'context', of: (c) => contextLabel(c) },
  { key: 'runs', of: (c) => (isDone(c) ? `${c.runs} run${c.runs === 1 ? '' : 's'}` : c.status) },
];
const plainName = (cell) => `${cell.model} · ${labelOf(TASKS, cell.station)} · ${contextLabel(cell)}`;
const PLAIN_MEASURE_LABEL = { green: 'works', rounds: 'rounds of trying', cost: 'cost per run', time: 'time per run', correct: 'reviewer: correct', complete: 'reviewer: complete', close: 'reviewer: close to the real fix', redgreen: 'tests that prove the fix', files: 'files changed', jaccard: 'overlap with the real fix' };
const metric = (key) => METRICS.find((m) => m.key === key);
const percent = (passed, of) => `${Math.round((passed / of) * 100)}%`;
/** Eight columns instead of seventeen: related metrics share a column, sorted by the one that decides. */
const COLUMNS = [
  {
    key: 'green', label: 'works', title: 'green: runs that reached green CI; below, dod tests red on base and green with the merged code', better: 'higher', value: metric('green').value,
    node: (c) => [percent(c.reachedGreen, c.runs), c.redToGreen ? el('span', { class: 'spread' }, `tests ${percent(c.redToGreen.passed, c.redToGreen.of)}`) : null],
  },
  { ...metric('rounds'), title: 'rounds: tdd rounds the loop spent', node: (c) => metricNode(metric('rounds'), c) },
  { ...metric('cost'), label: 'cost', title: 'cost: usd per loop at list prices', node: (c) => metricNode(metric('cost'), c) },
  { ...metric('time'), label: 'time', title: 'time: the model\'s own working minutes per run', node: (c) => metricNode(metric('time'), c) },
  {
    key: 'judge', label: 'AI reviewer score', title: 'judge: correct / complete / close to the PR, 1–5; sorted by their mean', better: 'higher', value: (c) => c.judgeMean,
    node: (c) => [[c.correctness, c.completeness, c.closeness].map((spread) => whole(meanOf(spread))).join(' / '), el('span', { class: 'spread' }, `average ${one(c.judgeMean)}`)],
  },
  {
    key: 'files', label: 'files changed', title: 'files: files changed; below, Jaccard overlap (J) with the merged PR\'s files; sorted by overlap', better: 'higher', value: metric('jaccard').value,
    node: (c) => [spreadNode(c.files, whole), el('span', { class: 'spread' }, `overlap ${two(meanOf(c.jaccard))}`)],
  },
];

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('All results, every number'));
const app = document.getElementById('app');
const state = { sort: 'cost', dir: 'asc', ...readHash() };
const selected = () => (state.sel ? state.sel.split(',') : []);

function matches(cell) {
  if (state.pending !== 'show' && !isDone(cell)) return false;
  if (state.dominated === 'hide' && cell.dominated) return false;
  return FACETS.every((facet) => !state[facet.key] || facet.of(cell) === state[facet.key]);
}

function sortedRows() {
  const column = COLUMNS.find((c) => c.key === state.sort) ?? COLUMNS.find((c) => c.key === 'cost');
  const sign = state.dir === 'asc' ? 1 : -1;
  const valueOf = (cell) => column.value(cell);
  return bench.cells.filter(matches).sort((a, b) => {
    const [va, vb] = [valueOf(a), valueOf(b)];
    if (va == null || vb == null) return (va == null) - (vb == null);
    return sign * (va - vb) || a.model.localeCompare(b.model);
  });
}

function filterBar() {
  const update = (key, value) => { state[key] = value; render(); };
  const facetSelect = (facet) => el('label', {}, [facet.label, el('select', { onchange: (e) => update(facet.key, e.target.value) }, [
    el('option', { value: '' }, 'all'),
    ...unique(bench.cells.map(facet.of)).map((value) => el('option', { value, selected: state[facet.key] === value }, value)),
  ])]);
  const toggle = (key, on, label) => el('label', {}, [
    el('input', { type: 'checkbox', checked: state[key] === on, onchange: (e) => update(key, e.target.checked ? on : '') }), label,
  ]);
  return el('div', { class: 'filters' }, [...FACETS.map(facetSelect), toggle('dominated', 'hide', 'hide setups another one beats'), toggle('pending', 'show', 'show setups not run yet'), copyLinkButton()]);
}

function sortHeader(column) {
  const active = state.sort === column.key;
  const arrow = active ? (state.dir === 'asc' ? ' ▲' : ' ▼') : '';
  return el('th', {
    class: 'num sortable',
    title: [column.title, column.better ? `${column.better} is better` : ''].filter(Boolean).join('; '),
    onclick: () => {
      state.dir = active && state.dir === 'asc' ? 'desc' : 'asc';
      state.sort = column.key;
      render();
    },
  }, column.label + arrow);
}

function toggleSelected(id) {
  const current = selected();
  const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id].slice(-MAX_COMPARED);
  state.sel = next.join(',');
  render();
}

function matrixTable(rows, varying) {
  const picked = selected();
  const head = el('tr', {}, [el('th', {}, ''), el('th', { title: 'cell' }, 'setup'), ...COLUMNS.map(sortHeader)]);
  const body = rows.map((cell) => el('tr', { class: [cell.dominated ? 'dominated' : '', isDone(cell) ? '' : 'pending', picked.includes(cell.id) ? 'row-sel' : ''].join(' ').trim(), title: cell.dominated ? DOMINATED.title : '' }, [
    el('td', {}, isDone(cell) ? el('input', { type: 'checkbox', 'aria-label': `compare ${plainName(cell)}`, checked: picked.includes(cell.id), onchange: () => toggleSelected(cell.id) }) : ''),
    el('td', { class: 'cell-col' }, [
      el('span', { class: 'nowrap' }, [harnessMark(markOf(cell)), cell.model]),
      isDone(cell) && cell.loopIds.length ? el('a', { class: 'row-link', href: `diff.html#a=loop:${cell.loopIds[0]}&b=pr:${cell.ticket}`, title: 'files and diff against the merged PR' }, 'diff') : null,
      el('span', { class: 'spread', title: cell.effort }, [cell.harness, ...varying.map((facet) => facet.of(cell))].join(' · ')),
    ]),
    ...COLUMNS.map((column) => el('td', { class: 'num', 'data-label': column.label }, isDone(cell) && column.value(cell) != null ? column.node(cell) : '–')),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data matrix' }, [el('thead', {}, head), el('tbody', {}, body)]));
}

function comparePanel() {
  const cells = selected().map((id) => bench.cells.find((cell) => cell.id === id)).filter(Boolean);
  if (cells.length < 2) {
    return el('div', { class: 'compare-bar' }, [el('span', { class: 'dim' }, `Tick ${cells.length ? 'one more setup' : '2 to 4 setups'} to compare them side by side.`)]);
  }
  const [reference] = cells;
  const head = el('tr', {}, [el('th', {}, 'measure'), ...cells.map((cell, i) => el('th', { class: 'num' }, [modelCell(cell), el('div', { class: 'dim' }, `${labelOf(TASKS, cell.station)} · ${contextLabel(cell)}${i === 0 ? ' · compared against' : ''}`)]))]);
  const deltaOf = (metric, cell) => (metric.value(cell) != null && metric.value(reference) != null ? metric.value(cell) - metric.value(reference) : null);
  const rows = METRICS.map((metric) => {
    const bound = niceBound(cells.slice(1).map((cell) => deltaOf(metric, cell)));
    return el('tr', {}, [
      el('td', { title: metric.label }, [PLAIN_MEASURE_LABEL[metric.key] ?? metric.label, metric.better ? el('span', { class: 'dim' }, ` (${metric.better} better)`) : null]),
      ...cells.map((cell, i) => {
        const delta = deltaOf(metric, cell);
        return el('td', { class: 'num' }, [
          metricNode(metric, cell),
          i === 0 || delta == null ? null : el('span', { class: `spread ${deltaClass(metric, delta)}` }, signed(delta, metric.format)),
          i === 0 || delta == null ? null : deltaBar(metric, delta, bound),
        ]);
      }),
    ]);
  });
  return panel(`COMPARING ${cells.length} SETUPS · DIFFERENCES FROM THE FIRST`,
    el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, rows)])),
    el('div', { class: 'filters' }, [el('a', { href: `diff.html#cells=${encodeURIComponent(cells.slice(0, 2).map((cell) => cell.id).join(','))}` }, 'open the files and changes of the first two'), el('button', { onclick: () => { state.sel = ''; render(); } }, '[clear]'), el('span', { class: 'dim' }, 'The URL holds this comparison; copy it to share.')]));
}

function render() {
  writeHash(state);
  const rows = sortedRows();
  const singleRun = rows.filter(isDone).every((cell) => cell.runs <= 1);
  const shared = DESCRIBED.filter((facet) => rows.length > 1 && unique(rows.map(facet.of)).length === 1);
  const varying = DESCRIBED.filter((facet) => !shared.includes(facet));
  mount(app,
    el('p', { class: 'dim' }, 'This is the raw table for people who want every number. Each row is one setup: a task, a model, a knowledge base choice and a ticket, with the results of all its runs. Click a column heading to sort; hover a heading for the technical name. Dimmed rows are beaten by another setup that is at least as cheap, as fast and as well reviewed, and better on one of those.'),
    singleRun ? el('div', { class: 'note' }, 'Every setup shown has one run. A single run cannot tell a good model from a lucky one: read differences as hints.') : null,
    comparePanel(),
    panel(`${rows.length} SETUPS`, filterBar(),
      shared.length ? el('p', { class: 'dim' }, `Every row shown: ${shared.map((facet) => facet.of(rows[0])).join(' · ')}.`) : null,
      matrixTable(rows, varying)),
  );
}

render();
