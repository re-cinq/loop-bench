// At a glance: one coloured square per setup, models down the side, tickets and knowledge bases across.
import { mountChrome } from './chrome.js';
import { copyLinkButton, el, harnessMark, header, loadBench, markOf, mount, panel, readHash, writeHash } from './lib.js';
import {
  KNOWLEDGE_BASE_ORDER, MEASURES, agreementSummaryText, buildSetups, colourOf, extremesText, knowledgeBaseText, measuresFor, modelPairAgreement,
  orderModels, pairsText, setupKey, setupWords, squareOf, ticketAgreement, ticketColumns, ticketSentence,
} from './grid-model.js';
import { shortTitle, ticketTitle } from './tickets.js';
import { KNOWLEDGE_BASES, TASKS } from './words.js';

const DEFAULT_TASK = 'tdd-round';
const DEFAULT_MEASURE = 'works';
const MEASURE_TIPS = {
  works: 'The share of runs where the project\'s checks pass.',
  price: 'The middle cost of one run at list prices. Cheaper is better.',
  time: 'The middle working time of one run: how long the model itself worked, not counting the wait for the project\'s checks. Shorter is better.',
  review: 'An AI reviewer scores each result from 1 to 5.',
};
const NOT_RUN_TEXT = 'Not run: this model was not tried on this ticket with this knowledge base.';
const TAP_TO_SELECT = typeof matchMedia === 'function' && matchMedia('(hover: none)').matches;

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('Every model on every ticket, at a glance'));
const app = document.getElementById('app');
const allRuns = bench.modelStats.runs;

function stateFromHash() {
  const hash = readHash();
  const task = TASKS[hash.task] ? hash.task : DEFAULT_TASK;
  return { task, measure: measuresFor(task).includes(hash.measure) ? hash.measure : DEFAULT_MEASURE };
}

const state = stateFromHash();
let selectedSquare = null;
let detailsBar = null;

const setupHref = (setup) => `setup.html#${new URLSearchParams({ task: state.task, model: setup.modelKey, kb: setup.knowledgeBase, ticket: setup.ticket })}`;

function showDetails(square, setup) {
  selectedSquare?.classList.remove('selected');
  selectedSquare = square;
  square.classList.add('selected');
  detailsBar.replaceChildren(
    el('span', {}, setupWords(setup, { task: state.task, measureKey: state.measure })),
    ' ',
    el('a', { href: setupHref(setup) }, 'Open this setup'),
  );
}

function onSquareClick(event, square, setup) {
  const alreadySelected = selectedSquare === square;
  if (!TAP_TO_SELECT || alreadySelected) return;
  event.preventDefault();
  showDetails(square, setup);
}

function squareNode(setup) {
  const measured = squareOf(state.measure, setup);
  const colours = measured ? colourOf(measured.goodness) : null;
  const text = measured ? measured.text : '?';
  const style = colours ? `background: ${colours.background}; color: ${colours.text}` : null;
  const square = el('a', { class: `sq${setup.few ? ' few' : ''}${measured ? '' : ' unknown'}`, href: setupHref(setup), style, 'aria-label': setupWords(setup, { task: state.task, measureKey: state.measure }) }, text);
  if (!TAP_TO_SELECT) {
    square.addEventListener('mouseenter', () => showDetails(square, setup));
    square.addEventListener('focus', () => showDetails(square, setup));
  }
  square.addEventListener('click', (event) => onSquareClick(event, square, setup));
  return square;
}

const notRunNode = () => el('span', { class: 'sq none', title: NOT_RUN_TEXT, 'aria-label': NOT_RUN_TEXT }, '–');

function modelHeader(entry) {
  const link = el('a', { href: `model.html?m=${encodeURIComponent(entry.modelKey)}` }, entry.model);
  const average = entry.average == null ? null : el('small', { class: 'avg', title: `Across all its runs, every ticket counting equally: ${MEASURES[state.measure].format(entry.average)}` }, MEASURES[state.measure].format(entry.average));
  return el('th', { scope: 'row', class: 'model-name' }, [harnessMark(markOf(entry)), link, average]);
}

function gridTable(entries, tickets) {
  const setupAt = new Map(entries.flatMap((entry) => entry.setups).map((setup) => [setupKey(setup), setup]));
  const titleNode = (ticket) => (ticketTitle(ticket) ? el('span', { class: 'ticket-title' }, shortTitle(ticketTitle(ticket), 34)) : null);
  const ticketHeads = tickets.map(({ ticket, size }) => el('th', { colspan: KNOWLEDGE_BASE_ORDER.length, scope: 'colgroup', class: 'ticket-head', title: ticketTitle(ticket) ? `#${ticket}: ${ticketTitle(ticket)}` : null }, [`Ticket ${ticket}`, size ? el('small', {}, size) : null, titleNode(ticket)]));
  const kbHeads = tickets.flatMap(() => KNOWLEDGE_BASE_ORDER.map((kb, index) => el('th', { scope: 'col', class: `kb-head${index === 0 ? ' first' : ''}`, title: KNOWLEDGE_BASES[kb].explain }, KNOWLEDGE_BASES[kb].label)));
  const cellFor = (entry, { ticket }, kb, index) => {
    const setup = setupAt.get(`${entry.modelKey}|${kb}|${ticket}`);
    return el('td', { class: index === 0 ? 'first' : '' }, setup ? squareNode(setup) : notRunNode());
  };
  const rowOf = (entry) => el('tr', {}, [modelHeader(entry), ...tickets.flatMap((column) => KNOWLEDGE_BASE_ORDER.map((kb, index) => cellFor(entry, column, kb, index)))]);
  const skippers = entries.filter((entry) => entry.missing.length);
  const divider = el('tr', { class: 'gx-divider' }, el('th', { colspan: 1 + tickets.length * KNOWLEDGE_BASE_ORDER.length, scope: 'colgroup' }, 'Not fully tested: these models skipped a ticket, so they are not ranked with the rest'));
  const rows = [...entries.filter((entry) => !entry.missing.length).map(rowOf), ...(skippers.length ? [divider, ...skippers.map(rowOf)] : [])];
  return el('table', { class: 'gx-table' }, [
    el('thead', {}, [el('tr', {}, [el('th', { rowspan: 2, class: 'model-name corner' }, 'Model, best first'), ...ticketHeads]), el('tr', {}, kbHeads)]),
    el('tbody', {}, rows),
  ]);
}

function legend() {
  const measure = MEASURES[state.measure];
  const stops = [0, 0.25, 0.5, 0.75, 1].map((goodness) => colourOf(goodness).background);
  return el('div', { class: 'gx-legend' }, [
    el('span', {}, measure.scaleEnds[0]),
    el('span', { class: 'ramp', style: `background: linear-gradient(90deg, ${stops.join(', ')})`, 'aria-hidden': 'true' }),
    el('span', {}, measure.scaleEnds[1]),
    el('span', { class: 'swatch-few', 'aria-hidden': 'true' }),
    el('span', {}, 'dotted edge and cut corner: fewer than 5 runs'),
    el('span', { class: 'swatch-none', 'aria-hidden': 'true' }, '–'),
    el('span', {}, 'not run'),
    el('span', { class: 'dim' }, 'Colour is fixed, so squares compare across tasks and models; the number in each square says the same.'),
  ]);
}

function choiceButtons(options, current, choose) {
  return options.map(([value, label, tip]) => el('button', { class: value === current ? 'active' : '', title: tip, onclick: () => choose(value) }, label));
}

function selectTask(task) {
  state.task = task;
  if (!measuresFor(task).includes(state.measure)) state.measure = DEFAULT_MEASURE;
  render();
}

function selectMeasure(measure) {
  state.measure = measure;
  render();
}

function lines(sentences) {
  return el('ul', { class: 'plain-list gx-lines' }, sentences.map((sentence) => el('li', {}, sentence)));
}

function answerText({ entries, tickets, setups }) {
  const activity = TASKS[state.task].activity;
  const { strongest, weakest } = extremesText({ measureKey: state.measure, setups, tickets });
  const scope = `${entries.length} models were tried on ${tickets.length} tickets with three knowledge bases.`;
  if (!strongest.length) return `For ${activity}, ${scope}`;
  const lowest = weakest.length ? ` At the other end, ${weakest[0]}` : '';
  return `For ${activity}, ${scope} The top row: ${strongest[0]}${lowest}`;
}

function summaryPanels({ tickets, setups }) {
  const extremes = extremesText({ measureKey: state.measure, setups, tickets });
  const agreements = ticketAgreement({ setups, tickets });
  const pairs = pairsText(modelPairAgreement(setups));
  return [
    panel('WHAT THE GRID SHOWS',
      el('p', { class: 'gx-sub' }, 'Strongest on this measure'), lines(extremes.strongest),
      el('p', { class: 'gx-sub' }, 'Weakest on this measure'), lines(extremes.weakest),
      extremes.skipped.length ? el('p', { class: 'gx-sub' }, 'Skipped a ticket') : null, extremes.skipped.length ? lines(extremes.skipped) : null),
    panel('DO THE MODELS AGREE?',
      el('p', { class: 'dim' }, 'Counted on whether runs work, whichever measure is shown. A model works in every run, never works, or sits in between.'),
      lines(agreements.map(ticketSentence)),
      lines(agreementSummaryText(agreements)),
      el('p', { class: 'gx-sub' }, 'Most alike'), el('p', { class: 'dim' }, pairs.explanation), lines(pairs.alike),
      el('p', { class: 'gx-sub' }, 'Most different'), lines(pairs.different)),
    panel('DOES THE KNOWLEDGE BASE CHANGE THE PICTURE?', ...knowledgeBaseText({ measureKey: state.measure, setups }).map((sentence) => el('p', {}, sentence))),
  ];
}

function render() {
  writeHash({ task: state.task, measure: state.measure });
  const runs = allRuns.filter((run) => run.task === state.task);
  const setups = buildSetups(runs);
  const tickets = ticketColumns(runs);
  const entries = orderModels(state.measure, setups);
  const taskOptions = Object.entries(TASKS).map(([key, task]) => [key, task.label, task.explain]);
  const measureOptions = measuresFor(state.task).map((key) => [key, MEASURES[key].label, MEASURE_TIPS[key]]);
  detailsBar = el('div', { class: 'gx-details', 'aria-live': 'polite' }, 'Hover, focus or tap a square to see its numbers in words. Click a square to open that setup.');
  selectedSquare = null;

  mount(app,
    el('p', { class: 'dim' }, 'Each row is a model, best first on the measure you pick, with every ticket counting equally. Each column is one ticket with no knowledge base, with Lore and with Utopia (two knowledge bases the model could look things up in). Each square is one setup: a model, a ticket and a knowledge base, run several times. The number in the square is the answer; the colour is only a hint. Hover a ticket heading for its full title. Models that skipped a ticket are listed at the bottom and are not ranked.'),
    panel('THE ANSWER FOR THIS TASK', el('p', { class: 'answer' }, answerText({ entries, tickets, setups }))),
    panel('WHAT DO YOU WANT TO SEE?',
      el('div', { class: 'tabs' }, choiceButtons(taskOptions, state.task, selectTask)),
      el('div', { class: 'filters gx-measures' }, [el('span', { class: 'dim' }, 'Colour and order by'), ...choiceButtons(measureOptions, state.measure, selectMeasure), copyLinkButton()])),
    panel('EVERY MODEL ON EVERY TICKET',
      legend(),
      el('div', { class: 'gx-block' }, [el('div', { class: 'gx-scroll' }, gridTable(entries, tickets)), detailsBar])),
    ...summaryPanels({ tickets, setups }),
  );
}

render();
