// One run in full: what it was, whether it worked, every test it wrote with its code, the order of work and the edits to existing tests.
import { mountChrome } from './chrome.js';
import { el, header, loadBench, mount, panel, readHash } from './lib.js';
import { minutesText, moneyText, reviewScoreOf, runSentence, setupHash, testsOf, testsWrittenOf } from './setup-facts.js';
import { approachNode, copyLinkButton, diffLink, editsNode, linesNode, loadRunFile, note, orderNode, outOfScopeNode, planNode, subhead, testCard, ticketLabel } from './run-view.js';
import { END_REASONS, KNOWLEDGE_BASES, TASKS } from './words.js';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('What happened in this run?'));
const app = document.getElementById('app');

const runId = readHash().id;
const run = bench.modelStats.runs.find((candidate) => candidate.loopId === runId);

const fact = (label, value) => el('div', { class: 'stat-line' }, [el('span', { class: 'dim' }, label), el('span', {}, value)]);
const section = (title, ...children) => (children.some(Boolean) ? panel(title, ...children.filter(Boolean)) : null);

function factsPanel(runFile) {
  const reviewed = run.task !== 'dod';
  const score = reviewScoreOf(run);
  const written = testsWrittenOf(runFile);
  const box = panel('WHAT WAS THIS RUN?', el('div', { class: 'run-facts' }, [
    fact('task', TASKS[run.task].label),
    fact('model', run.model),
    fact('knowledge base', KNOWLEDGE_BASES[run.knowledgeBase].label),
    fact('ticket and size', ticketLabel(run)),
    fact('the project\'s checks', run.success ? 'passed' : 'did not pass'),
    fact('cost', run.costUsd == null ? 'unknown (the run was stopped before it reported usage)' : moneyText(run.costUsd)),
    fact('time', run.minutes == null ? '–' : minutesText(run.minutes)),
    reviewed ? fact('retries', run.rounds) : null,
    reviewed ? fact('AI reviewer score', score == null ? '–' : `${score.toFixed(1)} of 5`) : null,
    fact('tests written', written ?? '–'),
    fact('how it ended', END_REASONS[run.endReason]?.label ?? run.endReason),
  ]));
  return box;
}

function testsPanel(runFile) {
  const tests = testsOf(run.task, runFile);
  const heading = run.task === 'dod' ? 'THE TESTS IT WROTE' : 'THE TESTS IT ADDED';
  const body = tests.length ? tests.map((test) => testCard(test, { open: true })) : [note('This run added no tests.')];
  if (run.task === 'dod') return panel(heading, approachNode(runFile), ...body, subhead('Left out of scope'), outOfScopeNode(runFile));
  return panel(heading, subhead('Test plan it was given'), planNode(runFile), subhead('Tests it added'), ...body, linesNode(runFile));
}

const linksPanel = () => panel('WHERE TO GO NEXT', el('ul', { class: 'plain-list' }, [
  el('li', {}, el('a', { href: diffLink(run) }, 'see every file this run changed')),
  el('li', {}, el('a', { href: `setup.html#${setupHash(run)}&a=${run.replicate}` }, `back to the other runs of this setup (this was run ${run.replicate})`)),
]));

async function render() {
  if (!run) {
    mount(app, el('div', { class: 'note' }, 'No run with this id. Open a run from the Run to run page.'));
    return;
  }
  const runFile = await loadRunFile(run.loopId);
  const sentence = runSentence(run, { taskActivity: TASKS[run.task].activity, knowledgeBaseLabel: KNOWLEDGE_BASES[run.knowledgeBase].label });
  const answer = panel('THE ANSWER', el('p', { class: 'answer' }, sentence));
  answer.querySelector('.panel-head').append(copyLinkButton());
  mount(app,
    el('p', { class: 'dim' }, 'One run in full: what it was, whether the project\'s checks passed, and everything it wrote. Test code is shown open here.'),
    answer,
    factsPanel(runFile),
    testsPanel(runFile),
    section('ORDER OF WORK, ROUND BY ROUND', orderNode(runFile)),
    run.task === 'dod' ? null : section('CHANGES TO TESTS THAT ALREADY EXISTED', editsNode(runFile)),
    linksPanel(),
  );
}

await render();
