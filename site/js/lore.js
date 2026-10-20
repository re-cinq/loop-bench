// With vs without Lore: one slope per model and metric, then the paired deltas as a table.
import { mountChrome } from './chrome.js';
import { deltaBar, deltaClass, el, header, harnessMark, loadBench, METRICS, metricNode, niceBound, panel, readHash, signed, svg, unique, writeHash, mount } from './lib.js';
import { extent, point, scale, yAxis } from './plot.js';

const SLOPE_METRICS = ['cost', 'time', 'rounds', 'correct', 'complete', 'close'].map((key) => METRICS.find((m) => m.key === key));
const WIDTH = 900;
const HEIGHT = 440;
const MARGIN = { top: 24, right: 330, bottom: 30, left: 72 };
const LABEL_LINE = 14;
const ALL = 'all';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('LORE ON VS OFF'));
const app = document.getElementById('app');
const byId = new Map(bench.cells.map((cell) => [cell.id, cell]));
const stations = unique(bench.lorePairs.map((pair) => pair.station));
const state = { metric: 'cost', station: stations[0] ?? ALL, ...readHash() };

const pairsShown = () => bench.lorePairs
  .filter((pair) => state.station === ALL || pair.station === state.station)
  .map((pair) => ({ ...pair, off: byId.get(pair.without), on: byId.get(pair.with) }));

/** Pushes labels apart top to bottom so each sits at least one line below the one above it. */
function spacedLabels(labels) {
  let floor = -Infinity;
  return [...labels].sort((a, b) => a.y - b.y).map((label) => {
    floor = Math.max(label.y, floor + LABEL_LINE);
    return { ...label, y: floor };
  });
}

/** One metric, drawn large: a line per model from without Lore to with it, labelled with the model and its change. Hovering a model fades the others. */
function slopeChart(metric, pairs) {
  const lines = pairs.flatMap((pair) => {
    const [off, on] = [metric.value(pair.off), metric.value(pair.on)];
    return off == null || on == null ? [] : [{ pair, off, on }];
  });
  if (!lines.length) return el('div', { class: 'note' }, `No paired model has a ${metric.label} value.`);
  const domain = extent(lines.flatMap((line) => [line.off, line.on]), { zero: ['cost', 'time', 'rounds'].includes(metric.key) });
  const y = scale(domain, [HEIGHT - MARGIN.bottom, MARGIN.top]);
  const [xOff, xOn] = [MARGIN.left + 20, WIDTH - MARGIN.right];
  const improved = lines.filter((line) => deltaClass(metric, line.on - line.off) === 'delta-pos').length;
  const worse = lines.filter((line) => deltaClass(metric, line.on - line.off) === 'delta-neg').length;
  const nameOf = (pair) => (state.station === ALL ? `${pair.model} · ${pair.station}` : pair.model);
  const labels = spacedLabels(lines.map((line) => ({ line, y: y(line.on) })));
  const labelY = new Map(labels.map((label) => [label.line, label.y]));

  const plot = svg('svg', { class: 'plot slopes', viewBox: `0 0 ${WIDTH} ${Math.max(HEIGHT, ...labels.map((label) => label.y + 10))}`, role: 'img', 'aria-label': `${metric.label} without and with Lore for ${lines.length} models` }, [
    yAxis({ y, domain, left: MARGIN.left, right: xOn + 6, format: metric.format }),
    svg('text', { x: xOff, y: HEIGHT - 8, 'text-anchor': 'middle' }, 'no Lore'),
    svg('text', { x: xOn, y: HEIGHT - 8, 'text-anchor': 'middle' }, 'with Lore'),
    ...lines.map((line) => {
      const { pair, off, on } = line;
      const delta = on - off;
      const title = `${nameOf(pair)}: ${metric.format(off)} → ${metric.format(on)}`;
      const ly = labelY.get(line);
      return svg('g', { class: 'model' }, [
        svg('title', {}, title),
        svg('line', { class: `slope pt-${pair.harness}`, x1: xOff, y1: y(off), x2: xOn, y2: y(on) }),
        point({ cx: xOff, cy: y(off), harness: pair.harness, hollow: true, r: 4.5 }),
        point({ cx: xOn, cy: y(on), harness: pair.harness, hollow: false, r: 4.5 }),
        Math.abs(ly - y(on)) > 1 ? svg('line', { class: 'leader', x1: xOn + 6, y1: y(on), x2: xOn + 14, y2: ly }) : null,
        svg('text', { class: 'slope-label', x: xOn + 16, y: ly + 4 }, [
          `${nameOf(pair)}  ${metric.format(on)} `,
          svg('tspan', { class: deltaClass(metric, delta) }, signed(delta, metric.format)),
        ]),
      ]);
    }),
  ]);
  return el('div', {}, [
    el('div', { class: 'slope-wrap' }, plot),
    el('div', { class: 'dim' }, [el('span', { class: 'delta-pos' }, `${improved} better`), ' · ', el('span', { class: 'delta-neg' }, `${worse} worse`), ` · ${lines.length - improved - worse} unchanged with Lore. Hover a line or its label to pick it out.`]),
  ]);
}

function metricTabs() {
  return el('div', { class: 'filters' }, SLOPE_METRICS.map((metric) => el('button', {
    class: state.metric === metric.key ? 'active' : '',
    onclick: () => { state.metric = metric.key; render(); },
  }, `${metric.label}${metric.better ? ` (${metric.better} better)` : ''}`)));
}

function deltaTable(pairs) {
  const head = el('tr', {}, [el('th', {}, 'model'), el('th', {}, 'station'), ...SLOPE_METRICS.map((metric) => el('th', { class: 'num' }, metric.label))]);
  const deltaOf = (metric, pair) => {
    const [off, on] = [metric.value(pair.off), metric.value(pair.on)];
    return off == null || on == null ? null : on - off;
  };
  const bounds = new Map(SLOPE_METRICS.map((metric) => [metric.key, niceBound(pairs.map((pair) => deltaOf(metric, pair)))]));
  const rows = pairs.map((pair) => el('tr', {}, [
    el('td', { class: 'nowrap' }, [harnessMark(pair.harness), pair.model]),
    el('td', {}, pair.station),
    ...SLOPE_METRICS.map((metric) => {
      const delta = deltaOf(metric, pair);
      return el('td', { class: 'num' }, [
        metricNode(metric, pair.on),
        el('span', { class: `spread ${deltaClass(metric, delta)}` }, signed(delta, metric.format)),
        delta == null ? null : deltaBar(metric, delta, bounds.get(metric.key)),
      ]);
    }),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, rows)]));
}

function render() {
  writeHash(state);
  const pairs = pairsShown();
  const stationPick = el('label', {}, ['station', el('select', { onchange: (e) => { state.station = e.target.value; render(); } }, [
    ...stations.map((s) => el('option', { value: s, selected: state.station === s }, s)), el('option', { value: ALL, selected: state.station === ALL }, 'all (scales mix)'),
  ])]);

  mount(app,
    el('p', { class: 'dim' }, 'Each line is one model run twice: once without the Lore MCP server (hollow, left) and once with it (filled, right). Every station of a with-Lore loop has Lore, so a difference is Lore\'s effect on the whole loop, not on the varied station alone.'),
    pairs.length
      ? null
      : el('div', { class: 'note' }, 'No model has finished both a with-Lore and a without-Lore loop yet.'),
    el('div', { class: 'filters' }, [stationPick, el('span', { class: 'dim' }, `${pairs.length} paired models`)]),
    pairs.length ? panel('SLOPES', metricTabs(), slopeChart(SLOPE_METRICS.find((metric) => metric.key === state.metric) ?? SLOPE_METRICS[0], pairs)) : null,
    pairs.length ? panel('WITH LORE, AND THE CHANGE FROM WITHOUT', deltaTable(pairs)) : null,
  );
}

render();
