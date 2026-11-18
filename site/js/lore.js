// Does a knowledge base help? None, Lore and Utopia side by side, per task and then per model.
import { mountChrome } from './chrome.js';
import { minutesText, moneyText } from './findings.js';
import { compareKnowledgeBases, effectPerModel, KNOWLEDGE_BASE_KEYS, knowledgeAnswer } from './knowledge.js';
import { copyLinkButton, el, harnessMark, header, loadBench, markOf, mount, panel, readHash, svg, writeHash } from './lib.js';
import { point, scale, separateLabels, yAxis } from './plot.js';
import { KNOWLEDGE_BASES, STRENGTHS, TASKS } from './words.js';

const DEFAULT_TASK = 'tdd-round';
const CHART = { width: 760, height: 360, margin: { top: 24, right: 230, bottom: 30, left: 52 } };

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('Does giving the model a knowledge base help?'));
const app = document.getElementById('app');
const allRuns = bench.modelStats.runs;
const state = { task: TASKS[readHash().task] ? readHash().task : DEFAULT_TASK };

const percent = (share) => `${Math.round(share * 100)}%`;
const labelOf = (key) => KNOWLEDGE_BASES[key].label;
const points = (count) => `${Math.abs(count)} ${Math.abs(count) === 1 ? 'point' : 'points'}`;
const fewRunsTag = () => el('span', { class: 'lore-tag', title: STRENGTHS.few.explain }, STRENGTHS.few.label);

function taskTabs() {
  const tabs = Object.entries(TASKS).map(([key, task]) => el('button', {
    class: key === state.task ? 'active' : '', title: task.explain, onclick: () => { state.task = key; render(); },
  }, task.label));
  return el('div', { class: 'tabs' }, [...tabs, copyLinkButton()]);
}

function knowledgeBox(key, measures, { thin }) {
  return el('div', { class: 'kb-box', title: KNOWLEDGE_BASES[key].explain }, [
    el('h3', {}, [labelOf(key), ' ', thin ? fewRunsTag() : null]),
    el('div', { class: 'kb-big' }, percent(measures.successRate)),
    el('small', {}, `of ${measures.runs} runs work`),
    el('small', {}, `usual cost ${moneyText(measures.medianCostUsd)}`),
    el('small', {}, `usual time ${minutesText(measures.medianMinutes)}`),
  ]);
}

function comparisonPanel(comparison) {
  const loreIsThin = comparison.loreSetupsWithOneRun > comparison.setups / 2;
  const warning = loreIsThin
    ? el('div', { class: 'note' }, `Few runs for Lore: ${comparison.loreSetupsWithOneRun} of the ${comparison.setups} setups have only 1 Lore run. Treat the Lore numbers as a hint, not a result.`)
    : null;
  const boxes = KNOWLEDGE_BASE_KEYS.map((key) => knowledgeBox(key, comparison.byKnowledgeBase[key], { thin: key === 'lore-mcp' && loreIsThin }));
  return panel('WHAT CHANGES FOR THIS TASK?',
    el('p', { class: 'dim' }, `Only setups that ran with none, Lore and Utopia count: ${comparison.setups} setups, ${comparison.models} models. Share of runs that work, usual cost and usual time are taken over the same setups, so the three boxes are a fair comparison.`),
    el('div', { class: 'kb-compare' }, boxes),
    warning);
}

function effectCell(effect, thin) {
  const sign = effect.deltaPoints > 0 ? '+' : effect.deltaPoints < 0 ? '−' : '±';
  return el('td', { class: `verdict-${effect.verdict.split(' ')[0]}` }, [
    effect.verdict, ' ', thin ? fewRunsTag() : null,
    el('small', {}, `works ${percent(effect.successRate)} (${sign}${points(effect.deltaPoints)}), ${effect.runs} runs`),
  ]);
}

function modelPanel(effects) {
  if (!effects.length) return panel('DOES IT HELP EACH MODEL?', el('div', { class: 'note' }, 'No model ran this task with all three.'));
  const rows = effects.map((row) => el('tr', {}, [
    el('td', {}, [harnessMark(markOf(row)), el('a', { href: `model.html?m=${encodeURIComponent(`${row.harness}/${row.model}`)}` }, row.model), el('small', { class: 'dim' }, ` works ${percent(row.none.successRate)} with none`)]),
    effectCell(row.lore, row.lore.runs < row.setups * 2),
    effectCell(row.utopia, false),
  ]));
  const head = el('tr', {}, [el('th', {}, 'Model'), el('th', {}, `With ${labelOf('lore-mcp')}`), el('th', {}, `With ${labelOf('lore-utopia')}`)]);
  return panel('DOES IT HELP EACH MODEL?',
    el('p', { class: 'dim' }, 'Models with the biggest change come first. "Better" or "worse" means the share of runs that work moved by 5 points or more compared with none; anything smaller reads as about the same.'),
    el('div', { class: 'kb-table-wrap' }, el('table', { class: 'kb-effects' }, [el('thead', {}, head), el('tbody', {}, rows)])));
}

function slopeChart(effects) {
  const { width, height, margin } = CHART;
  const y = scale([0, 1], [height - margin.bottom, margin.top]);
  const xs = [margin.left + 30, margin.left + 30 + (width - margin.right - margin.left - 30) / 2, width - margin.right];
  const lines = effects.map((row) => ({ row, values: [row.none.successRate, row.lore.successRate, row.utopia.successRate] }));
  const labels = separateLabels(lines.map((line) => ({ line, x: xs[2] + 14, y: y(line.values[2]) + 4, width: line.row.model.length * 6, anchor: 'start' })));
  const labelFor = new Map(labels.map((label) => [label.line, label]));
  return svg('svg', { class: 'plot slopes', viewBox: `0 0 ${width} ${Math.max(height, ...labels.map((label) => label.y + 10))}`, role: 'img', 'aria-label': 'Share of runs that work with none, Lore and Utopia, one line per model' }, [
    yAxis({ y, domain: [0, 1], left: margin.left, right: xs[2] + 6, format: percent, label: 'share of runs that work' }),
    ...KNOWLEDGE_BASE_KEYS.map((key, index) => svg('text', { x: xs[index], y: height - 8, 'text-anchor': 'middle' }, labelOf(key))),
    ...lines.map((line) => {
      const { row, values } = line;
      const label = labelFor.get(line);
      return svg('g', {}, [
        svg('title', {}, `${row.model}: ${values.map(percent).join(' → ')}`),
        svg('polyline', { class: `slope pt-${markOf(row)}`, fill: 'none', points: values.map((value, index) => `${xs[index]},${y(value)}`).join(' ') }),
        ...values.map((value, index) => point({ cx: xs[index], cy: y(value), harness: markOf(row), context: KNOWLEDGE_BASE_KEYS[index], r: 4 })),
        svg('text', { class: 'slope-label', x: label.x, y: label.y }, row.model),
      ]);
    }),
  ]);
}

function chartPanel(effects) {
  if (!effects.length) return null;
  return panel('THE SAME NUMBERS AS A CHART',
    el('p', { class: 'dim' }, 'Each line is one model. Going up from left to right means the knowledge base helped it. Hollow dots: none; solid: Lore; faded: Utopia.'),
    el('div', { class: 'slope-wrap' }, slopeChart(effects)));
}

function render() {
  writeHash({ task: state.task });
  const taskRuns = allRuns.filter((run) => run.task === state.task);
  const comparison = compareKnowledgeBases(allRuns, state.task);
  const effects = effectPerModel(taskRuns);
  const labels = { activity: TASKS[state.task].activity, lore: labelOf('lore-mcp'), utopia: labelOf('lore-utopia') };
  mount(app,
    el('p', { class: 'dim' }, 'Lore is a store of the project\'s conventions and past decisions that the model can look things up in while it works. Utopia is a second store behind the same tool. We ran each task with no store, with Lore and with Utopia, then compared how often the project\'s checks passed.'),
    panel('THE ANSWER FOR THIS TASK', el('p', { class: 'answer' }, comparison.setups ? knowledgeAnswer(comparison, labels) : 'No setup of this task ran with all three yet.')),
    el('div', { class: 'filters' }, taskTabs()),
    comparison.setups ? comparisonPanel(comparison) : null,
    modelPanel(effects),
    chartPanel(effects));
}

render();
