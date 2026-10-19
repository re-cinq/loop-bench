// Summary: the headline numbers, the written reading of the results, and the cells nothing beats.
import { mountChrome } from './chrome.js';
import { el, header, isDone, loadBench, loreTag, meanOf, METRICS, metricNode, minutes, modelCell, money, one, panel, unique, mount } from './lib.js';
import { mdToHtml } from './markdown.js';

const FRONT_METRICS = ['green', 'rounds', 'cost', 'time', 'correct', 'complete', 'close'].map((key) => METRICS.find((m) => m.key === key));

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('WHICH MODEL RUNS EACH STATION BEST'));
const app = document.getElementById('app');
const done = bench.cells.filter(isDone);

const stat = (label, value, sub) => el('div', { class: 'stat' }, [el('div', { class: 'label' }, label), el('div', { class: 'value' }, value), sub ? el('div', { class: 'sub' }, sub) : null]);
const lowest = (cells, valueOf) => cells.filter((c) => valueOf(c) != null).sort((a, b) => valueOf(a) - valueOf(b))[0];
const cheapest = lowest(done.filter((c) => c.reachedGreen === c.runs), (c) => meanOf(c.costUsd));
const fastest = lowest(done.filter((c) => c.reachedGreen === c.runs), (c) => meanOf(c.minutes));
const bestJudged = done.filter((c) => c.judgeMean != null).sort((a, b) => b.judgeMean - a.judgeMean || meanOf(a.costUsd) - meanOf(b.costUsd))[0];

const conclusions = el('div', { class: 'conclusions' });
conclusions.innerHTML = mdToHtml(bench.conclusions);

const front = done.filter((cell) => !cell.dominated && cell.judgeMean != null).sort((a, b) => a.station.localeCompare(b.station) || meanOf(a.costUsd) - meanOf(b.costUsd));
const frontTable = el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [
  el('thead', {}, el('tr', {}, [el('th', {}, 'station'), el('th', {}, 'model'), el('th', {}, 'lore'), ...FRONT_METRICS.map((m) => el('th', { class: 'num' }, m.label))])),
  el('tbody', {}, front.map((cell) => el('tr', {}, [el('td', {}, cell.station), el('td', {}, modelCell(cell)), el('td', {}, loreTag(cell.lore)), ...FRONT_METRICS.map((m) => el('td', { class: 'num' }, metricNode(m, cell)))]))),
]));

mount(app,
  el('p', { class: 'dim' }, `The implementation loop's stations (dod, tdd-round, repair-build) each run on a model nobody chose by measurement. This bench replays merged tickets of ${bench.subjectRepo} from their base commit with each harness and model, with and without the Lore MCP server.`),
  done.length ? null : el('div', { class: 'note' }, 'No loop has finished yet. The pages fill in as the bench runs; rebuild with npm run site.'),
  el('div', { class: 'stats' }, [
    stat('cells finished', `${done.length}/${bench.cells.length}`, `${bench.loops} loops · ${unique(done.map((c) => c.model)).length} models`),
    stat('spend so far', money(bench.totalCostUsd), 'at market API prices'),
    stat('cheapest green loop', cheapest ? money(meanOf(cheapest.costUsd)) : '–', cheapest ? `${cheapest.model} · ${cheapest.station}` : null),
    stat('fastest green loop', fastest ? minutes(meanOf(fastest.minutes)) : '–', fastest ? `${fastest.model} · ${fastest.station}` : null),
    stat('best judged', bestJudged ? one(bestJudged.judgeMean) : '–', bestJudged ? `${bestJudged.model} · ${bestJudged.station} · of 5` : null),
  ]),
  panel('WHAT WE READ IN IT', conclusions),
  front.length ? panel('CELLS NOTHING BEATS',
    el('p', { class: 'dim' }, 'For each station, the cells no other cell beats on cost, time and judge score at once. Every other cell is worse on all three than at least one of these. Compare any of them on the results page.'),
    frontTable) : null,
);
