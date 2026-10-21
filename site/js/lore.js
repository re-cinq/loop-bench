// No KB against Lore against Lore on Utopia: one line per model and metric through the settings it ran, then the deltas from no KB as a table.
import { mountChrome } from './chrome.js';
import { deltaBar, deltaClass, el, header, harnessMark, markOf, loadBench, METRICS, metricNode, niceBound, panel, readHash, signed, svg, unique, writeHash, mount } from './lib.js';
import { extent, point, scale, yAxis } from './plot.js';

const SLOPE_METRICS = ['cost', 'time', 'rounds', 'correct', 'complete', 'close'].map((key) => METRICS.find((m) => m.key === key));
const WIDTH = 900;
const HEIGHT = 440;
const MARGIN = { top: 24, right: 360, bottom: 30, left: 72 };
const SETTINGS = [{ key: 'off', context: 'none', label: 'no KB' }, { key: 'lore', context: 'lore-mcp', label: 'Lore' }, { key: 'utopia', context: 'lore-utopia', label: 'Utopia' }];
const LABEL_LINE = 14;
const ALL = 'all';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('KNOWLEDGE BASE: NONE VS LORE VS UTOPIA'));
const app = document.getElementById('app');
const byId = new Map(bench.cells.map((cell) => [cell.id, cell]));
const stations = unique(bench.lorePairs.map((pair) => pair.station));
const state = { metric: 'cost', station: stations[0] ?? ALL, ...readHash() };

const pairsShown = () => bench.lorePairs
  .filter((pair) => state.station === ALL || pair.station === state.station)
  .map((pair) => ({ ...pair, off: byId.get(pair.without), lore: pair.lore ? byId.get(pair.lore) : undefined, utopia: pair.utopia ? byId.get(pair.utopia) : undefined }));

/** Pushes labels apart top to bottom so each sits at least one line below the one above it. */
function spacedLabels(labels) {
  let floor = -Infinity;
  return [...labels].sort((a, b) => a.y - b.y).map((label) => {
    floor = Math.max(label.y, floor + LABEL_LINE);
    return { ...label, y: floor };
  });
}

/** One metric, drawn large: a line per model from no KB through Lore to Lore on Utopia, labelled with the model and each change from no KB. Hovering a model fades the others. */
function slopeChart(metric, pairs) {
  const lines = pairs.flatMap((pair) => {
    const values = SETTINGS.map((setting) => (pair[setting.key] ? metric.value(pair[setting.key]) : null));
    return values[0] == null || values.slice(1).every((value) => value == null) ? [] : [{ pair, values }];
  });
  if (!lines.length) return el('div', { class: 'note' }, `No model has a ${metric.label} value for both no KB and a knowledge base.`);
  const domain = extent(lines.flatMap((line) => line.values.filter((value) => value != null)), { zero: ['cost', 'time', 'rounds'].includes(metric.key) });
  const y = scale(domain, [HEIGHT - MARGIN.bottom, MARGIN.top]);
  const xs = [MARGIN.left + 20, MARGIN.left + 20 + (WIDTH - MARGIN.right - MARGIN.left - 20) / 2, WIDTH - MARGIN.right];
  const lastOf = (line) => line.values.map((value, i) => (value == null ? -1 : i)).reduce((a, b) => Math.max(a, b));
  const verdicts = lines.flatMap((line) => line.values.slice(1).flatMap((value) => (value == null ? [] : [deltaClass(metric, value - line.values[0])])));
  const [improved, worse] = ['delta-pos', 'delta-neg'].map((cls) => verdicts.filter((verdict) => verdict === cls).length);
  const nameOf = (pair) => (state.station === ALL ? `${pair.model} · ${pair.station}` : pair.model);
  const labels = spacedLabels(lines.map((line) => ({ line, y: y(line.values[lastOf(line)]) })));
  const labelY = new Map(labels.map((label) => [label.line, label.y]));

  const plot = svg('svg', { class: 'plot slopes', viewBox: `0 0 ${WIDTH} ${Math.max(HEIGHT, ...labels.map((label) => label.y + 10))}`, role: 'img', 'aria-label': `${metric.label} with no knowledge base, with Lore and with Lore on Utopia for ${lines.length} models` }, [
    yAxis({ y, domain, left: MARGIN.left, right: xs[2] + 6, format: metric.format }),
    ...SETTINGS.map((setting, i) => svg('text', { x: xs[i], y: HEIGHT - 8, 'text-anchor': 'middle' }, setting.label)),
    ...lines.map((line) => {
      const { pair, values } = line;
      const last = lastOf(line);
      const ly = labelY.get(line);
      const shown = values.flatMap((value, i) => (value == null ? [] : [{ value, x: xs[i], context: SETTINGS[i].context }]));
      const deltas = values.slice(1).map((value, i) => (value == null ? null : { setting: SETTINGS[i + 1], delta: value - values[0] })).filter(Boolean);
      return svg('g', { class: 'model' }, [
        svg('title', {}, `${nameOf(pair)}: ${shown.map((item, i) => `${SETTINGS.find((setting) => setting.context === item.context).label} ${metric.format(item.value)}`).join(' → ')}`),
        svg('polyline', { class: `slope pt-${markOf(pair)}`, fill: 'none', points: shown.map((item) => `${item.x},${y(item.value)}`).join(' ') }),
        ...shown.map((item) => point({ cx: item.x, cy: y(item.value), harness: markOf(pair), context: item.context, r: 4.5 })),
        Math.abs(ly - y(values[last])) > 1 ? svg('line', { class: 'leader', x1: xs[last] + 6, y1: y(values[last]), x2: xs[last] + 14, y2: ly }) : null,
        svg('text', { class: 'slope-label', x: xs[last] + 16, y: ly + 4 }, [
          `${nameOf(pair)} `,
          ...deltas.flatMap((item) => [svg('tspan', {}, `${item.setting.label === 'Lore' ? 'L' : 'U'} `), svg('tspan', { class: deltaClass(metric, item.delta) }, `${signed(item.delta, metric.format)} `)]),
        ]),
      ]);
    }),
  ]);
  return el('div', {}, [
    el('div', { class: 'slope-wrap' }, plot),
    el('div', { class: 'dim' }, [el('span', { class: 'delta-pos' }, `${improved} better`), ' · ', el('span', { class: 'delta-neg' }, `${worse} worse`), ` · ${verdicts.length - improved - worse} unchanged, counting Lore and Utopia against no KB separately. L = Lore, U = Lore on Utopia, each as the change from no KB. Hover a line to pick it out.`]),
  ]);
}

function metricTabs() {
  return el('div', { class: 'filters' }, SLOPE_METRICS.map((metric) => el('button', {
    class: state.metric === metric.key ? 'active' : '',
    onclick: () => { state.metric = metric.key; render(); },
  }, `${metric.label}${metric.better ? ` (${metric.better} better)` : ''}`)));
}

function deltaTable(pairs) {
  const head = el('tr', {}, [el('th', {}, 'model'), el('th', {}, 'station'), el('th', {}, 'knowledge base'), ...SLOPE_METRICS.map((metric) => el('th', { class: 'num' }, metric.label))]);
  const rowsOf = (pair) => SETTINGS.slice(1).flatMap((setting) => (pair[setting.key] ? [{ pair, setting, on: pair[setting.key] }] : []));
  const rows = pairs.flatMap(rowsOf);
  const deltaOf = (metric, row) => {
    const [off, on] = [metric.value(row.pair.off), metric.value(row.on)];
    return off == null || on == null ? null : on - off;
  };
  const bounds = new Map(SLOPE_METRICS.map((metric) => [metric.key, niceBound(rows.map((row) => deltaOf(metric, row)))]));
  const body = rows.map((row) => el('tr', {}, [
    el('td', { class: 'nowrap' }, [harnessMark(markOf(row.pair)), row.pair.model]),
    el('td', {}, row.pair.station),
    el('td', { class: 'nowrap' }, row.setting.label),
    ...SLOPE_METRICS.map((metric) => {
      const delta = deltaOf(metric, row);
      return el('td', { class: 'num' }, [
        metricNode(metric, row.on),
        el('span', { class: `spread ${deltaClass(metric, delta)}` }, signed(delta, metric.format)),
        delta == null ? null : deltaBar(metric, delta, bounds.get(metric.key)),
      ]);
    }),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, body)]));
}

function render() {
  writeHash(state);
  const pairs = pairsShown();
  const stationPick = el('label', {}, ['station', el('select', { onchange: (e) => { state.station = e.target.value; render(); } }, [
    ...stations.map((s) => el('option', { value: s, selected: state.station === s }, s)), el('option', { value: ALL, selected: state.station === ALL }, 'all (scales mix)'),
  ])]);

  mount(app,
    el('p', { class: 'dim' }, 'Each line is one model run with no knowledge base (hollow), with the Lore MCP server on its own store (solid) and with the same server on Utopia (faded). Every station of a Lore loop has the server, so a difference is the knowledge base\'s effect on the whole loop, not on the varied station alone. Utopia serves only spec and ADR statements today.'),
    pairs.length
      ? null
      : el('div', { class: 'note' }, 'No model has finished both a no-KB loop and a Lore or Utopia loop yet.'),
    el('div', { class: 'filters' }, [stationPick, el('span', { class: 'dim' }, `${pairs.length} paired models`)]),
    pairs.length ? panel('SLOPES', metricTabs(), slopeChart(SLOPE_METRICS.find((metric) => metric.key === state.metric) ?? SLOPE_METRICS[0], pairs)) : null,
    pairs.length ? panel('LORE AND UTOPIA, AND THE CHANGE FROM NO KB', deltaTable(pairs)) : null,
  );
}

render();
