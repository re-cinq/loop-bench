// Calculator: what a number of tasks will cost and how long they will take, for the models the reader picks.
import { mountChrome } from './chrome.js';
import { copyLinkButton, el, harnessMark, header, loadBench, markOf, mount, panel, readHash, writeHash } from './lib.js';
import {
  MAX_ATTEMPTS, SIZE_KEYS, TASK_KEYS, answerSentence, choicesFor, compareChoices, costUnknownText, hoursText, indexRuns, leftOutText,
  mixFromPercents, modelNameOf, priceWork, sameModelFor, seenMix, surenessText, totalMoneyText, wholeSizeMix,
} from './estimate.js';
import { recommendations } from './findings.js';
import { minutesText, moneyText } from './modelstory.js';
import { KNOWLEDGE_BASES, SIZE_MIXES, STRENGTHS, TASKS } from './words.js';

const MODEL_MODES = { recommended: 'recommended for each task', one: 'one model for every task', each: 'a model for each task' };
const DEFAULT_COUNTS = { dod: 10, 'tdd-round': 10, 'repair-build': 2 };
const DEFAULT_ONE_MODEL = 'claude/claude-sonnet-5-5';
const MIX_FIELDS = [['small', 'ps'], ['medium', 'pm'], ['large', 'pl']];

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('What will it cost, and how long will it take?'));
const app = document.getElementById('app');
const runs = bench.modelStats.runs;
const sizeOfTicket = Object.fromEntries(runs.map((run) => [run.ticket, run.size]));
const index = indexRuns(runs);
const homeModelOf = Object.fromEntries(recommendations(runs).map((item) => [item.task, `${item.harness}/${item.model}`]));
const seen = seenMix(sizeOfTicket);
const seenPercents = Object.fromEntries(SIZE_KEYS.map((size) => [size, Math.round(seen[size] * 100)]));
const allModels = [...index.models].sort((a, b) => modelNameOf(a).localeCompare(modelNameOf(b), undefined, { numeric: true }));
const modelsOfTask = Object.fromEntries(TASK_KEYS.map((task) => [task, allModels.filter((model) => SIZE_KEYS.some((size) => index.groups.has(`${task}|${model}|${size}`)))]));
const seenSummary = SIZE_KEYS.map((size) => `${Object.values(sizeOfTicket).filter((candidate) => candidate === size).length} ${size}`).join(', ');

const countFrom = (text, fallback) => (text !== undefined && /^\d{1,6}$/.test(text) ? Number(text) : fallback);
const choiceFrom = (text, valid, fallback) => (valid.includes(text) ? text : fallback);

function stateFromHash() {
  const hash = readHash();
  return {
    counts: Object.fromEntries(TASK_KEYS.map((task) => [task, countFrom(hash[`n-${task}`], DEFAULT_COUNTS[task])])),
    mix: choiceFrom(hash.mix, Object.keys(SIZE_MIXES), 'seen'),
    percents: Object.fromEntries(MIX_FIELDS.map(([size, short]) => [size, countFrom(hash[short], seenPercents[size])])),
    modelMode: choiceFrom(hash.models, Object.keys(MODEL_MODES), 'recommended'),
    oneModel: choiceFrom(hash.model, allModels, DEFAULT_ONE_MODEL),
    eachModels: Object.fromEntries(TASK_KEYS.map((task) => [task, choiceFrom(hash[`m-${task}`], modelsOfTask[task], homeModelOf[task])])),
    kb: choiceFrom(hash.kb, Object.keys(KNOWLEDGE_BASES), 'none'),
  };
}

const state = stateFromHash();

function saveState() {
  writeHash({
    ...Object.fromEntries(TASK_KEYS.map((task) => [`n-${task}`, state.counts[task]])),
    mix: state.mix,
    ...Object.fromEntries(MIX_FIELDS.map(([size, short]) => [short, state.mix === 'own' ? state.percents[size] : null])),
    models: state.modelMode,
    model: state.modelMode === 'one' ? state.oneModel : null,
    ...Object.fromEntries(TASK_KEYS.map((task) => [`m-${task}`, state.modelMode === 'each' ? state.eachModels[task] : null])),
    kb: state.kb,
  });
}

function currentMix() {
  if (state.mix === 'seen') return seen;
  if (state.mix === 'own') return mixFromPercents(state.percents);
  return wholeSizeMix(state.mix);
}

function currentModelFor() {
  if (state.modelMode === 'one') return () => state.oneModel;
  if (state.modelMode === 'each') return sameModelFor(state.eachModels);
  return (task, size) => choicesFor(index, { task, size, kb: state.kb }).recommended;
}

const percent = (share) => `${Math.round(share * 100)}%`;
const countText = (count) => String(Number(count.toFixed(1)));
const attemptMoney = (value) => (value == null ? 'cost unknown' : moneyText(value));
const attemptTime = (value) => (value == null ? 'time unknown' : `about ${minutesText(value)}`);
const taskLabel = (task) => TASKS[task].label;
const lineLabel = (line) => `${taskLabel(line.task)}, ${line.size} tickets`;
const modelName = (key) => el('span', { class: 'nowrap' }, [harnessMark(markOf({ harness: key.split('/')[0], model: modelNameOf(key) })), modelNameOf(key)]);

function basisTag(figure) {
  if (figure.basis === 'estimated') return el('span', { class: 'lore-tag est', title: surenessText(figure) }, 'estimated');
  if (figure.basis === 'few') return el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label);
  return null;
}

const cell = (...children) => el('td', {}, children);
const rangeBar = (part, format) => el('div', { class: 'calc-range' }, [
  el('div', { class: 'calc-track' }, el('div', { class: 'calc-span', style: `left: ${(part.low / part.high) * 100}%; right: 0` })),
  el('div', { class: 'calc-range-labels' }, [el('span', {}, `low ${format(part.low)}`), el('strong', {}, `expected ${format(part.expected)}`), el('span', {}, `high ${format(part.high)}`)]),
]);

function breakdownRow(line) {
  const first = [cell(lineLabel(line)), cell(line.model ? modelName(line.model) : '–')];
  if (line.status === 'none-works') return el('tr', { class: 'calc-gap' }, [...first, el('td', { colspan: 5 }, 'no model produced a working result here')]);
  if (line.status === 'no-data') return el('tr', { class: 'calc-gap' }, [...first, el('td', { colspan: 5 }, 'no data: left out of the total')]);
  if (line.status === 'never-works') return el('tr', { class: 'calc-gap' }, [...first, el('td', { colspan: 5 }, `this model did not produce a working result here (${line.figure.successes} of ${line.figure.runs} runs worked)`)]);
  const { figure, result } = line;
  const tag = basisTag(figure);
  const attempts = result.capped ? `${MAX_ATTEMPTS} attempts (most we count)` : `${Number(result.attempts.toFixed(1))} ${result.attempts > 1.05 ? 'attempts' : 'attempt'}`;
  return el('tr', {}, [
    ...first,
    cell(`${percent(figure.share)} `, tag),
    cell(attemptMoney(figure.cost?.median), el('small', {}, attemptTime(figure.minutes?.median))),
    cell(attemptMoney(result.cost?.median), el('small', {}, `${attemptTime(result.minutes?.median)}, ${attempts}`)),
    cell(countText(line.count)),
    cell(result.cost ? totalMoneyText(line.count * result.cost.median) : 'cost unknown', el('small', {}, result.minutes ? `about ${hoursText(line.count * result.minutes.median)}` : 'time unknown')),
  ]);
}

function breakdownPanel({ lines, totals }) {
  const head = ['Task', 'Model', 'Works first time', 'One attempt', 'One working result', 'How many', 'Expected for all'];
  const totalRow = el('tr', { class: 'calc-total' }, [
    el('td', { colspan: 6 }, 'Total'),
    cell(totals.cost.expected == null ? '–' : totalMoneyText(totals.cost.expected), el('small', {}, totals.minutes.expected == null ? '' : `about ${hoursText(totals.minutes.expected)}`)),
  ]);
  const unknownCosts = lines.filter((line) => line.figure.costUnknownRuns).map((line) => `${lineLabel(line)}: ${costUnknownText(line.figure)}`);
  return panel('WHAT DOES EACH KIND OF TASK COST?',
    el('div', { class: 'calc-wrap' }, el('table', { class: 'calc-table' }, [
      el('thead', {}, el('tr', {}, head.map((text) => el('th', {}, text)))),
      el('tbody', {}, [...lines.map(breakdownRow), totalRow]),
    ])),
    el('p', { class: 'dim' }, `An attempt that fails is paid for and repeated. So one working result costs the usual price of an attempt times the number of attempts it takes: 1 divided by the share that works, counting at most ${MAX_ATTEMPTS}.`),
    unknownCosts.length ? el('p', { class: 'dim' }, `Some runs were stopped before their cost was reported: ${unknownCosts.join('; ')}.`) : null);
}

function rangePanel({ totals }) {
  if (totals.cost.expected == null || totals.minutes.expected == null) return null;
  return panel('WHAT IS THE USUAL RANGE?',
    el('p', { class: 'dim' }, 'Low is what the cheaper quarter of runs cost or took, high is what the dearer quarter did. Each task\'s low and high are added up, so this is a rough range, not a promise.'),
    el('div', { class: 'calc-ranges' }, [
      el('div', {}, [el('div', { class: 'calc-range-title' }, 'Cost'), rangeBar(totals.cost, totalMoneyText)]),
      el('div', {}, [el('div', { class: 'calc-range-title' }, 'The models\' own working time'), rangeBar(totals.minutes, hoursText)]),
    ]));
}

function differenceNode(value, baseline, format) {
  if (value == null || baseline == null || Math.abs(value - baseline) < 1e-9) return null;
  const cheaper = value < baseline;
  return el('small', { class: cheaper ? 'delta-pos' : 'delta-neg' }, `${format(Math.abs(value - baseline))} ${cheaper ? 'less' : 'more'} than ${state.modelMode === 'recommended' ? 'recommended' : 'your choice'}`);
}

const modelsOfTaskIn = (lines, task) => [...new Set(lines.filter((line) => line.task === task && line.model).map((line) => line.model))];
const sameKind = (line) => (other) => other.task === line.task && other.size === line.size;
const droppedLines = (choices) => choices[0].lines
  .filter((line) => !choices[0].shared.lines.includes(line))
  .map((line) => choices.map((choice) => choice.lines.find(sameKind(line))).find((candidate) => candidate.status !== 'ok'));

function comparePanel(choices) {
  const baseline = choices.find((choice) => choice.key === 'baseline') ?? choices.find((choice) => choice.key === 'recommended');
  const activeTasks = TASK_KEYS.filter((task) => state.counts[task] > 0);
  const modelsCell = (choice) => el('td', {}, activeTasks.map((task) => el('div', { class: 'calc-pick' }, [el('small', {}, taskLabel(task)), ...modelsOfTaskIn(choice.lines, task).map(modelName)])));
  const valueCell = (choice, field, format) => {
    const { expected } = choice.shared.totals[field];
    return el('td', {}, [expected == null ? '–' : format(expected), differenceNode(expected, baseline.shared.totals[field].expected, format)]);
  };
  const row = (label, build) => el('tr', {}, [el('th', {}, label), ...choices.map(build)]);
  const dropped = droppedLines(choices);
  const comparedCount = choices[0].shared.lines.length;
  return panel('COMPARE WITH OTHER CHOICES',
    el('p', { class: 'dim' }, 'The same work priced with other models, chosen for each task and ticket size. Cheapest and fastest are chosen only among models that produced a working result there and work at least three quarters as often as the best model there. Only kinds of work that every choice can do are added up, so the totals can be compared.'),
    el('div', { class: 'calc-wrap' }, el('table', { class: 'calc-table' }, [
      el('thead', {}, el('tr', {}, [el('th', {}, ''), ...choices.map((choice) => el('th', {}, choice.label))])),
      el('tbody', {}, [
        row('Models', modelsCell),
        row('Expected cost', (choice) => valueCell(choice, 'cost', totalMoneyText)),
        row('Expected working time', (choice) => valueCell(choice, 'minutes', hoursText)),
        row('Kinds of work compared', () => el('td', {}, `${comparedCount} of ${choices[0].lines.length}`)),
      ]),
    ])),
    dropped.length ? el('p', { class: 'dim' }, `Left out of every column because at least one choice could not do it: ${leftOutText(dropped)}.`) : null);
}

function surePanel({ lines, totals }) {
  const item = (line) => {
    const unknown = costUnknownText(line.figure);
    if (line.status === 'none-works') return el('li', {}, [el('strong', {}, `${lineLabel(line)}. `), 'No model produced a working result here.']);
    return el('li', {}, [el('strong', {}, `${lineLabel(line)}, ${line.model ? modelNameOf(line.model) : 'no model'}. `), `How often it works, and the usual cost and time of an attempt: ${surenessText(line.figure)}.`, unknown ? el('small', {}, unknown) : null]);
  };
  const countOf = (basis) => lines.filter((line) => line.figure.basis === basis).length;
  return panel('HOW SURE IS THIS?',
    el('ul', { class: 'calc-list' }, [
      ...lines.map(item),
      el('li', {}, [el('strong', {}, 'Attempts per working result. '), 'Worked out from how often it works, not measured.']),
      el('li', {}, [el('strong', {}, 'The total and the usual range. '), `Added up from the lines above: ${countOf('measured')} measured, ${countOf('few')} from few runs, ${countOf('estimated')} estimated, ${totals.leftOut.length} left out.`]),
    ]));
}

const limitsPanel = () => panel('WHAT THIS CANNOT TELL YOU',
  el('ul', { class: 'plain-list' }, [
    el('li', {}, 'The figures come from 5 real tickets of one project. Your project may differ.'),
    el('li', {}, 'Prices are list prices.'),
    el('li', {}, 'Time is the model\'s own working time, as its command-line tool reports it, for one run after another. Waiting for the project\'s checks and people\'s time are not counted.'),
  ]));

function numberField(label, value, onInput) {
  return el('label', {}, [label, el('input', { type: 'number', min: 0, step: 1, value, oninput: (event) => { onInput(Math.max(0, Math.floor(Number(event.target.value) || 0))); renderResults(); } })]);
}

function select(label, options, current, choose) {
  return el('label', {}, [label, el('select', { onchange: (event) => { choose(event.target.value); renderControls(); renderResults(); } },
    options.map(([value, text]) => el('option', { value, selected: value === current }, text)))]);
}

const modelOptions = (keys) => keys.map((key) => [key, modelNameOf(key)]);

function modelControls() {
  if (state.modelMode === 'one') return [select('Model', modelOptions(allModels), state.oneModel, (value) => { state.oneModel = value; })];
  if (state.modelMode !== 'each') return [];
  return TASK_KEYS.map((task) => select(taskLabel(task), modelOptions(modelsOfTask[task]), state.eachModels[task], (value) => { state.eachModels[task] = value; }));
}

function mixControls() {
  if (state.mix !== 'own') return [];
  return MIX_FIELDS.map(([size]) => numberField(`% ${size}`, state.percents[size], (value) => { state.percents[size] = value; }));
}

function renderControls() {
  const mixOptions = Object.entries(SIZE_MIXES).map(([key, mix]) => [key, key === 'seen' ? `${mix.label} (${seenSummary})` : mix.label]);
  const kbOptions = Object.entries(KNOWLEDGE_BASES).map(([key, kb]) => [key, kb.label]);
  mount(controlsSlot, panel('WHAT WORK DO YOU WANT TO PRICE?',
    el('p', { class: 'dim' }, 'How many times is each task done?'),
    el('div', { class: 'filters' }, TASK_KEYS.map((task) => numberField(taskLabel(task), state.counts[task], (value) => { state.counts[task] = value; }))),
    el('div', { class: 'filters' }, [select('Task size', mixOptions, state.mix, (value) => { state.mix = value; }), ...mixControls()]),
    el('div', { class: 'filters' }, [select('Model', Object.entries(MODEL_MODES), state.modelMode, (value) => { state.modelMode = value; }), ...modelControls()]),
    el('div', { class: 'filters' }, [select('Knowledge base', kbOptions, state.kb, (value) => { state.kb = value; }), copyLinkButton()])));
}

function renderResults() {
  saveState();
  const mix = currentMix();
  if (!mix) {
    const total = SIZE_KEYS.reduce((sum, size) => sum + state.percents[size], 0);
    mount(answerSlot, panel('THE ANSWER', el('p', { class: 'answer' }, `The three percentages add up to ${total}%; they need to add up to 100%.`)));
    mount(resultsSlot);
    return;
  }
  const pricing = priceWork(index, { counts: state.counts, mix, modelFor: currentModelFor(), kb: state.kb });
  const yours = state.modelMode === 'recommended' ? [] : [{ key: 'baseline', label: 'Your choice', ...pricing }];
  const choices = compareChoices(index, { counts: state.counts, mix, kb: state.kb, others: yours });
  mount(answerSlot, panel('THE ANSWER', el('p', { class: 'answer' }, answerSentence(pricing))));
  if (!pricing.lines.length) return mount(resultsSlot);
  mount(resultsSlot, breakdownPanel(pricing), rangePanel(pricing), comparePanel(choices), surePanel(pricing), limitsPanel());
}

const answerSlot = el('div');
const controlsSlot = el('div');
const resultsSlot = el('div');
mount(app,
  el('p', { class: 'dim' }, `Say how much work there is and how you want it done. Every figure comes from runs of real tickets, and a model that fails is paid for and tried again, so a cheap model that rarely works is not cheap. Numbers that are not measured directly are marked "estimated".`),
  answerSlot, controlsSlot, resultsSlot);
renderControls();
renderResults();
