// Compare: two to four models, optionally narrowed to a knowledge base or a task size, side by side on the tickets they all ran.
import { mountChrome } from './chrome.js';
import { bestColumns, buildComparison, comparisonParagraph, fairnessLine, modelKeyOf, parseThing, qualifierText, thingKey, thingRuns } from './compare-model.js';
import { copyLinkButton, el, harnessMark, header, loadBench, markOf, mount, panel, readHash, svg, writeHash } from './lib.js';
import { minutesRangeText, minutesText, moneyRangeText, moneyText } from './modelstory.js';
import { extent, point, scale, separateLabels, xAxis, yAxis } from './plot.js';
import { ranked, splitByCoverage, summarizeModels } from './rank.js';
import { ticketName } from './tickets.js';
import { groupSetups, flipped } from './steadiness.js';
import { FAILURE_REASONS, KNOWLEDGE_BASES, MAKERS, MEASURES, NONE_OR_ALL, SIZES, STRENGTHS, TASKS } from './words.js';

const MIN_THINGS = 2;
const MAX_THINGS = 4;
const DEFAULT_TASK = 'tdd-round';
const RECOMMENDED_WEIGHTS = { quality: 6, price: 2, speed: 2 };
const CHART = { width: 640, height: 360, margin: { top: 28, right: 20, bottom: 44, left: 48 } };

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('How do these models compare?'));
const app = document.getElementById('app');
const allRuns = bench.modelStats.runs;
const taskKeys = Object.keys(TASKS);
const knowledgeBaseKeys = Object.keys(KNOWLEDGE_BASES);
const sizeKeys = Object.keys(SIZES);
const hasReview = (task) => task !== 'dod';
const sizeOfTicket = Object.fromEntries(allRuns.map((run) => [run.ticket, run.size]));

const models = [...new Map(allRuns.map((run) => [modelKeyOf(run), run])).values()].sort((a, b) => a.model.localeCompare(b.model, undefined, { numeric: true }));
const modelKeys = new Set(models.map(modelKeyOf));
const plainThing = (modelKey) => parseThing(modelKey);

function recommendedModelKeys() {
  const rows = summarizeModels(allRuns.filter((run) => run.task === DEFAULT_TASK), { reviewed: true });
  const { fullyTested } = splitByCoverage(rows, sizeOfTicket);
  return ranked(fullyTested, RECOMMENDED_WEIGHTS).map(modelKeyOf);
}
const recommended = recommendedModelKeys();

function isValidThing(thing) {
  return thing && modelKeys.has(`${thing.harness}/${thing.model}`)
    && (thing.kb === NONE_OR_ALL || KNOWLEDGE_BASES[thing.kb])
    && (thing.size === NONE_OR_ALL || SIZES[thing.size]);
}

function stateFromHash() {
  const hash = readHash();
  const fromHash = [1, 2, 3, 4].map((number) => parseThing(hash[`c${number}`])).filter(isValidThing);
  const defaults = recommended.slice(0, 3).map(plainThing);
  const things = fromHash.length >= MIN_THINGS ? fromHash : [...fromHash, ...defaults.filter((fallback) => !fromHash.some((thing) => modelKeyOf(thing) === modelKeyOf(fallback)))].slice(0, Math.max(fromHash.length, 3));
  return { task: TASKS[hash.task] ? hash.task : DEFAULT_TASK, things };
}

const state = stateFromHash();

function saveState() {
  writeHash({ task: state.task, ...Object.fromEntries(state.things.map((thing, index) => [`c${index + 1}`, thingKey(thing)])) });
}

const percent = (share) => `${Math.round(share * 100)}%`;
const moneyRange = (spread) => (spread ? moneyRangeText(spread.p25, spread.p75) : null);
const minutesRange = (spread) => (spread ? minutesRangeText(spread.p25, spread.p75) : null);
const shortMoney = (value) => (value == null ? '–' : moneyText(value));
const shortMinutes = (value) => (value == null ? '–' : minutesText(value));

function modelSelect(thing, index) {
  const groups = [...Map.groupBy(models, (row) => MAKERS[markOf(row)]).entries()];
  const change = (event) => {
    const { harness, model } = parseThing(event.target.value);
    state.things[index] = { ...thing, harness, model };
    render();
  };
  return el('select', { 'aria-label': `Model for column ${index + 1}`, onchange: change },
    groups.map(([maker, rows]) => el('optgroup', { label: maker }, rows.map((row) => el('option', { value: modelKeyOf(row), selected: modelKeyOf(row) === modelKeyOf(thing) }, row.model)))));
}

function narrowSelect(thing, index, key, label, options) {
  const change = (event) => { state.things[index] = { ...thing, [key]: event.target.value }; render(); };
  const choices = [[NONE_OR_ALL, 'all'], ...options.map(([value, entry]) => [value, entry.label])];
  return el('label', {}, [label, el('select', { onchange: change }, choices.map(([value, text]) => el('option', { value, selected: thing[key] === value }, text)))]);
}

function columnControls(thing, index) {
  const remove = el('button', { disabled: state.things.length <= MIN_THINGS, 'aria-label': `Remove column ${index + 1}`, onclick: () => { state.things.splice(index, 1); render(); } }, 'Remove');
  return el('div', { class: 'c-column' }, [
    el('span', { class: 'c-label' }, `Column ${index + 1}`),
    el('label', {}, ['Model', modelSelect(thing, index)]),
    narrowSelect(thing, index, 'kb', 'Knowledge base', Object.entries(KNOWLEDGE_BASES)),
    narrowSelect(thing, index, 'size', 'Task size', Object.entries(SIZES)),
    remove,
  ]);
}

function addColumn() {
  const chosen = new Set(state.things.map(modelKeyOf));
  const next = recommended.find((key) => !chosen.has(key)) ?? recommended[0];
  state.things.push(plainThing(next));
  render();
}

function controlsPanel() {
  const tabs = taskKeys.map((task) => el('button', { class: task === state.task ? 'active' : '', title: TASKS[task].explain, onclick: () => { state.task = task; render(); } }, TASKS[task].label));
  const add = el('button', { disabled: state.things.length >= MAX_THINGS, onclick: addColumn }, 'Add a column');
  return panel('WHAT DO YOU WANT TO COMPARE?',
    el('div', { class: 'tabs' }, tabs),
    el('div', { class: 'c-columns' }, state.things.map(columnControls)),
    el('div', { class: 'c-actions' }, [add, copyLinkButton()]));
}

function headCell(column) {
  const qualifier = qualifierText(column.thing);
  return el('th', { scope: 'col' }, [el('span', { class: 'nowrap' }, [harnessMark(markOf(column.thing)), ' ', column.thing.model]), el('small', {}, qualifier || 'all knowledge bases and sizes')]);
}

function bestTag() {
  return el('span', { class: 'c-best' }, 'best');
}

function tableRow(measure, columns, best, cellContent) {
  const cells = columns.map((column, index) => {
    const isBest = best.includes(index);
    const content = column.empty ? el('span', { class: 'c-text' }, '–') : cellContent(column);
    return el('td', { class: isBest ? 'best' : '' }, [content, isBest ? bestTag() : null]);
  });
  return el('tr', {}, [el('th', { scope: 'row', title: measure.explain }, measure.label), ...cells]);
}

const value = (text, ...notes) => el('div', {}, [el('span', { class: 'c-value' }, text), ...notes.filter(Boolean).map((note) => el('small', {}, note))]);
const text = (words, ...notes) => el('div', {}, [el('span', { class: 'c-text' }, words), ...notes.filter(Boolean).map((note) => el('small', {}, note))]);

const ROUNDS = { label: 'usual rounds', explain: 'How many rounds of trying a usual run takes.' };
const STEADY = { label: 'how steady', explain: 'Of the setups run 2 or more times, the share where every run ended the same way, always working or never working.' };
const FAILS = { label: 'how it fails', explain: 'The most common last thing that happened in runs where the project\'s checks did not pass.' };
const RUNS = { label: 'runs it rests on', explain: 'How many runs the numbers above come from.' };

function steadyCell(column) {
  const { repeated, steady } = column.steadiness;
  if (!repeated) return text('no setup was run twice');
  return value(percent(steady / repeated), `every run ended the same in ${steady} of ${repeated} setups`);
}

function failureCell(column) {
  const { failures, count, words } = column.failure;
  if (!failures) return text('every run worked');
  return text(words, `${count} of ${failures} that did not work`);
}

function runsCell(column) {
  const few = column.row.strength === 'few' ? el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label) : null;
  return el('div', {}, [value(`${column.runs} ${column.runs === 1 ? 'run' : 'runs'}`), few, column.missingText ? el('small', {}, column.missingText) : null]);
}

function tablePanel(comparison) {
  const { columns, task } = comparison;
  const best = bestColumns(columns);
  const costNote = (column) => (column.row.costUnknownRuns ? `cost unknown for ${column.row.costUnknownRuns} of ${column.row.runs} runs` : null);
  const rows = [
    tableRow(MEASURES.works, columns, best.works, (column) => value(`${column.row.successes} of ${column.row.runs} runs`, `${percent(column.row.successRate)}, each ticket counting equally`)),
    tableRow(MEASURES.cost, columns, best.cost, (column) => value(shortMoney(column.row.costUsd?.median), moneyRange(column.row.costUsd), costNote(column))),
    tableRow(MEASURES.time, columns, best.time, (column) => value(shortMinutes(column.row.minutes?.median), minutesRange(column.row.minutes))),
    hasReview(task) ? tableRow(MEASURES.review, columns, best.review, (column) => value(column.row.review == null ? '–' : `${column.row.review.toFixed(1)} of 5`)) : null,
    hasReview(task) ? tableRow(ROUNDS, columns, best.rounds, (column) => value(column.rounds == null ? '–' : String(column.rounds))) : null,
    tableRow(MEASURES.costPerWorking, columns, best.costPerWorking, (column) => value(shortMoney(column.row.costPerSuccessUsd))),
    tableRow(STEADY, columns, best.steady, steadyCell),
    tableRow(FAILS, columns, [], failureCell),
    tableRow(RUNS, columns, [], runsCell),
  ];
  const fair = fairnessLine(comparison);
  return panel('SIDE BY SIDE',
    el('p', { class: 'dim' }, 'The best value in each row carries a "best" tag. Lower is better for cost, time, rounds and cost per working result; higher is better for the rest.'),
    fair ? el('div', { class: 'note' }, fair) : null,
    el('div', { class: 'c-table-wrap' }, el('table', { class: 'c-table' }, [
      el('thead', {}, el('tr', {}, [el('th', {}, ''), ...columns.map((column) => (column.empty ? el('th', { scope: 'col' }, [column.thing.model, el('small', {}, 'no runs for this task')]) : headCell(column)))])),
      el('tbody', {}, rows),
    ])));
}

function setupHref(task, thing, setup) {
  return `setup.html#task=${task}&model=${modelKeyOf(thing)}&kb=${setup.knowledgeBase}&ticket=${setup.ticket}`;
}

function dot(run) {
  const result = run.success ? 'works' : 'does not work';
  const reason = run.success ? '' : `, ${FAILURE_REASONS[run.endReason]?.label ?? run.endReason}`;
  const cost = run.costUsd == null ? 'cost unknown' : moneyText(run.costUsd);
  return el('span', { class: `m-dot ${run.success ? '' : 'fails'}`, title: `Run ${run.replicate}: ${result}${reason}. ${cost}, ${shortMinutes(run.minutes)}.` });
}

function strip(task, column, setup) {
  const worked = setup.runs.filter((run) => run.success).length;
  const countText = setup.runs.length === 1 ? '1 run' : `${worked} of ${setup.runs.length} work`;
  const kbText = column.thing.kb === NONE_OR_ALL ? KNOWLEDGE_BASES[setup.knowledgeBase].label : null;
  return el('a', { class: 'm-strip c-strip', href: setupHref(task, column.thing, setup), title: 'See every run of this setup' }, [
    el('span', { class: 'c-strip-name' }, [harnessMark(markOf(column.thing)), ' ', column.name, kbText ? el('small', {}, ` · ${kbText}`) : null]),
    el('span', { class: 'm-dots' }, setup.runs.map(dot)),
    el('span', { class: 'm-count' }, `${countText}${flipped(setup) ? ' · flips' : ''}`),
  ]);
}

function missingStrip(column) {
  return el('div', { class: 'm-strip c-strip c-none' }, [el('span', { class: 'c-strip-name' }, [harnessMark(markOf(column.thing)), ' ', column.name]), el('span', {}, 'not run on this ticket'), el('span', {})]);
}

const SIZE_ORDER = Object.fromEntries(sizeKeys.map((size, index) => [size, index]));
const ticketOrder = (a, b) => (SIZE_ORDER[sizeOfTicket[a]] - SIZE_ORDER[sizeOfTicket[b]]) || (a - b);

function ticketsPanel(comparison) {
  const { columns, task, commonTickets, sharedTickets } = comparison;
  const filled = columns.filter((column) => !column.empty);
  const setupsByColumn = new Map(filled.map((column) => [column, groupSetups(thingRuns(allRuns, column.thing, task))]));
  const tickets = [...new Set([...setupsByColumn.values()].flat().map((setup) => setup.ticket))].sort(ticketOrder);
  const block = (ticket) => {
    const rows = filled.flatMap((column) => {
      const setups = setupsByColumn.get(column).filter((setup) => setup.ticket === ticket).sort((a, b) => knowledgeBaseKeys.indexOf(a.knowledgeBase) - knowledgeBaseKeys.indexOf(b.knowledgeBase));
      return setups.length ? setups.map((setup) => strip(task, column, setup)) : [missingStrip(column)];
    });
    const outOfTable = sharedTickets && !commonTickets.includes(ticket) ? 'not counted in the table' : null;
    return el('div', {}, [el('div', { class: 'c-ticket-head' }, [ticketName(ticket, sizeOfTicket[ticket]), outOfTable ? el('small', {}, outOfTable) : null]), ...rows]);
  };
  return panel('WHERE DO THEY DIFFER, TICKET BY TICKET?',
    el('p', { class: 'dim' }, 'One dot per run, in run order. Click a row to see every run of that setup.'),
    el('div', { class: 'm-key' }, [
      el('span', {}, [el('span', { class: 'm-dot' }), 'run works']),
      el('span', {}, [el('span', { class: 'm-dot fails' }), 'run does not work']),
    ]),
    ...(filled.length ? tickets.map(block) : [el('div', { class: 'note' }, 'No runs to show.')]));
}

function chartLabels(plotted, x, y, rightEdge) {
  const labels = plotted.map(({ column, cost }) => {
    const cx = x(cost);
    const flipped = cx > rightEdge - 120;
    return { text: column.name, anchor: flipped ? 'end' : 'start', x: flipped ? cx - 8 : cx + 8, y: y(column.row.successRate) - 6, width: column.name.length * 6.4 };
  });
  return separateLabels(labels).map((label) => svg('text', { class: 'pt-label', x: label.x, y: label.y, 'text-anchor': label.anchor }, label.text));
}

function chartPanel({ columns }) {
  const plotted = columns.filter((column) => !column.empty && column.row.costUsd).map((column) => ({ column, cost: Math.log10(Math.max(column.row.costUsd.median, 0.001)) }));
  const body = plotted.length ? chart(plotted) : el('div', { class: 'note' }, 'No cost is known for these columns, so there is nothing to plot.');
  return panel('PRICE AGAINST RUNS THAT WORK', el('p', { class: 'dim' }, 'Top left is best: it works most often and costs least. Hollow points use no knowledge base; faded points use Utopia.'), body);
}

function chart(plotted) {
  const { width, height, margin } = CHART;
  const xDomain = extent(plotted.map(({ cost }) => cost));
  const yDomain = [0, 1];
  const x = scale(xDomain, [margin.left, width - margin.right]);
  const y = scale(yDomain, [height - margin.bottom, margin.top]);
  const marks = plotted.map(({ column, cost }) => point({
    cx: x(cost), cy: y(column.row.successRate), harness: markOf(column.thing), context: column.thing.kb === NONE_OR_ALL ? 'lore-mcp' : column.thing.kb,
    title: `${column.name}\n${column.row.successes} of ${column.row.runs} runs work · ${shortMoney(column.row.costUsd.median)}`,
  }));
  return svg('svg', { class: 'plot', viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-label': 'Share of runs that work against usual cost, one point per column' }, [
    yAxis({ y, domain: yDomain, left: margin.left, right: width - margin.right, format: (v) => percent(v), label: 'share of runs that work' }),
    xAxis({ x, domain: xDomain, top: margin.top, bottom: height - margin.bottom, format: (v) => shortMoney(10 ** v), label: 'usual cost per run (log scale)', right: width - margin.right }),
    ...marks,
    ...chartLabels(plotted, x, y, x(xDomain[1])),
  ]);
}

function render() {
  saveState();
  const comparison = buildComparison(allRuns, state.things, state.task);
  mount(app,
    el('p', { class: 'dim' }, 'Pick two to four columns. A column is a model, and you can narrow it to one knowledge base or one task size, so the same model can be compared with itself, for example with and without Utopia. Every column is measured on the tickets all of them ran, with each ticket counting equally. Hover a row heading or a dot for what it means.'),
    panel('WHO WINS ON WHAT?', el('p', { class: 'c-answer' }, comparisonParagraph(comparison))),
    controlsPanel(),
    tablePanel(comparison),
    ticketsPanel(comparison),
    chartPanel(comparison));
}

render();
