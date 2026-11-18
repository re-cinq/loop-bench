// Building blocks shared by the run-to-run page and the single-run page: what one run wrote, in what order, and what it edited.
import { copyLinkButton, el } from './lib.js';
export { copyLinkButton };
import { ticketName } from './tickets.js';
import { editedTestText, linesText, orderOfWorkLine, weakeningWarning } from './setup-facts.js';

const runFiles = new Map();

export function loadRunFile(loopId) {
  if (!runFiles.has(loopId)) {
    runFiles.set(loopId, fetch(`data/runs/${loopId}.json`, { cache: 'no-cache' }).then((res) => (res.ok ? res.json() : null)));
  }
  return runFiles.get(loopId);
}

export const ticketLabel = (run) => ticketName(run.ticket, run.size);
export const diffLink = (run) => `diff.html#a=loop:${run.loopId}&b=pr:${run.ticket}`;
export const runLink = (run) => `run.html#id=${run.loopId}`;
export const subhead = (text) => el('h4', { class: 'sub' }, text);
export const note = (text) => el('p', { class: 'dim small' }, text);

export function testCard(test, { open = false, tag = null } = {}) {
  const code = test.code ? el('details', { class: 'code-fold', open }, [el('summary', {}, 'show the test code'), el('pre', { class: 'test-code' }, test.code)]) : null;
  return el('div', { class: 'test-card' }, [
    el('div', { class: 'test-name' }, [test.name, tag ? el('span', { class: 'lore-tag on' }, tag) : null]),
    test.proves ? el('p', { class: 'test-proves' }, test.proves) : null,
    test.file ? el('div', { class: 'test-file' }, test.file) : null,
    code,
  ]);
}

export const approachNode = (runFile) => (runFile?.dod?.approach ? el('p', {}, runFile.dod.approach) : null);

export function outOfScopeNode(runFile) {
  const items = runFile?.dod?.outOfScope ?? [];
  return items.length ? el('ul', { class: 'plain-list' }, items.map((item) => el('li', {}, item))) : note('Nothing was left out of scope.');
}

export function planNode(runFile) {
  const tests = runFile?.dod?.tests ?? [];
  if (!tests.length) return note('No test plan was given.');
  const list = el('ul', { class: 'plain-list' }, tests.map((test) => el('li', {}, test.name)));
  if (tests.length <= 4) return list;
  return el('details', { class: 'code-fold' }, [el('summary', {}, `${tests.length} tests in the plan`), list]);
}

export const linesNode = (runFile) => (runFile?.diff ? el('p', {}, linesText(runFile.diff)) : null);

export function orderNode(runFile) {
  const rounds = runFile?.orderOfWork;
  if (!rounds?.length) return null;
  return el('div', {}, [el('ul', { class: 'plain-list' }, rounds.map((round) => el('li', {}, orderOfWorkLine(round)))), note('Read from the command log; a best guess, not a measurement.')]);
}

function editedList(entries) {
  return el('ul', { class: 'plain-list' }, entries.map((entry) => el('li', {}, [
    el('span', { class: 'test-file' }, entry.file), ` ${editedTestText(entry)}`,
    entry.removedTitles.length ? el('div', { class: 'dim small' }, `tests removed: ${entry.removedTitles.join('; ')}`) : null,
    entry.removedSample.length ? el('details', { class: 'code-fold' }, [el('summary', {}, 'show lines removed'), el('pre', { class: 'test-code' }, entry.removedSample.join('\n'))]) : null,
  ])));
}

export function editsNode(runFile) {
  const tampering = runFile?.diff?.tampering;
  if (!tampering) return null;
  const warning = weakeningWarning(tampering);
  const { changedGivenTests: given, editedExistingTests: existing } = tampering;
  const body = [
    warning ? el('p', { class: 'weakened' }, warning) : null,
    given.length ? el('div', {}, [el('div', { class: 'dim small' }, `Tests it was given (${given.length})`), editedList(given)]) : null,
    existing.length ? el('div', {}, [el('div', { class: 'dim small' }, `Other tests that already existed (${existing.length})`), editedList(existing)]) : null,
    given.length || existing.length ? null : note('It did not edit any test that already existed.'),
  ];
  return el('div', {}, body);
}
