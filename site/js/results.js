// The full matrix: filter by any facet, sort by any metric, tick 2–4 cells to compare them side by side.
import { mountChrome } from './chrome.js';
import { cellName, deltaClass, el, header, isDone, loadBench, loreTag, METRICS, metricNode, modelCell, panel, readHash, signed, unique, writeHash, mount } from './lib.js';

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
  const metric = METRICS.find((m) => m.key === state.sort);
  const sign = state.dir === 'asc' ? 1 : -1;
  const valueOf = (cell) => (metric ? metric.value(cell) : null);
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

function sortHeader(metric) {
  const active = state.sort === metric.key;
  const arrow = active ? (state.dir === 'asc' ? ' ▲' : ' ▼') : '';
  return el('th', {
    class: 'num sortable',
    title: metric.better ? `${metric.better} is better` : '',
    onclick: () => {
      state.dir = active && state.dir === 'asc' ? 'desc' : 'asc';
      state.sort = metric.key;
      render();
    },
  }, metric.label + arrow);
}

function toggleSelected(id) {
  const current = selected();
  const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id].slice(-MAX_COMPARED);
  state.sel = next.join(',');
  render();
}

function matrixTable(rows) {
  const picked = selected();
  const head = el('tr', {}, [el('th', {}, 'cmp'), el('th', {}, 'model'), el('th', {}, 'station'), el('th', {}, 'lore'), el('th', {}, 'effort'), el('th', {}, 'prompt'), el('th', { class: 'num' }, 'runs'), ...METRICS.map(sortHeader)]);
  const body = rows.map((cell) => el('tr', { class: [cell.dominated ? 'dominated' : '', isDone(cell) ? '' : 'pending', picked.includes(cell.id) ? 'row-sel' : ''].join(' ').trim(), title: cell.dominated ? 'dominated: another cell of this station is as cheap, as fast and as well judged, and better on one' : '' }, [
    el('td', {}, isDone(cell) ? el('input', { type: 'checkbox', 'aria-label': `compare ${cellName(cell)}`, checked: picked.includes(cell.id), onchange: () => toggleSelected(cell.id) }) : ''),
    el('td', {}, [modelCell(cell), isDone(cell) && cell.loopIds.length ? el('a', { class: 'row-link', href: `diff.html#a=loop:${cell.loopIds[0]}&b=pr:${cell.ticket}`, title: 'files and diff against the merged PR' }, 'diff') : null]),
    el('td', {}, cell.station),
    el('td', {}, loreTag(cell.lore)),
    el('td', { class: 'dim', title: cell.effort }, effortLevel(cell)),
    el('td', { class: 'dim' }, cell.prompt),
    el('td', { class: 'num' }, isDone(cell) ? cell.runs : cell.status),
    ...METRICS.map((metric) => el('td', { class: 'num' }, metricNode(metric, cell))),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, body)]));
}

function comparePanel() {
  const cells = selected().map((id) => bench.cells.find((cell) => cell.id === id)).filter(Boolean);
  if (cells.length < 2) {
    return el('div', { class: 'compare-bar' }, [el('span', { class: 'dim' }, `Tick ${cells.length ? 'one more cell' : '2 to 4 cells'} to compare them side by side.`)]);
  }
  const [reference] = cells;
  const head = el('tr', {}, [el('th', {}, 'metric'), ...cells.map((cell, i) => el('th', { class: 'num' }, [modelCell(cell), el('div', { class: 'dim' }, `${cell.station} · ${cell.lore ? 'with' : 'no'} Lore${i === 0 ? ' · reference' : ''}`)]))]);
  const rows = METRICS.map((metric) => el('tr', {}, [
    el('td', {}, [metric.label, metric.better ? el('span', { class: 'dim' }, ` (${metric.better} better)`) : null]),
    ...cells.map((cell, i) => {
      const delta = metric.value(cell) != null && metric.value(reference) != null ? metric.value(cell) - metric.value(reference) : null;
      return el('td', { class: 'num' }, [metricNode(metric, cell), i === 0 || delta == null ? null : el('span', { class: `spread ${deltaClass(metric, delta)}` }, signed(delta, metric.format))]);
    }),
  ]));
  return panel(`COMPARING ${cells.length} CELLS · DELTAS AGAINST THE FIRST`,
    el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, rows)])),
    el('div', { class: 'filters' }, [el('a', { href: `diff.html#cells=${encodeURIComponent(cells.slice(0, 2).map((cell) => cell.id).join(','))}` }, 'open files & diffs of the first two'), el('button', { onclick: () => { state.sel = ''; render(); } }, '[clear]'), el('span', { class: 'dim' }, 'The URL holds this comparison; copy it to share.')]));
}

function render() {
  writeHash(state);
  const rows = sortedRows();
  const singleRun = rows.filter(isDone).every((cell) => cell.runs <= 1);
  mount(app,
    el('p', { class: 'dim' }, 'One row per cell: one station varied against the production baseline, every other station at baseline. Click a column to sort. Dimmed rows are dominated: another cell of the same station is at least as cheap, as fast and as well judged, and better on one of them.'),
    singleRun ? el('div', { class: 'note' }, 'Every cell shown has one run. A single run cannot tell a model from a lucky draw: read differences as hypotheses until repeats add spread.') : null,
    comparePanel(),
    panel(`${rows.length} CELLS`, filterBar(), matrixTable(rows)),
  );
}

render();
