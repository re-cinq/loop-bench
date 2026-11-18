// Best model per task: rank the models for the chosen task by the weight given to quality, price and speed.
import { mountChrome } from './chrome.js';
import { copyLinkButton, el, harnessMark, header, loadBench, markOf, mount, panel, readHash, svg, writeHash } from './lib.js';
import { extent, point, scale, separateLabels, xAxis, yAxis } from './plot.js';
import { minutesRangeText, minutesText, moneyRangeText } from './modelstory.js';
import { ranked, reliableChoices, splitByCoverage, summarizeModels } from './rank.js';
import { KNOWLEDGE_BASES, MEASURES, NONE_OR_ALL, SIZES, STRENGTHS, TASKS } from './words.js';

const PRESETS = [
  { label: 'Recommended', weights: { quality: 6, price: 2, speed: 2 } },
  { label: 'Equal weights', weights: { quality: 5, price: 5, speed: 5 } },
  { label: 'Best quality', weights: { quality: 10, price: 0, speed: 0 } },
];
const RULES = {
  cheapest: { label: 'Cheapest that works', phrase: 'the cheapest that still works', field: 'costPerSuccessUsd', explain: 'Among models that work at least three quarters as often as the best one, the lowest cost per working result.' },
  fastest: { label: 'Fastest that works', phrase: 'the fastest that still works', field: 'minutesPerSuccess', explain: 'Among models that work at least three quarters as often as the best one, the lowest working time per working result.' },
};
const WEIGHT_KEYS = [['quality', 'q'], ['price', 'p'], ['speed', 's']];
const DEFAULT_TASK = 'tdd-round';
const CHART = { width: 860, height: 440, margin: { top: 28, right: 24, bottom: 44, left: 52 } };

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('Which model is best for each task'));
const app = document.getElementById('app');
const allRuns = bench.modelStats.runs;

function stateFromHash() {
  const hash = readHash();
  const weightOf = (short, fallback) => (hash[short] === undefined ? fallback : Math.min(10, Math.max(0, Number(hash[short]) || 0)));
  const recommended = PRESETS[0].weights;
  return {
    task: TASKS[hash.task] ? hash.task : DEFAULT_TASK,
    rule: RULES[hash.rule] ? hash.rule : null,
    quality: weightOf('q', recommended.quality),
    price: weightOf('p', recommended.price),
    speed: weightOf('s', recommended.speed),
    size: SIZES[hash.size] ? hash.size : NONE_OR_ALL,
    kb: KNOWLEDGE_BASES[hash.kb] ? hash.kb : NONE_OR_ALL,
  };
}

const state = stateFromHash();

function saveState() {
  writeHash({ task: state.task, rule: state.rule, q: state.quality, p: state.price, s: state.speed, size: state.size === NONE_OR_ALL ? null : state.size, kb: state.kb === NONE_OR_ALL ? null : state.kb });
}

const money = (value) => {
  if (value == null) return '–';
  return value < 0.01 ? 'under $0.01' : `$${value.toFixed(2)}`;
};
const duration = (value) => (value == null ? '–' : minutesText(value));
const percent = (share) => `${Math.round(share * 100)}%`;
const reviewScore = (value) => (value == null ? '–' : `${value.toFixed(1)} of 5`);
const moneyRange = (spread) => (spread ? moneyRangeText(spread.p25, spread.p75) : null);
const minutesRange = (spread) => (spread ? minutesRangeText(spread.p25, spread.p75) : null);
const costPhrase = (value) => (value != null && value < 0.01 ? 'less than $0.01' : `about ${money(value)}`);
const exactMoney = (value) => `$${value.toFixed(2)}`;
const worksIn = (row) => `${row.successes} of ${row.runs} runs`;
const worksWithShare = (row) => `${worksIn(row)} (${percent(row.successRate)})`;
const hasReview = () => state.task !== 'dod';
const sizeOfTicket = Object.fromEntries(allRuns.map((run) => [run.ticket, run.size]));

function rowsFor() {
  const matching = allRuns.filter((run) => run.task === state.task
    && (state.size === NONE_OR_ALL || run.size === state.size)
    && (state.kb === NONE_OR_ALL || run.knowledgeBase === state.kb));
  const { fullyTested, notFullyTested } = splitByCoverage(summarizeModels(matching, { reviewed: hasReview() }), sizeOfTicket);
  const byScore = ranked(fullyTested, state);
  if (!state.rule) return { rows: byScore, notFullyTested, choices: null };
  const choices = reliableChoices(fullyTested);
  const eligibleModels = new Set(choices.eligible.map((row) => row.model));
  const eligible = byScore.filter((row) => eligibleModels.has(row.model)).sort((a, b) => (a[RULES[state.rule].field] ?? Infinity) - (b[RULES[state.rule].field] ?? Infinity));
  return { rows: [...eligible, ...byScore.filter((row) => !eligibleModels.has(row.model))], notFullyTested, choices };
}

function emphasisOf({ quality, price, speed }) {
  const total = quality + price + speed;
  if (total === 0) return 'the best balance of quality, price and speed';
  if (speed === 0 && price >= quality) return 'the best choice for a low price';
  const heavy = [['quality', quality], ['price', price], ['speed', speed]].find(([, weight]) => weight / total > 0.65);
  if (!heavy) return 'the best balance of quality, price and speed';
  return { quality: 'the best quality', price: 'the best choice when price matters most', speed: 'the best choice when speed matters most' }[heavy[0]];
}

function ruleAnswerText(choices) {
  const task = TASKS[state.task].activity;
  const winner = choices[state.rule];
  if (!winner) return `For ${task}, no model with enough runs worked here, so there is no ${RULES[state.rule].label.toLowerCase()} yet.`;
  const { best } = choices;
  const perResult = state.rule === 'cheapest' ? `${exactMoney(winner.costPerSuccessUsd)} per working result` : `about ${minutesText(winner.minutesPerSuccess)} per working result`;
  return `For ${task}, ${winner.model} is ${RULES[state.rule].phrase}: it works in ${worksWithShare(winner)}, at least three quarters as often as the best, ${best.model} (${percent(best.successRate)}), and costs ${state.rule === 'cheapest' ? perResult : `${costPhrase(winner.costUsd?.median)} a run`}${state.rule === 'fastest' ? ` and takes ${perResult}` : ''}.`;
}

function answerText(rows, choices) {
  const winner = rows[0];
  const task = TASKS[state.task].activity;
  if (!winner) return `There are no runs for ${task} with these filters yet.`;
  if (choices) return ruleAnswerText(choices);
  const fewRuns = winner.strength === 'few' ? ' Only a few runs back this up.' : '';
  const works = winner.successes ? `it works in ${worksWithShare(winner)}` : `it did not work in any of ${winner.runs} runs`;
  return `For ${task}, ${winner.model} is ${emphasisOf(state)}: ${works}, costs ${costPhrase(winner.costUsd?.median)} and takes about ${minutesText(winner.minutes?.median)}.${fewRuns}`;
}

function modelLink(row) {
  const name = el('a', { href: `model.html?m=${encodeURIComponent(`${row.harness}/${row.model}`)}` }, row.model);
  return el('span', { class: 'nowrap' }, [harnessMark(markOf(row)), name]);
}

function measureCell(measure, value, ...notes) {
  const noteNodes = notes.filter(Boolean).map((note) => el('small', {}, note));
  return el('div', { class: 'rank-cell', title: measure.explain }, [el('span', { class: 'label' }, measure.label), value, ...noteNodes]);
}

const costUnknownNote = (row) => (row.costUnknownRuns ? `cost unknown for ${row.costUnknownRuns} of ${row.runs} runs` : null);

function ruleTag(row, choices) {
  if (!choices || choices.eligible.some((eligible) => eligible.model === row.model)) return null;
  return el('span', { class: 'lore-tag', title: RULES[state.rule].explain }, 'works too rarely for this rule');
}

function rankRow(row, choices) {
  const fewTag = row.strength === 'few' ? el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label) : null;
  const cells = [
    measureCell(MEASURES.cost, money(row.costUsd?.median), moneyRange(row.costUsd), costUnknownNote(row)),
    measureCell(MEASURES.time, duration(row.minutes?.median), minutesRange(row.minutes)),
    hasReview() ? measureCell(MEASURES.review, reviewScore(row.review)) : null,
    measureCell(MEASURES.costPerWorking, money(row.costPerSuccessUsd)),
  ];
  return el('div', { class: 'rank-row' }, [
    el('div', { class: 'rank-main' }, [el('div', {}, [modelLink(row), ' ', fewTag, ruleTag(row, choices)]), el('div', { class: 'rank-works', title: MEASURES.works.explain }, `works in ${worksWithShare(row)}`)]),
    ...cells,
    el('div', { class: 'rank-bar', role: 'img', 'aria-label': `score ${Math.round(row.score * 100)} of 100`, title: `score ${Math.round(row.score * 100)} of 100` }, el('div', { class: 'rank-fill', style: `width: ${row.score * 100}%` })),
  ]);
}

function rankHead() {
  const cell = (measure) => el('div', { title: measure.explain }, measure.label);
  return el('div', { class: 'rank-row head' }, [el('div', {}, 'Model and how often it works'), cell(MEASURES.cost), cell(MEASURES.time), hasReview() ? cell(MEASURES.review) : null, cell(MEASURES.costPerWorking)]);
}

function notFullyTestedBlock(models) {
  if (!models.length) return null;
  const item = (row) => el('li', {}, [modelLink(row), ` ${row.missingText}; ${worksIn(row)} where it ran`]);
  return panel('NOT FULLY TESTED',
    el('p', { class: 'dim' }, 'These models skipped a ticket the others ran, so a fair comparison is not possible yet. They are not ranked.'),
    el('ul', { class: 'plain-list' }, models.map(item)));
}

function pointLabels(plotted, x, y, logCost, rightEdge) {
  const labels = plotted.filter((row) => row.strength === 'measured').map((row) => {
    const cx = x(logCost(row));
    const flipped = cx > rightEdge - 150;
    return { text: row.model, anchor: flipped ? 'end' : 'start', x: flipped ? cx - 8 : cx + 8, y: y(row.successRate) - 6, width: row.model.length * 6.4 };
  });
  return separateLabels(labels).map((label) => svg('text', { class: 'pt-label', x: label.x, y: label.y, 'text-anchor': label.anchor }, label.text));
}

function priceChart(rows) {
  const plotted = rows.filter((row) => row.costUsd);
  if (!plotted.length) return el('div', { class: 'note' }, 'No runs to plot yet.');
  const { width, height, margin } = CHART;
  const logCost = (row) => Math.log10(Math.max(row.costUsd.median, 0.001));
  const xDomain = extent(plotted.map(logCost));
  const yDomain = [0, 1];
  const x = scale(xDomain, [margin.left, width - margin.right]);
  const y = scale(yDomain, [height - margin.bottom, margin.top]);
  return svg('svg', { class: 'plot', viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-label': 'Share of runs that work against usual cost, one point per model' }, [
    yAxis({ y, domain: yDomain, left: margin.left, right: width - margin.right, format: (v) => `${Math.round(v * 100)}%`, label: 'share of runs that work' }),
    xAxis({ x, domain: xDomain, top: margin.top, bottom: height - margin.bottom, format: (v) => money(10 ** v), label: 'usual cost per run (log scale)', right: width - margin.right }),
    ...plotted.map((row) => point({ cx: x(logCost(row)), cy: y(row.successRate), harness: markOf(row), context: 'lore-mcp', title: `${row.model}\n${worksIn(row)} · ${money(row.costUsd.median)}` })),
    ...pointLabels(plotted, x, y, logCost, x(xDomain[1])),
  ]);
}

function slider([key]) {
  const input = el('input', { type: 'range', min: 0, max: 10, step: 1, value: state[key], 'aria-label': MEASURES[key].label, oninput: (event) => { state[key] = Number(event.target.value); state.rule = null; render(); } });
  return el('label', { class: 'slider', title: MEASURES[key].explain }, [`${MEASURES[key].label}: ${state[key]} of 10`, input]);
}

const matchesPreset = (preset) => !state.rule && WEIGHT_KEYS.every(([key]) => preset.weights[key] === state[key]);

function choiceButtons(options, current, choose) {
  return options.map(([value, label, tip]) => el('button', { class: value === current ? 'active' : '', title: tip, onclick: () => { choose(value); render(); } }, label));
}

function select(label, options, key) {
  return el('label', {}, [label, el('select', { onchange: (event) => { state[key] = event.target.value; render(); } },
    options.map(([value, text]) => el('option', { value, selected: state[key] === value }, text)))]);
}

function render() {
  saveState();
  const { rows, notFullyTested, choices } = rowsFor();
  const taskOptions = Object.entries(TASKS).map(([key, task]) => [key, task.label, task.explain]);
  const sizeOptions = [[NONE_OR_ALL, 'all'], ...Object.entries(SIZES).map(([key, size]) => [key, size.label])];
  const kbOptions = [[NONE_OR_ALL, 'all'], ...Object.entries(KNOWLEDGE_BASES).map(([key, kb]) => [key, kb.label])];

  mount(app,
    el('p', { class: 'dim' }, 'Every model was run many times on real tickets of one project. Pick a task, then say how much quality, price and speed matter to you, or pick a rule such as the cheapest model that still works. The list re-ranks as you move the sliders; a model that never worked is never ranked first. Every ticket counts equally: the share that works is the average over tickets, so running a model more on easy tickets does not help it. Hover a heading for what it means.'),
    panel('THE ANSWER FOR THIS TASK', el('p', { class: 'answer' }, answerText(rows, choices))),
    panel('WHAT MATTERS TO YOU',
      el('div', { class: 'tabs' }, choiceButtons(taskOptions, state.task, (value) => { state.task = value; })),
      el('div', { class: `sliders ${state.rule ? 'unused' : ''}` }, WEIGHT_KEYS.map(slider)),
      el('div', { class: 'presets' }, [
        ...PRESETS.map((preset) => el('button', { class: matchesPreset(preset) ? 'active' : '', onclick: () => { Object.assign(state, preset.weights, { rule: null }); render(); } }, preset.label)),
        ...Object.entries(RULES).map(([key, rule]) => el('button', { class: state.rule === key ? 'active' : '', title: rule.explain, onclick: () => { state.rule = key; render(); } }, rule.label)),
      ]),
      state.rule ? el('p', { class: 'dim' }, `${RULES[state.rule].explain} The sliders are not used while this is selected.`) : null,
      el('div', { class: 'filters' }, [select('Task size', sizeOptions, 'size'), select('Knowledge base', kbOptions, 'kb'), copyLinkButton()])),
    panel('WHICH MODEL SHOULD I PICK?', rows.length ? el('div', { class: `rank-table ${hasReview() ? '' : 'no-review'}` }, [rankHead(), ...rows.map((row) => rankRow(row, choices))]) : el('div', { class: 'note' }, 'No runs match these filters.')),
    notFullyTestedBlock(notFullyTested),
    panel('PRICE AGAINST RUNS THAT WORK',
      el('p', { class: 'dim' }, 'Top left is best: it works most often and costs least. Each point is one model; models with few runs are drawn but not named.'),
      priceChart(rows)),
  );
}

render();
