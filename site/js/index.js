// Home: what this is, the recommended model per task, what we learned, and a guide to the other pages.
import { mountChrome } from './chrome.js';
import { factsOf, findingsOf, minutesText, moneyText, recommendations } from './findings.js';
import { el, harnessMark, header, loadBench, markOf, mount, panel } from './lib.js';
import { KNOWLEDGE_BASES, TASKS } from './words.js';

const PAGE_GUIDE = [
  ['best.html', 'Best model', 'Pick a task and say how much quality, price and speed matter; get a ranked list.'],
  ['grid.html', 'Overview', 'One grid of every model against every task, coloured by how often it works.'],
  ['model.html', 'Models', 'One page per model: how it does on each task and how steady it is.'],
  ['setup.html', 'Repeats', 'The same setup run again and again, to see how much a result changes by chance.'],
  ['compare.html', 'Compare', 'Put up to four models or setups side by side.'],
  ['calculator.html', 'Calculator', 'Estimate what a batch of work would cost and take with the models you choose.'],
  ['lore.html', 'Knowledge', 'Whether giving the model a knowledge base of the project helps.'],
  ['diff.html', 'Diffs', 'Read the files and changes any two runs produced, next to the real fix.'],
  ['results.html', 'All results', 'The raw table with every number, for people who want to check.'],
  ['methodology.html', 'Method', 'How we measured, what the words mean, and what the data cannot tell you.'],
  ['downloads.html', 'Downloads', 'The raw records and the summary file behind every page.'],
];

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('Which AI model should do which coding task?'));
const app = document.getElementById('app');
const runs = bench.modelStats.runs;
const facts = factsOf(runs, bench.totalCostUsd);

const percent = (share) => `${Math.round(share * 100)}%`;

function introPanel() {
  return el('div', {}, [
    el('p', { class: 'dim' }, `We took ${facts.tickets} real tickets that a software team had already solved, and gave each one to ${facts.models} AI models, several times over. Each result was then checked: do the project's own checks pass? That makes ${facts.runs.toLocaleString('en-US')} runs, which cost ${moneyText(facts.totalCostUsd)} to run.`),
    el('p', { class: 'dim' }, 'Below is the model we would pick for each task, what the numbers taught us, and where to look next.'),
  ]);
}

function recommendationCard(item) {
  const link = el('a', { href: `model.html?m=${encodeURIComponent(`${item.harness}/${item.model}`)}` }, item.model);
  return el('div', { class: 'home-card' }, [
    el('div', { class: 'home-card-task', title: TASKS[item.task].explain }, TASKS[item.task].label),
    el('div', { class: 'home-card-model' }, [harnessMark(markOf(item)), link]),
    el('p', {}, `works in ${item.successes} of ${item.runs} runs (${percent(item.successRate)})`),
    el('p', { class: 'dim' }, `usual cost ${moneyText(item.costUsd)}, usual time ${minutesText(item.minutes)}`),
    el('a', { href: item.href }, 'See every model for this task'),
  ]);
}

function recommendationsPanel() {
  return panel('WHICH MODEL FOR WHICH TASK?',
    el('p', { class: 'dim' }, 'Picked by weighing quality 6, price 2 and speed 2, among models that ran every ticket. Change the weights on the Best model page.'),
    el('div', { class: 'home-cards' }, recommendations(runs).map(recommendationCard)));
}

function findingsPanel() {
  const items = findingsOf(runs).map((finding) => el('li', {}, [finding.text, ' ', el('a', { href: finding.href }, 'See the numbers')]));
  return panel('WHAT WE LEARNED', el('ul', { class: 'home-findings' }, items));
}

function guidePanel() {
  const items = PAGE_GUIDE.map(([href, label, line]) => el('li', {}, [el('a', { href }, label), ` ${line}`]));
  return panel('HOW TO READ THIS SITE', el('ul', { class: 'home-guide' }, items));
}

function progressRow(model) {
  const share = model.planned ? model.done / model.planned : 0;
  const bar = el('div', {
    class: 'progress-bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(model.planned), 'aria-valuenow': String(model.done),
    'aria-label': `${model.model}: ${model.done} of ${model.planned} planned runs finished`,
  }, el('div', { class: 'progress-fill', style: `width: ${share * 100}%` }));
  const split = Object.entries(KNOWLEDGE_BASES).map(([key, kb]) => `${kb.label} ${model.byContext[key].done} of ${model.byContext[key].planned}`).join(' · ');
  return el('div', { class: 'progress-row' }, [
    el('div', {}, [harnessMark(markOf(model)), model.model]),
    bar,
    el('div', { class: 'progress-count' }, `${model.done}/${model.planned}`),
    el('div', { class: 'progress-split dim' }, `Knowledge base: ${split}`),
  ]);
}

function completenessPanel() {
  const progress = bench.progress ?? [];
  return el('details', { class: 'panel home-complete' }, [
    el('summary', {}, 'HOW COMPLETE IS THE DATA?'),
    el('p', { class: 'dim' }, 'For each model, the runs finished out of the runs we planned. Models that are not finished have fewer runs behind their numbers.'),
    progress.length ? el('div', {}, progress.map(progressRow)) : el('div', { class: 'note' }, 'No progress information in this build.'),
  ]);
}

mount(app, introPanel(), recommendationsPanel(), findingsPanel(), guidePanel(), completenessPanel());
