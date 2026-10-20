// Shared helpers for every page: DOM building, number formatting, and the facets a cell is filtered by.
export async function loadBench() {
  const res = await fetch('data/bench.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`fetch data/bench.json: ${res.status}`);
  return res.json();
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v != null && v !== false) node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
export function svg(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) node.setAttribute(k, v);
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

/** Replaces a container's content, skipping the sections a page leaves out (null or false). */
export function mount(container, ...nodes) {
  container.replaceChildren(...nodes.filter(Boolean));
}

export function panel(title, ...children) {
  const box = el('div', { class: 'panel' });
  if (title) box.append(el('div', { class: 'panel-head' }, el('span', {}, title)));
  for (const child of children) if (child) box.append(child);
  return box;
}

export function header(title) {
  const inner = Math.max(title.length + 4, 32);
  const node = el('div', { class: 'header-box' });
  node.append('╔' + '═'.repeat(inner) + '╗\n║  ', el('span', { class: 'title' }, title), ' '.repeat(inner - 2 - title.length) + '║\n╚' + '═'.repeat(inner) + '╝');
  return node;
}

export const money = (v) => (v == null ? '–' : `$${v.toFixed(2)}`);
export const minutes = (v) => (v == null ? '–' : `${v.toFixed(1)} min`);
export const one = (v) => (v == null ? '–' : v.toFixed(1));
export const two = (v) => (v == null ? '–' : v.toFixed(2));
export const whole = (v) => (v == null ? '–' : String(Math.round(v)));
export const signed = (v, format) => (v == null ? '–' : `${v > 0 ? '+' : v < 0 ? '−' : '±'}${format(Math.abs(v))}`);

/** The mean, with min–max beneath it once a cell has more than one run. */
export function spreadNode(spread, format) {
  if (!spread) return '–';
  if (spread.n === 1) return format(spread.mean);
  return el('span', {}, [format(spread.mean), el('span', { class: 'spread' }, `${format(spread.min)}–${format(spread.max)} · n=${spread.n}`)]);
}

export const harnessMark = (harness) => el('span', { class: `harness harness-${harness}`, title: harness, 'aria-hidden': 'true' });
export const loreTag = (lore) => el('span', { class: `lore-tag ${lore ? 'on' : ''}` }, lore ? 'with Lore' : 'no Lore');

export function modelCell(cell) {
  return el('span', { class: 'nowrap' }, [harnessMark(cell.harness), cell.model, el('span', { class: 'dim' }, ` (${cell.harness})`)]);
}

export const cellName = (cell) => `${cell.model} · ${cell.station} · ${cell.lore ? 'with Lore' : 'no Lore'}${cell.prompt === 'baseline' ? '' : ` · ${cell.prompt}`}`;
export const isDone = (cell) => cell.status === 'done';
export const unique = (values) => [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
export const meanOf = (spread) => spread?.mean ?? null;

/** Every metric a cell is compared on, with the direction that counts as better. */
export const METRICS = [
  { key: 'green', label: 'reached green', value: (c) => (c.runs ? c.reachedGreen / c.runs : null), format: (v) => `${Math.round(v * 100)}%`, better: 'higher' },
  { key: 'rounds', label: 'rounds', value: (c) => meanOf(c.rounds), spread: (c) => c.rounds, format: one, better: 'lower' },
  { key: 'cost', label: 'cost / loop', value: (c) => meanOf(c.costUsd), spread: (c) => c.costUsd, format: money, better: 'lower' },
  { key: 'time', label: 'time / loop', value: (c) => meanOf(c.minutes), spread: (c) => c.minutes, format: minutes, better: 'lower' },
  { key: 'correct', label: 'judge correct', value: (c) => meanOf(c.correctness), spread: (c) => c.correctness, format: one, better: 'higher' },
  { key: 'complete', label: 'judge complete', value: (c) => meanOf(c.completeness), spread: (c) => c.completeness, format: one, better: 'higher' },
  { key: 'close', label: 'judge close', value: (c) => meanOf(c.closeness), spread: (c) => c.closeness, format: one, better: 'higher' },
  { key: 'redgreen', label: 'dod red→green', value: (c) => (c.redToGreen ? c.redToGreen.passed / c.redToGreen.of : null), format: (v) => `${Math.round(v * 100)}%`, better: 'higher' },
  { key: 'files', label: 'files', value: (c) => meanOf(c.files), spread: (c) => c.files, format: whole, better: null },
  { key: 'jaccard', label: 'jaccard vs PR', value: (c) => meanOf(c.jaccard), spread: (c) => c.jaccard, format: two, better: 'higher' },
];

export function metricNode(metric, cell) {
  const value = metric.value(cell);
  if (value == null) return '–';
  return metric.spread ? spreadNode(metric.spread(cell), metric.format) : metric.format(value);
}

/** Green when the change is better on this metric, red when worse, dim when the metric has no better side. */
export function deltaClass(metric, delta) {
  if (delta == null || Math.abs(delta) < 1e-9 || !metric.better) return 'delta-zero';
  return (delta > 0) === (metric.better === 'higher') ? 'delta-pos' : 'delta-neg';
}

/** Page state in the URL hash (`#station=dod&lore=on`), so a filtered view or comparison is a shareable link. */
export function readHash() {
  return Object.fromEntries(new URLSearchParams(location.hash.slice(1)));
}

export function writeHash(state) {
  const params = new URLSearchParams(Object.entries(state).filter(([, v]) => v != null && v !== ''));
  history.replaceState(null, '', `${location.pathname}${location.search}${params.size ? `#${params}` : ''}`);
}

/** A round bound for a symmetric scale: the largest |delta| shown, rounded up to 1, 2 or 5 times a power of ten. */
export function niceBound(deltas) {
  const largest = Math.max(...deltas.filter((d) => d != null).map(Math.abs), 0);
  if (largest === 0) return 1;
  const power = 10 ** Math.floor(Math.log10(largest));
  return [1, 2, 5, 10].map((step) => step * power).find((bound) => bound >= largest);
}

/** The change as a dot on a bar centred on zero, coloured by whether it is better on this metric, with the scale's ends and centre beneath. */
export function deltaBar(metric, delta, bound) {
  const at = (value) => `${50 + (value / bound) * 50}%`;
  const ticks = [-1, -0.5, 0.5, 1].map((share) => el('div', { class: 'tick', style: `left: ${at(share * bound)}` }));
  return el('div', {}, [
    el('div', { class: 'delta-bar', title: `${signed(delta, metric.format)} (scale ±${metric.format(bound)})` }, [
      ...ticks,
      el('div', { class: 'tick center', style: 'left: 50%' }),
      el('div', { class: `marker ${{ 'delta-pos': 'pos', 'delta-neg': 'neg', 'delta-zero': 'zero' }[deltaClass(metric, delta)]}`, style: `left: ${at(delta)}` }),
    ]),
    el('div', { class: 'delta-bar-scale' }, [el('span', {}, `−${metric.format(bound)}`), el('span', {}, '0'), el('span', {}, `+${metric.format(bound)}`)]),
  ]);
}
