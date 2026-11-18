// Models: how each model behaves, and how steady it is between repeats of the same setup.
import { mountChrome } from './chrome.js';
import { copyLinkButton, el, harnessMark, header, loadBench, markOf, mount, panel, readHash, writeHash } from './lib.js';
import { DEFAULT_SORT, isSortKey, segmentCounts } from './modelcards.js';
import { overviewNodes } from './modeloverview.js';
import { cardSentence, minutesRangeText, minutesText, moneyRangeText, moneyText, standingOf, summaryParagraph } from './modelstory.js';
import { summarizeModels, splitByCoverage } from './rank.js';
import { ticketName } from './tickets.js';
import { failureCounts, flipped, groupSetups, isFewRuns, knowledgeSentence, steadinessSentences } from './steadiness.js';
import { FAILURE_REASONS, KNOWLEDGE_BASES, MAKERS, MEASURES, SIZES, STRENGTHS, TASKS } from './words.js';

const bench = await mountChrome(loadBench);
const app = document.getElementById('app');
const allRuns = bench.modelStats.runs;
const taskKeys = Object.keys(TASKS);
const knowledgeBaseKeys = Object.keys(KNOWLEDGE_BASES);
const sizeKeys = Object.keys(SIZES);
const sizeOfTicket = Object.fromEntries(allRuns.map((run) => [run.ticket, run.size]));
const keyOf = (item) => `${item.harness}/${item.model}`;
const hasReview = (task) => task !== 'dod';

const rowsByTask = Object.fromEntries(taskKeys.map((task) => [task, summarizeModels(allRuns.filter((run) => run.task === task), { reviewed: hasReview(task) })]));
const coverageByTask = Object.fromEntries(taskKeys.map((task) => [task, splitByCoverage(rowsByTask[task], sizeOfTicket)]));
const models = [...new Map(taskKeys.flatMap((task) => rowsByTask[task]).map((row) => [keyOf(row), row])).values()]
  .sort((a, b) => a.model.localeCompare(b.model, undefined, { numeric: true }));
const modelKeys = new Set(models.map(keyOf));

function chosenFromUrl() {
  const fromHash = readHash().m;
  const fromQuery = new URLSearchParams(location.search).get('m');
  const chosen = fromHash ?? fromQuery ?? '';
  return modelKeys.has(chosen) ? chosen : '';
}

const hashState = readHash();
const state = { m: chosenFromUrl(), sort: isSortKey(hashState.sort) ? hashState.sort : DEFAULT_SORT, group: hashState.group === '1', view: hashState.view === 'table' ? 'table' : 'cards' };
history.replaceState(null, '', location.pathname + location.hash);

const percent = (share) => `${Math.round(share * 100)}%`;
const moneyRange = (spread) => (spread ? moneyRangeText(spread.p25, spread.p75) : null);
const minutesRange = (spread) => (spread ? minutesRangeText(spread.p25, spread.p75) : null);
const shortMoney = (value) => (value == null ? '–' : moneyText(value));
const shortMinutes = (value) => (value == null ? '–' : minutesText(value));
const fewTag = () => el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label);

function modelSelect() {
  const makerOf = (row) => MAKERS[markOf(row)];
  const groups = [...Map.groupBy(models, makerOf).entries()];
  const select = el('select', { onchange: (event) => { state.m = event.target.value; render(); } }, [
    el('option', { value: '' }, 'All models'),
    ...groups.map(([maker, rows]) => el('optgroup', { label: maker }, rows.map((row) => el('option', { value: keyOf(row), selected: keyOf(row) === state.m }, row.model)))),
  ]);
  return el('label', {}, ['Model', select]);
}

function picker() {
  return el('div', { class: 'm-picker' }, [modelSelect(), copyLinkButton()]);
}

function entryOf(model) {
  const taskFigures = {};
  const counts = {};
  const sentences = {};
  let notFullyTested = null;
  for (const task of taskKeys) {
    const row = rowsByTask[task].find((candidate) => keyOf(candidate) === keyOf(model));
    if (!row) continue;
    const unranked = coverageByTask[task].notFullyTested.find((candidate) => keyOf(candidate) === keyOf(model));
    notFullyTested ??= unranked ? `${TASKS[task].label}: ${unranked.missingText}` : null;
    taskFigures[task] = { share: row.successRate, cost: row.costUsd?.median ?? null, minutes: row.minutes?.median ?? null, ranked: !unranked };
    counts[task] = segmentCounts(allRuns.filter((run) => run.task === task && keyOf(run) === keyOf(model)));
    sentences[task] = `${TASKS[task].label}. ${cardSentence(task, row)}`;
  }
  const fewRuns = taskKeys.some((task) => rowsByTask[task].find((row) => keyOf(row) === keyOf(model))?.strength === 'few');
  return { key: keyOf(model), model: model.model, harness: model.harness, mark: markOf(model), maker: MAKERS[markOf(model)], tasks: taskFigures, counts, sentences, notFullyTested, fewRuns };
}

const overviewEntries = models.map(entryOf);

function chooseModel(key) {
  state.m = key;
  render();
  window.scrollTo(0, 0);
}

function overview() {
  const choose = (change) => { Object.assign(state, change); render(); };
  const link = (entry, children) => el('a', { href: `model.html?m=${entry.key}`, onclick: (event) => { event.preventDefault(); chooseModel(entry.key); } }, children);
  return overviewNodes({ entries: overviewEntries, state, choose, link, extraControls: [modelSelect(), copyLinkButton()] });
}

function standingsFor(model) {
  const standings = {};
  for (const task of taskKeys) {
    const row = rowsByTask[task].find((candidate) => keyOf(candidate) === model);
    if (!row) continue;
    const { fullyTested, notFullyTested } = coverageByTask[task];
    const unranked = notFullyTested.find((candidate) => keyOf(candidate) === model);
    standings[task] = unranked ? { works: null, cost: null, time: null, missingText: unranked.missingText } : standingOf(row, fullyTested);
  }
  return standings;
}

function stat(measure, value, ...notes) {
  return el('div', { class: 'm-stat', title: measure.explain }, [el('span', { class: 'label' }, measure.label), el('span', { class: 'value' }, value), ...notes.filter(Boolean).map((note) => el('small', {}, note))]);
}

function taskPanel(task, row, roundsMedian) {
  const costUnknown = row.costUnknownRuns ? `cost unknown for ${row.costUnknownRuns} of ${row.runs} runs` : null;
  const stats = [
    stat(MEASURES.works, `${row.successes} of ${row.runs}`, `runs work (${percent(row.successRate)} counting each ticket equally)`, row.strength === 'few' ? STRENGTHS.few.label : null),
    stat(MEASURES.cost, shortMoney(row.costUsd?.median), moneyRange(row.costUsd), costUnknown),
    stat(MEASURES.time, shortMinutes(row.minutes?.median), minutesRange(row.minutes)),
    hasReview(task) ? stat(MEASURES.review, row.review == null ? '–' : `${row.review.toFixed(1)} of 5`) : null,
    hasReview(task) ? stat({ label: 'usual rounds', explain: 'How many rounds of trying a usual run takes.' }, roundsMedian == null ? '–' : String(roundsMedian)) : null,
    stat(MEASURES.costPerWorking, shortMoney(row.costPerSuccessUsd)),
  ];
  return panel(`${TASKS[task].label.toUpperCase()}: HOW WELL DOES IT DO?`, el('div', { class: 'm-stats' }, stats));
}

const roundsOf = (task, model) => bench.modelStats.models.find((row) => row.task === task && keyOf(row) === model && row.knowledgeBase == null && row.ticket == null && row.size == null)?.roundsMedian;

function setupHref(task, model, setup) {
  return `setup.html#task=${task}&model=${model}&kb=${setup.knowledgeBase}&ticket=${setup.ticket}`;
}

const SIZE_ORDER = Object.fromEntries(sizeKeys.map((size, index) => [size, index]));
const setupOrder = (a, b) => (SIZE_ORDER[a.size] - SIZE_ORDER[b.size]) || (a.ticket - b.ticket) || (knowledgeBaseKeys.indexOf(a.knowledgeBase) - knowledgeBaseKeys.indexOf(b.knowledgeBase));

function dot(run) {
  const result = run.success ? 'works' : 'does not work';
  const cost = run.costUsd == null ? 'cost unknown' : moneyText(run.costUsd);
  const reason = run.success ? '' : `, ${FAILURE_REASONS[run.endReason]?.label ?? run.endReason}`;
  return el('span', { class: `m-dot ${run.success ? '' : 'fails'}`, title: `Run ${run.replicate}: ${result}${reason}. ${cost}, ${shortMinutes(run.minutes)}.` });
}

function strip(task, model, setup) {
  const worked = setup.runs.filter((run) => run.success).length;
  const label = `${ticketName(setup.ticket, setup.size, { short: true })}, ${KNOWLEDGE_BASES[setup.knowledgeBase].label}`;
  const countText = setup.runs.length === 1 ? '1 run' : `${worked} of ${setup.runs.length} work`;
  const marker = flipped(setup) ? ' · flips' : '';
  return el('a', { class: 'm-strip', href: setupHref(task, model, setup), title: `${ticketName(setup.ticket, setup.size)}. See every run of this setup` }, [
    el('span', {}, label),
    el('span', { class: 'm-dots' }, setup.runs.map(dot)),
    el('span', { class: 'm-count' }, `${countText}${marker}`),
  ]);
}

function steadinessPanel(model, modelRuns) {
  const setups = groupSetups(modelRuns);
  const taskBlocks = taskKeys.map((task) => {
    const taskSetups = setups.filter((setup) => setup.task === task).sort(setupOrder);
    if (!taskSetups.length) return null;
    return el('div', {}, [
      el('div', { class: 'm-task-head' }, TASKS[task].label),
      ...taskSetups.map((setup) => strip(task, model, setup)),
    ]);
  });
  return panel('HOW STEADY IS IT?',
    el('div', { class: 'm-sentences' }, steadinessSentences(setups).map((sentence) => el('p', {}, sentence))),
    el('div', { class: 'm-key' }, [
      el('span', {}, [el('span', { class: 'm-dot' }), 'run works']),
      el('span', {}, [el('span', { class: 'm-dot fails' }), 'run does not work']),
      el('span', {}, 'one dot per run, in run order'),
    ]),
    ...taskBlocks);
}

function failurePanel(modelRuns) {
  const counts = failureCounts(modelRuns);
  const tasks = taskKeys.filter((task) => counts[task]);
  const reasons = Object.keys(FAILURE_REASONS).filter((reason) => tasks.some((task) => counts[task][reason]));
  if (!tasks.length) return panel('HOW DOES IT FAIL?', el('p', {}, 'Every run worked.'));
  const head = el('tr', {}, [el('th', {}, 'What happened'), ...tasks.map((task) => el('th', { class: 'num' }, TASKS[task].label))]);
  const body = reasons.map((reason) => el('tr', {}, [
    el('td', { title: FAILURE_REASONS[reason].explain }, FAILURE_REASONS[reason].label),
    ...tasks.map((task) => el('td', { class: 'num' }, counts[task][reason] ?? 0)),
  ]));
  return panel('HOW DOES IT FAIL?',
    el('p', { class: 'dim' }, 'The last thing that happened in runs where the project\'s checks did not pass.'),
    el('div', { class: 'm-table-wrap' }, el('table', { class: 'm-table' }, [el('thead', {}, head), el('tbody', {}, body)])));
}

function knowledgePanel(model) {
  const differences = bench.modelStats.knowledgeDifferences.filter((difference) => keyOf(difference) === model);
  const arm = (difference) => (isFewRuns(difference.runsWithKb) || isFewRuns(difference.runsWithout));
  const item = (difference) => {
    const kb = KNOWLEDGE_BASES[difference.knowledgeBase];
    const { successRate, medianCostUsd, medianMinutes } = difference;
    const numbers = `works ${percent(successRate.withKb)} with it, ${percent(successRate.without)} without · cost ${shortMoney(medianCostUsd.withKb)} with, ${shortMoney(medianCostUsd.without)} without · time ${shortMinutes(medianMinutes.withKb)} with, ${shortMinutes(medianMinutes.without)} without · ${difference.runsWithKb} runs with, ${difference.runsWithout} without`;
    return el('li', {}, [
      el('strong', {}, `${TASKS[difference.task].label}, ${kb.label}. `),
      knowledgeSentence(difference, kb.label),
      ' ',
      arm(difference) ? fewTag() : null,
      el('small', {}, numbers),
    ]);
  };
  const ordered = [...differences].sort((a, b) => (taskKeys.indexOf(a.task) - taskKeys.indexOf(b.task)) || (knowledgeBaseKeys.indexOf(a.knowledgeBase) - knowledgeBaseKeys.indexOf(b.knowledgeBase)));
  return panel('DOES THE KNOWLEDGE BASE HELP IT?',
    el('p', { class: 'dim' }, 'Each line compares runs with a knowledge base against runs with none, on the same tickets. A line marked few runs rests on fewer than five runs in one of the two groups.'),
    ordered.length ? el('ul', { class: 'm-list' }, ordered.map(item)) : el('p', {}, 'This model was not compared with a knowledge base.'));
}

function sizesPanel(modelRuns) {
  const rows = taskKeys.flatMap((task) => sizeKeys.map((size) => {
    const runs = modelRuns.filter((run) => run.task === task && run.size === size);
    return runs.length ? { task, size, summary: summarizeModels(runs, { reviewed: false })[0] } : null;
  })).filter(Boolean);
  const line = ({ task, size, summary }) => el('tr', {}, [
    el('td', {}, TASKS[task].label),
    el('td', { title: SIZES[size].explain }, size),
    el('td', { class: 'num' }, `${summary.successes} of ${summary.runs}`),
    el('td', { class: 'num' }, percent(summary.successRate)),
    el('td', { class: 'num' }, shortMoney(summary.costUsd?.median)),
    el('td', { class: 'num' }, shortMinutes(summary.minutes?.median)),
    el('td', {}, summary.strength === 'few' ? fewTag() : null),
  ]);
  const head = el('tr', {}, ['Task', 'Ticket size', 'Runs that work', 'Share', 'Usual cost', 'Usual time', ''].map((text, index) => el('th', { class: index >= 2 && index < 6 ? 'num' : '' }, text)));
  return panel('HOW DOES IT DO ON SMALL, MEDIUM AND LARGE TASKS?',
    el('p', { class: 'dim' }, 'All knowledge bases together. A size with no row was not run.'),
    el('div', { class: 'm-table-wrap' }, el('table', { class: 'm-table' }, [el('thead', {}, head), el('tbody', {}, rows.map(line))])));
}

function detail(model) {
  const modelRuns = allRuns.filter((run) => keyOf(run) === model);
  const name = model.split('/')[1];
  const taskPanels = taskKeys
    .map((task) => [task, rowsByTask[task].find((row) => keyOf(row) === model)])
    .filter(([, row]) => row)
    .map(([task, row]) => taskPanel(task, row, roundsOf(task, model)));
  return [
    el('p', { class: 'dim' }, 'Every model was run many times on the same tickets. Standings compare this model with the others that ran every ticket, counting each ticket equally. The dots show whether the model gives the same answer when the same setup is repeated. Hover a heading or a dot for what it means.'),
    picker(),
    panel('WHAT KIND OF MODEL IS THIS?', el('p', { class: 'm-answer' }, summaryParagraph(name, standingsFor(model)))),
    ...taskPanels,
    steadinessPanel(model, modelRuns),
    failurePanel(modelRuns),
    knowledgePanel(model),
    sizesPanel(modelRuns),
  ];
}

function render() {
  writeHash(state.m ? { m: state.m } : { sort: state.sort === DEFAULT_SORT ? null : state.sort, group: state.group ? '1' : null, view: state.view === 'table' ? 'table' : null });
  const title = state.m ? `How does ${state.m.split('/')[1]} behave?` : 'How does each model behave?';
  document.getElementById('header').replaceChildren(header(title));
  mount(app, ...(state.m ? detail(state.m) : overview()));
}

render();
