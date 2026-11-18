// Run to run: does the same setup (task, model, knowledge base, ticket) give the same result every time?
import { mountChrome } from './chrome.js';
import { el, header, loadBench, mount, panel, readHash, writeHash } from './lib.js';
import { alignTests, agreementSentence, defaultPair, groupSetups, minutesText, mostAgreeing, mostDisagreeing, moneyText, reliabilitySentence, reviewScoreOf, setupHash, testsOf, testsWrittenOf, widestCostSwing, worked } from './setup-facts.js';
import { moneyRangeText } from './modelstory.js';
import { ticketName } from './tickets.js';
import { approachNode, copyLinkButton, diffLink, editsNode, linesNode, loadRunFile, orderNode, outOfScopeNode, planNode, runLink, note, subhead, testCard, ticketLabel } from './run-view.js';
import { KNOWLEDGE_BASES, TASKS } from './words.js';

const SELECTION_KEYS = ['task', 'ticket', 'model', 'kb'];
const CARD_LIMIT = 6;

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('Does the same setup give the same result every time?'));
const app = document.getElementById('app');
const groups = groupSetups(bench.modelStats.runs);
const sizeOfTicket = Object.fromEntries(bench.modelStats.runs.map((run) => [run.ticket, run.size]));

const valueOf = {
  task: (group) => group.task,
  ticket: (group) => String(group.ticket),
  model: (group) => `${group.harness}/${group.model}`,
  kb: (group) => group.knowledgeBase,
};
const labelOf = {
  task: (value) => TASKS[value]?.label ?? value,
  ticket: (value) => ticketName(Number(value), sizeOfTicket[value]),
  model: (value) => value.slice(value.indexOf('/') + 1),
  kb: (value) => KNOWLEDGE_BASES[value]?.label ?? value,
};
const SELECT_LABELS = { task: 'Task', ticket: 'Ticket', model: 'Model', kb: 'Knowledge base' };

const matches = (group, selection, exceptKey) => SELECTION_KEYS.every((key) => key === exceptKey || !selection[key] || valueOf[key](group) === selection[key]);

function stateFromHash() {
  const hash = readHash();
  const selection = Object.fromEntries(SELECTION_KEYS.map((key) => [key, hash[key] ?? '']));
  const consistent = groups.some((group) => matches(group, selection));
  return { ...(consistent ? selection : Object.fromEntries(SELECTION_KEYS.map((key) => [key, '']))), a: hash.a ?? '', b: hash.b ?? '' };
}

let state = stateFromHash();
let renderToken = 0;

const chosenGroup = () => (SELECTION_KEYS.every((key) => state[key]) ? groups.find((group) => matches(group, state)) : null);

function optionValues(key) {
  const values = new Set(groups.filter((group) => matches(group, state, key)).map(valueOf[key]));
  return [...values].sort((first, second) => String(first).localeCompare(String(second), undefined, { numeric: true }));
}

function selector(key) {
  const options = optionValues(key).map((value) => el('option', { value, selected: state[key] === value }, labelOf[key](value)));
  const choose = el('option', { value: '', selected: !state[key] }, 'choose');
  return el('label', {}, [SELECT_LABELS[key], el('select', { onchange: (event) => { state[key] = event.target.value; state.a = ''; state.b = ''; render(); } }, [choose, ...options])]);
}

function selectPanel() {
  const box = panel('SELECT', el('div', { class: 'filters' }, SELECTION_KEYS.map(selector)));
  box.querySelector('.panel-head').append(copyLinkButton());
  return box;
}

const costRangeText = (group) => {
  const costs = group.runs.map((run) => run.costUsd).filter((cost) => cost != null);
  if (!costs.length) return 'cost unknown';
  return `costs ${moneyRangeText(Math.min(...costs), Math.max(...costs))}`;
};

function setupCard(group) {
  const stat = `${worked(group)} of ${group.runs.length} runs worked · ${costRangeText(group)}`;
  return el('a', { class: 'setup-card', href: `setup.html#${setupHash(group)}` }, [
    el('strong', {}, `${TASKS[group.task].label} · ${group.model}`),
    el('span', { class: 'dim small' }, `knowledge base: ${KNOWLEDGE_BASES[group.knowledgeBase].label} · ticket ${ticketLabel(group)}`),
    el('span', { class: 'small' }, stat),
  ]);
}

function cardsBlock(heading, explanation, picked) {
  if (!picked.length) return null;
  return el('div', {}, [subhead(heading), note(explanation), el('div', { class: 'card-grid' }, picked.map(setupCard))]);
}


function overviewView() {
  const candidates = groups.filter((group) => matches(group, state));
  mount(app,
    el('p', { class: 'dim' }, 'Every setup was run several times. This page shows whether those runs agree: whether they all work, what they cost, how long the model works on them, and which tests they write. Pick a task, ticket, model and knowledge base, or start from one of the examples below.'),
    panel('THE ANSWER', el('p', { class: 'answer' }, agreementSentence(candidates))),
    selectPanel(),
    panel('WHERE REPEATS DIFFER MOST',
      cardsBlock('Some runs work and some do not', 'The setups where the runs split most evenly between working and not working.', mostDisagreeing(candidates, CARD_LIMIT)),
      cardsBlock('The widest swing in cost', 'The same setup, the dearest run costing many times the cheapest.', widestCostSwing(candidates, CARD_LIMIT))),
    panel('WHERE THEY AGREE', cardsBlock('Every run works, at about the same cost', 'Setups with five or more runs that all worked, closest in cost first.', mostAgreeing(candidates, CARD_LIMIT)) ?? note('No setup here has five or more runs that all worked.')),
  );
}

function chosenRuns(group) {
  const [defaultA, defaultB] = defaultPair(group.runs);
  const byNumber = (value, fallback) => group.runs.find((run) => String(run.replicate) === value)?.replicate ?? fallback;
  return [byNumber(state.a, defaultA), byNumber(state.b, defaultB)];
}

const worksText = (run) => (run.success ? 'works' : 'does not work');
const reviewText = (run) => { const score = reviewScoreOf(run); return score == null ? '–' : `${score.toFixed(1)} of 5`; };
const statItem = (label, value, className = '') => el('div', { class: `stat-line ${className}` }, [el('span', { class: 'dim' }, label), el('span', {}, value)]);

function overviewColumn(run, runFile, task, [numberA, numberB]) {
  const tampering = runFile?.diff?.tampering;
  const chosen = [numberA, numberB].includes(run.replicate);
  const written = testsWrittenOf(runFile);
  return el('div', { class: `run-col ${chosen ? 'chosen' : ''}` }, [
    el('div', { class: 'run-col-head' }, `Run ${run.replicate}`),
    el('div', { class: run.success ? 'accent' : 'alert' }, worksText(run)),
    statItem('cost', run.costUsd == null ? 'unknown' : moneyText(run.costUsd)),
    statItem('time', run.minutes == null ? '–' : minutesText(run.minutes)),
    task === 'dod' ? null : statItem('retries', run.rounds),
    statItem('tests written', written ?? '–'),
    task === 'dod' ? null : statItem('AI reviewer', reviewText(run)),
    task === 'dod' || !tampering ? null : statItem('edited given tests', tampering.changedGivenTests.length),
    tampering?.flagged ? el('div', { class: 'weakened small' }, 'weakened a test it was given') : null,
  ]);
}

function sideHead(run, number) {
  return el('div', { class: 'pair-cell' }, [
    el('div', { class: 'side-title' }, [el('strong', {}, `Run ${number}`), ' ', el('span', { class: run.success ? 'accent' : 'alert' }, worksText(run)), el('span', { class: 'dim' }, ` · ${run.costUsd == null ? 'cost unknown' : moneyText(run.costUsd)} · ${run.minutes == null ? '' : minutesText(run.minutes)}`)]),
    el('div', { class: 'side-links' }, [el('a', { href: diffLink(run) }, 'see every file this run changed'), el('a', { href: runLink(run) }, 'open this run')]),
  ]);
}

function pairSection(heading, sides, build) {
  const cells = sides.map((side) => ({ number: side.number, node: build(side.file) }));
  if (cells.every((cell) => !cell.node)) return null;
  const cellNode = (cell) => el('div', { class: 'pair-cell' }, [el('div', { class: 'pair-label dim small' }, `Run ${cell.number}`), cell.node ?? el('span', { class: 'dim' }, '–')]);
  return el('div', { class: 'section' }, [subhead(heading), el('div', { class: 'pair' }, cells.map(cellNode))]);
}

function testRows(task, sides) {
  const [first, second] = sides;
  const rows = alignTests(testsOf(task, first.file), testsOf(task, second.file));
  if (!rows.length) return note('Neither run added any tests.');
  const cellFor = (test, side, other) => {
    if (!test) return el('div', { class: 'pair-cell absent dim small' }, `not in run ${side.number}`);
    return el('div', { class: 'pair-cell' }, [el('div', { class: 'pair-label dim small' }, `Run ${side.number}`), testCard(test, { tag: other ? null : `only in run ${side.number}` })]);
  };
  const renderedRows = rows.map((row) => el('div', { class: 'pair test-row' }, [cellFor(row.a, first, row.b), cellFor(row.b, second, row.a)]));
  return el('div', {}, [...renderedRows, note('Tests are lined up only when their names are exactly the same. Tests with similar names are not matched.')]);
}

function comparison(group, sides) {
  if (sides.length < 2) return note('This setup has only one run, so there is nothing to compare it with.');
  const task = group.task;
  const tests = el('div', { class: 'section' }, [subhead(task === 'dod' ? 'Tests it wrote' : 'Tests it added'), testRows(task, sides)]);
  if (task === 'dod') {
    return el('div', {}, [pairSection('What it said it would do', sides, approachNode), tests, pairSection('Left out of scope', sides, outOfScopeNode)]);
  }
  return el('div', {}, [
    pairSection('Test plan it was given', sides, planNode), tests, pairSection('Test code against product code', sides, linesNode),
    pairSection('Order of work', sides, orderNode), pairSection('Changes to tests that already existed', sides, editsNode),
  ]);
}

function runPicker(group, side, number) {
  const options = group.runs.map((run) => el('option', { value: String(run.replicate), selected: run.replicate === number }, `Run ${run.replicate} · ${worksText(run)} · ${run.costUsd == null ? 'cost unknown' : moneyText(run.costUsd)}`));
  return el('label', {}, [side, el('select', { onchange: (event) => { state[side === 'Left run' ? 'a' : 'b'] = event.target.value; render(); } }, options)]);
}

async function setupView(group) {
  const token = renderToken;
  const files = await Promise.all(group.runs.map((run) => loadRunFile(run.loopId)));
  if (token !== renderToken) return;
  const fileOf = (run) => files[group.runs.indexOf(run)];
  const numbers = chosenRuns(group);
  writeHash({ ...state, a: numbers[0], b: numbers[1] });
  const runOf = (number) => group.runs.find((run) => run.replicate === number);
  const sides = numbers.filter((number) => number != null).map((number) => ({ number, run: runOf(number), file: fileOf(runOf(number)) }));
  const testCounts = files.map(testsWrittenOf);
  const strip = el('div', { class: 'run-strip' }, group.runs.map((run) => overviewColumn(run, fileOf(run), group.task, numbers)));
  const links = sides.length === 2 ? el('p', {}, el('a', { href: `diff.html#a=loop:${sides[0].run.loopId}&b=loop:${sides[1].run.loopId}` }, "compare these two runs' files side by side")) : null;

  mount(app,
    el('p', { class: 'dim' }, 'Each column is one run of the same setup. The runs differ only by chance, so any difference below is the model not being steady. Pick two runs to read side by side; they start as the two that differ most.'),
    panel('THE ANSWER', el('p', { class: 'answer' }, reliabilitySentence(group.task, group.runs, testCounts))),
    selectPanel(),
    panel('HOW DID EACH RUN GO?', strip),
    panel('TWO RUNS SIDE BY SIDE',
      el('div', { class: 'filters' }, [runPicker(group, 'Left run', numbers[0]), numbers[1] == null ? null : runPicker(group, 'Right run', numbers[1])]),
      el('div', { class: 'pair' }, sides.map((side) => sideHead(side.run, side.number))),
      links,
      comparison(group, sides)),
  );
}

function render() {
  renderToken += 1;
  const group = chosenGroup();
  writeHash(state);
  if (!group) return overviewView();
  return setupView(group);
}

window.addEventListener('hashchange', () => { state = stateFromHash(); render(); });
await render();
