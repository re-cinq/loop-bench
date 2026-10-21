// Spend per station visit: where a loop's money and time go, and which runs failed how.
import { mountChrome } from './chrome.js';
import { el, harnessMark, markOf, header, loadBench, loreTag, minutes, money, panel, spreadNode, unique, whole, mount } from './lib.js';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('STATION VISITS'));
const app = document.getElementById('app');

function stationTable(rows) {
  const head = el('tr', {}, ['model', 'knowledge base', 'visits', 'cost / visit', 'time / visit', 'output tokens', 'tool calls', 'failures'].map((label, i) => el('th', { class: i >= 2 && i < 7 ? 'num' : '' }, label)));
  const body = rows.map((row) => el('tr', {}, [
    el('td', { class: 'nowrap' }, [harnessMark(markOf(row)), row.model, el('span', { class: 'dim' }, ` (${row.harness})`)]),
    el('td', {}, loreTag(row)),
    el('td', { class: 'num' }, row.visits),
    el('td', { class: 'num' }, spreadNode(row.costUsd, money)),
    el('td', { class: 'num' }, spreadNode(row.minutes, minutes)),
    el('td', { class: 'num' }, spreadNode(row.outputTokens, whole)),
    el('td', { class: 'num' }, spreadNode(row.toolCalls, whole)),
    el('td', { class: Object.keys(row.failures).length ? 'alert' : 'dim' }, Object.entries(row.failures).map(([kind, n]) => `${kind} ×${n}`).join(', ') || 'none'),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, body)]));
}

mount(app,
  el('p', { class: 'dim' }, 'Every agent run of every loop, grouped by the station it ran and the model that ran it. A tdd-round row counts each round as a visit, so a model that needs more rounds shows more visits here and a higher cost per loop on the results page.'),
  bench.stations.length ? null : el('div', { class: 'note' }, 'No station has run yet.'),
  ...unique(bench.stations.map((row) => row.station)).map((station) => panel(station.toUpperCase(), stationTable(bench.stations.filter((row) => row.station === station)))),
);
