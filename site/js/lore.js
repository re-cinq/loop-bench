// With vs without Lore: one slope per model and metric, then the paired deltas as a table.
import { mountChrome } from './chrome.js';
import { deltaClass, el, header, harnessMark, loadBench, METRICS, metricNode, panel, readHash, signed, svg, unique, writeHash, mount } from './lib.js';
import { extent, point, scale, yAxis } from './plot.js';

const SLOPE_METRICS = ['cost', 'time', 'rounds', 'correct', 'complete', 'close'].map((key) => METRICS.find((m) => m.key === key));
const WIDTH = 320;
const HEIGHT = 260;
const MARGIN = { top: 24, right: 118, bottom: 26, left: 64 };

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('LORE ON VS OFF'));
const app = document.getElementById('app');
const byId = new Map(bench.cells.map((cell) => [cell.id, cell]));
const state = readHash();

const pairsShown = () => bench.lorePairs
  .filter((pair) => !state.station || pair.station === state.station)
  .map((pair) => ({ ...pair, off: byId.get(pair.without), on: byId.get(pair.with) }));

/** Pushes labels apart top to bottom so each sits at least one line below the one above it. */
function spacedLabels(labels) {
  const LINE = 10;
  let floor = -Infinity;
  return [...labels].sort((a, b) => a.y - b.y).map((label) => {
    floor = Math.max(label.y, floor + LINE);
    return { ...label, y: floor };
  });
}

function slopeChart(metric, pairs) {
  const lines = pairs.flatMap((pair) => {
    const [off, on] = [metric.value(pair.off), metric.value(pair.on)];
    return off == null || on == null ? [] : [{ pair, off, on }];
  });
  if (!lines.length) return null;
  const domain = extent(lines.flatMap((line) => [line.off, line.on]), { zero: ['cost', 'time', 'rounds'].includes(metric.key) });
  const y = scale(domain, [HEIGHT - MARGIN.bottom, MARGIN.top]);
  const [xOff, xOn] = [MARGIN.left + 10, WIDTH - MARGIN.right];
  const improved = lines.filter((line) => deltaClass(metric, line.on - line.off) === 'delta-pos').length;
  const worse = lines.filter((line) => deltaClass(metric, line.on - line.off) === 'delta-neg').length;

  const labels = spacedLabels(lines.map((line) => ({ text: line.pair.model, y: y(line.on) })));
  const plot = svg('svg', { class: 'plot', viewBox: `0 0 ${WIDTH} ${Math.max(HEIGHT, ...labels.map((label) => label.y + 8))}`, role: 'img', 'aria-label': `${metric.label} without and with Lore for ${lines.length} models` }, [
    yAxis({ y, domain, left: MARGIN.left, right: WIDTH - MARGIN.right + 6, format: metric.format }),
    svg('text', { x: xOff, y: HEIGHT - 6, 'text-anchor': 'middle' }, 'no Lore'),
    svg('text', { x: xOn, y: HEIGHT - 6, 'text-anchor': 'middle' }, 'with Lore'),
    ...lines.flatMap(({ pair, off, on }) => {
      const title = `${pair.model} (${pair.station}): ${metric.format(off)} → ${metric.format(on)}`;
      return [
        svg('line', { class: `slope pt-${pair.harness}`, x1: xOff, y1: y(off), x2: xOn, y2: y(on) }, svg('title', {}, title)),
        point({ cx: xOff, cy: y(off), harness: pair.harness, hollow: true, r: 3.5, title }),
        point({ cx: xOn, cy: y(on), harness: pair.harness, hollow: false, r: 3.5, title }),
      ];
    }),
    ...labels.map((label) => svg('text', { x: xOn + 8, y: label.y + 3 }, label.text)),
  ]);
  return el('div', {}, [
    el('h4', {}, `${metric.label} ${metric.better ? `(${metric.better} is better)` : ''}`),
    plot,
    el('div', { class: 'dim' }, [el('span', { class: 'delta-pos' }, `${improved} better`), ' · ', el('span', { class: 'delta-neg' }, `${worse} worse`), ` · ${lines.length - improved - worse} unchanged with Lore`]),
  ]);
}

function deltaTable(pairs) {
  const head = el('tr', {}, [el('th', {}, 'model'), el('th', {}, 'station'), ...SLOPE_METRICS.map((metric) => el('th', { class: 'num' }, metric.label))]);
  const rows = pairs.map((pair) => el('tr', {}, [
    el('td', { class: 'nowrap' }, [harnessMark(pair.harness), pair.model]),
    el('td', {}, pair.station),
    ...SLOPE_METRICS.map((metric) => {
      const [off, on] = [metric.value(pair.off), metric.value(pair.on)];
      const delta = off == null || on == null ? null : on - off;
      return el('td', { class: 'num' }, [metricNode(metric, pair.on), el('span', { class: `spread ${deltaClass(metric, delta)}` }, signed(delta, metric.format))]);
    }),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, rows)]));
}

function render() {
  writeHash(state);
  const pairs = pairsShown();
  const stations = unique(bench.lorePairs.map((pair) => pair.station));
  const stationPick = el('label', {}, ['station', el('select', { onchange: (e) => { state.station = e.target.value; render(); } }, [
    el('option', { value: '' }, 'all'), ...stations.map((s) => el('option', { value: s, selected: state.station === s }, s)),
  ])]);

  mount(app,
    el('p', { class: 'dim' }, 'Each line is one model run twice: once without the Lore MCP server (hollow, left) and once with it (filled, right). Every station of a with-Lore loop has Lore, so a difference is Lore\'s effect on the whole loop, not on the varied station alone.'),
    pairs.length
      ? null
      : el('div', { class: 'note' }, 'No model has finished both a with-Lore and a without-Lore loop yet.'),
    el('div', { class: 'filters' }, [stationPick, el('span', { class: 'dim' }, `${pairs.length} paired models`)]),
    pairs.length ? panel('SLOPES', el('div', { class: 'plots' }, SLOPE_METRICS.map((metric) => slopeChart(metric, pairs)))) : null,
    pairs.length ? panel('WITH LORE, AND THE CHANGE FROM WITHOUT', deltaTable(pairs)) : null,
  );
}

render();
