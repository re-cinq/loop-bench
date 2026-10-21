// Cost against quality per cell: the top-left corner is cheap and well judged, and the dashed line joins the cells nothing beats.
import { mountChrome } from './chrome.js';
import { el, contextLabel, header, isDone, markOf, loadBench, meanOf, minutes, money, one, panel, readHash, svg, unique, writeHash, mount } from './lib.js';
import { extent, point, scale, xAxis, yAxis } from './plot.js';

const WIDTH = 860;
const HEIGHT = 480;
const MARGIN = { top: 28, right: 24, bottom: 44, left: 52 };
const X_AXES = {
  cost: { label: 'cost per loop', value: (c) => meanOf(c.costUsd), format: money },
  time: { label: 'time per loop', value: (c) => meanOf(c.minutes), format: minutes },
};

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('COST VS QUALITY'));
const app = document.getElementById('app');
const state = { x: 'cost', ...readHash() };

/** Cells no other shown cell beats on both the x value and the judge mean, left to right. */
function frontier(points) {
  const byX = [...points].sort((a, b) => a.xv - b.xv || b.judge - a.judge);
  let best = -Infinity;
  return byX.filter((p) => {
    if (p.judge <= best) return false;
    best = p.judge;
    return true;
  });
}

function scatter(cells, axis) {
  const points = cells.flatMap((cell) => {
    const xv = axis.value(cell);
    return xv == null || cell.judgeMean == null ? [] : [{ cell, xv, judge: cell.judgeMean }];
  });
  if (!points.length) return el('div', { class: 'note' }, 'No judged loops to plot yet.');
  const xDomain = extent(points.map((p) => p.xv), { zero: true });
  const yDomain = [Math.min(3, ...points.map((p) => p.judge)) - 0.2, 5.2];
  const x = scale(xDomain, [MARGIN.left, WIDTH - MARGIN.right]);
  const y = scale(yDomain, [HEIGHT - MARGIN.bottom, MARGIN.top]);
  const front = frontier(points);

  return svg('svg', { class: 'plot', viewBox: `0 0 ${WIDTH} ${HEIGHT}`, role: 'img', 'aria-label': `judge mean against ${axis.label} for ${points.length} cells` }, [
    yAxis({ y, domain: yDomain, left: MARGIN.left, right: WIDTH - MARGIN.right, format: one, label: 'judge mean (1–5)' }),
    xAxis({ x, domain: xDomain, top: MARGIN.top, bottom: HEIGHT - MARGIN.bottom, format: axis.format, label: axis.label, right: WIDTH - MARGIN.right }),
    svg('polyline', { points: front.map((p) => `${x(p.xv)},${y(p.judge)}`).join(' '), fill: 'none', stroke: 'var(--accent)', 'stroke-dasharray': '4 3', opacity: 0.7 }),
    ...points.map((p) => point({
      cx: x(p.xv), cy: y(p.judge), harness: markOf(p.cell), context: p.cell.context,
      title: `${p.cell.model} · ${p.cell.station} · ${contextLabel(p.cell)}\n${axis.label} ${axis.format(p.xv)} · judge ${one(p.judge)}`,
    })),
    ...front.map((p) => svg('text', { x: x(p.xv) + 8, y: y(p.judge) - 6 }, p.cell.model)),
  ]);
}

function legend() {
  const item = (harness, context, text) => el('span', { class: 'legend-item' }, [
    svg('svg', { width: 14, height: 14, viewBox: '0 0 14 14', class: 'plot' }, point({ cx: 7, cy: 7, harness, context, r: 4.5 })), text,
  ]);
  return el('div', { class: 'legend' }, [item('claude', 'lore-mcp', 'claude'), item('codex', 'lore-mcp', 'codex'), item('gemini', 'lore-mcp', 'gemini'), item('glm', 'lore-mcp', 'glm (claude CLI)'), item('codex', 'none', 'hollow = no KB'), item('codex', 'lore-mcp', 'solid = Lore'), item('codex', 'lore-utopia', 'faded = Lore on Utopia'), el('span', { class: 'legend-item accent' }, '- - - nothing beats these')]);
}

function render() {
  writeHash(state);
  const cells = bench.cells.filter(isDone).filter((cell) => (!state.station || cell.station === state.station) && (!state.context || cell.context === state.context));
  const select = (key, label, options) => el('label', {}, [label, el('select', { onchange: (e) => { state[key] = e.target.value; render(); } },
    options.map(([value, text]) => el('option', { value, selected: (state[key] ?? '') === value }, text)))]);

  mount(app,
    el('p', { class: 'dim' }, 'Each mark is one cell. Up is better judged (mean of correctness, completeness and closeness), left is cheaper or faster. Hover a mark for its numbers.'),
    panel('TRADE-OFF',
      el('div', { class: 'filters' }, [
        select('x', 'x axis', Object.entries(X_AXES).map(([key, axis]) => [key, axis.label])),
        select('station', 'station', [['', 'all'], ...unique(bench.cells.map((c) => c.station)).map((s) => [s, s])]),
        select('context', 'knowledge base', [['', 'all'], ['none', 'no KB'], ['lore-mcp', 'Lore'], ['lore-utopia', 'Lore on Utopia']]),
      ]),
      scatter(cells, X_AXES[state.x] ?? X_AXES.cost),
      legend()),
  );
}

render();
