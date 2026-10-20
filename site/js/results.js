// The full matrix: filter by any facet, sort by any metric, tick 2–4 cells to compare them side by side.
import { mountChrome } from './chrome.js';
import { cellName, deltaBar, deltaClass, el, harnessMark, header, isDone, loadBench, meanOf, METRICS, metricNode, modelCell, mount, niceBound, one, panel, readHash, signed, spreadNode, two, unique, whole, writeHash } from './lib.js';

const MAX_COMPARED = 4;
const effortLevel = (cell) => cell.effort.replace(/ \(.*\)$/, '');
const FACETS = [
  { key: 'ticket', label: 'ticket', of: (c) => `#${c.ticket}` },
  { key: 'station', label: 'station', of: (c) => c.station },
  { key: 'harness', label: 'harness', of: (c) => c.harness },
  { key: 'lore', label: 'lore', of: (c) => (c.lore ? 'with' : 'without') },
  { key: 'effort', label: 'effort', of: (c) => effortLevel(c) },
  { key: 'prompt', label: 'prompt', of: (c) => c.prompt },
];
/** The facets a row's second line names; one shared by every shown row moves to the caption instead. */
const DESCRIBED = [
  { key: 'station', of: (c) => c.station },
  { key: 'effort', of: (c) => `${effortLevel(c)} effort` },
  { key: 'prompt', of: (c) => `${c.prompt} prompt` },
  { key: 'lore', of: (c) => (c.lore ? 'with Lore' : 'no Lore') },
  { key: 'runs', of: (c) => (isDone(c) ? `${c.runs} run${c.runs === 1 ? '' : 's'}` : c.status) },
];
const metric = (key) => METRICS.find((m) => m.key === key);
const percent = (passed, of) => `${Math.round((passed / of) * 100)}%`;
/** Eight columns instead of seventeen: related metrics share a column, sorted by the one that decides. */
const COLUMNS = [
  {
    key: 'green', label: 'green', title: 'loops that reached green CI; below, dod tests red on base and green with the merged code', better: 'higher', value: metric('green').value,
    node: (c) => [percent(c.reachedGreen, c.runs), c.redToGreen ? el('span', { class: 'spread' }, `dod ${percent(c.redToGreen.passed, c.redToGreen.of)}`) : null],
  },
  { ...metric('rounds'), node: (c) => metricNode(metric('rounds'), c) },
  { ...metric('cost'), label: 'cost', node: (c) => metricNode(metric('cost'), c) },
  { ...metric('time'), label: 'time', node: (c) => metricNode(metric('time'), c) },
  {
    key: 'judge', label: 'judge', title: 'correct / complete / close to the PR, 1–5; sorted by their mean', better: 'higher', value: (c) => c.judgeMean,
    node: (c) => [[c.correctness, c.completeness, c.closeness].map((spread) => whole(meanOf(spread))).join(' / '), el('span', { class: 'spread' }, `mean ${one(c.judgeMean)}`)],
  },
  {
    key: 'files', label: 'files', title: 'files changed; below, Jaccard overlap with the merged PR\'s files; sorted by overlap', better: 'higher', value: metric('jaccard').value,
    node: (c) => [spreadNode(c.files, whole), el('span', { class: 'spread' }, `J ${two(meanOf(c.jaccard))}`)],
  },
];

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('RESULTS MATRIX'));
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
  return el('div', { class: 'filters' }, [...FACETS.map(facetSelect), toggle('dominated', 'hide', 'hide dominated'), toggle('pending', 'show', 'show not-yet-run')]);
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
  const head = el('tr', {}, [el('th', {}, ''), el('th', {}, 'cell'), ...COLUMNS.map(sortHeader)]);
  const body = rows.map((cell) => el('tr', { class: [cell.dominated ? 'dominated' : '', isDone(cell) ? '' : 'pending', picked.includes(cell.id) ? 'row-sel' : ''].join(' ').trim(), title: cell.dominated ? 'dominated: another cell of this station is as cheap, as fast and as well judged, and better on one' : '' }, [
    el('td', {}, isDone(cell) ? el('input', { type: 'checkbox', 'aria-label': `compare ${cellName(cell)}`, checked: picked.includes(cell.id), onchange: () => toggleSelected(cell.id) }) : ''),
    el('td', { class: 'cell-col' }, [
      el('span', { class: 'nowrap' }, [harnessMark(cell.harness), cell.model]),
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
    return el('div', { class: 'compare-bar' }, [el('span', { class: 'dim' }, `Tick ${cells.length ? 'one more cell' : '2 to 4 cells'} to compare them side by side.`)]);
  }
  const [reference] = cells;
  const head = el('tr', {}, [el('th', {}, 'metric'), ...cells.map((cell, i) => el('th', { class: 'num' }, [modelCell(cell), el('div', { class: 'dim' }, `${cell.station} · ${cell.lore ? 'with' : 'no'} Lore${i === 0 ? ' · reference' : ''}`)]))]);
  const deltaOf = (metric, cell) => (metric.value(cell) != null && metric.value(reference) != null ? metric.value(cell) - metric.value(reference) : null);
  const rows = METRICS.map((metric) => {
    const bound = niceBound(cells.slice(1).map((cell) => deltaOf(metric, cell)));
    return el('tr', {}, [
      el('td', {}, [metric.label, metric.better ? el('span', { class: 'dim' }, ` (${metric.better} better)`) : null]),
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
  return panel(`COMPARING ${cells.length} CELLS · DELTAS AGAINST THE FIRST`,
    el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, rows)])),
    el('div', { class: 'filters' }, [el('a', { href: `diff.html#cells=${encodeURIComponent(cells.slice(0, 2).map((cell) => cell.id).join(','))}` }, 'open files & diffs of the first two'), el('button', { onclick: () => { state.sel = ''; render(); } }, '[clear]'), el('span', { class: 'dim' }, 'The URL holds this comparison; copy it to share.')]));
}

function render() {
  writeHash(state);
  const rows = sortedRows();
  const singleRun = rows.filter(isDone).every((cell) => cell.runs <= 1);
  const shared = DESCRIBED.filter((facet) => rows.length > 1 && unique(rows.map(facet.of)).length === 1);
  const varying = DESCRIBED.filter((facet) => !shared.includes(facet));
  mount(app,
    el('p', { class: 'dim' }, 'One row per cell: one station varied against the production baseline, every other station at baseline. Click a column to sort. Dimmed rows are dominated: another cell of the same station is at least as cheap, as fast and as well judged, and better on one of them.'),
    singleRun ? el('div', { class: 'note' }, 'Every cell shown has one run. A single run cannot tell a model from a lucky draw: read differences as hypotheses until repeats add spread.') : null,
    comparePanel(),
    panel(`${rows.length} CELLS`, filterBar(),
      shared.length ? el('p', { class: 'dim' }, `Every row shown: ${shared.map((facet) => facet.of(rows[0])).join(' · ')}.`) : null,
      matrixTable(rows, varying)),
  );
}

render();
