// Two results side by side: which files each changed, and each file's hunks next to the other's. Either side can be the merged pull request.
import { mountChrome } from './chrome.js';
import { copyLinkButton, el, header, loadBench, mount, panel, readHash, unique, writeHash } from './lib.js';
import { isTestPath, parsePatch } from './patch.js';
import { ticketName } from './tickets.js';
import { KNOWLEDGE_BASES, TASKS } from './words.js';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('What did two results change?'));
const app = document.getElementById('app');

const allRuns = [...bench.modelStats.runs].sort((a, b) => a.ticket - b.ticket || a.setup.localeCompare(b.setup) || a.replicate - b.replicate);
const setupLabel = (run) => `${run.model} · ${TASKS[run.task].label} · ${KNOWLEDGE_BASES[run.knowledgeBase].label} · ${ticketName(run.ticket, run.size, { short: true })}`;
const runSources = allRuns.map((run) => ({ key: `loop:${run.loopId}`, setup: run.setup, ticket: run.ticket, replicate: run.replicate, label: `${setupLabel(run)} · run ${run.replicate}`, url: `data/diffs/${run.loopId}.patch` }));
const fixSources = bench.tickets.map(({ number }) => ({ key: `pr:${number}`, setup: null, ticket: number, label: `The real fix for ${ticketName(number, null, { short: true })}`, url: `data/diffs/pr-${number}.patch` }));
const SOURCES = [...runSources, ...fixSources];
const sourceOf = (key) => SOURCES.find((source) => source.key === key);
const runsOfSetup = (setup) => runSources.filter((source) => source.setup === setup);
const setupOptions = [...new Map(allRuns.map((run) => [run.setup, setupLabel(run)]))];

function initialState() {
  const hash = readHash();
  const loopOfCell = (id) => bench.cells.find((cell) => cell.id === id)?.loopIds[0];
  const fromCells = (hash.cells ?? '').split(',').map(loopOfCell).filter(Boolean).map((id) => `loop:${id}`);
  const first = runSources[0];
  const a = sourceOf(hash.a) ? hash.a : fromCells[0] ?? first?.key;
  const b = sourceOf(hash.b) ? hash.b : fromCells[1] ?? (sourceOf(a) ? `pr:${sourceOf(a).ticket}` : undefined);
  return { a, b, file: hash.file, raw: hash.raw };
}
const state = initialState();

const patches = new Map();
const fetchText = (url) => fetch(url, { cache: 'no-cache' }).then((res) => (res.ok ? res.text() : null));

/** The patch with formatting noise removed, unless the raw one was asked for or this branch has no normalised copy (no prettier cached for its ticket). */
function patchOf(source) {
  const raw = state.raw === 'on';
  const key = `${source.key}:${raw}`;
  if (!patches.has(key)) {
    patches.set(key, (raw ? Promise.resolve(null) : fetchText(source.url.replace(/\.patch$/, '.normalized.patch')))
      .then((text) => text ?? fetchText(source.url))
      .then((text) => parsePatch(text ?? '')));
  }
  return patches.get(key);
}

function sidePicker(side) {
  const current = sourceOf(state[side]);
  const choose = (key) => { state[side] = key; state.file = ''; render(); };
  const chosenSetup = current.setup ?? current.key;
  const result = el('label', {}, [`Result ${side.toUpperCase()}`, el('select', { onchange: (event) => choose(event.target.value.startsWith('pr:') ? event.target.value : runsOfSetup(event.target.value)[0].key) }, [
    el('optgroup', { label: 'A model\'s work' }, setupOptions.map(([setup, text]) => el('option', { value: setup, selected: chosenSetup === setup }, text))),
    el('optgroup', { label: 'The real fix the team merged' }, fixSources.map((source) => el('option', { value: source.key, selected: chosenSetup === source.key }, source.label))),
  ])]);
  const siblings = current.setup ? runsOfSetup(current.setup) : [];
  if (siblings.length < 2) return result;
  const runPicker = el('label', {}, ['Run', el('select', { onchange: (event) => choose(event.target.value) },
    siblings.map((source) => el('option', { value: source.key, selected: current.key === source.key }, `run ${source.replicate} of ${siblings.length}`)))]);
  return el('span', { class: 'filters' }, [result, runPicker]);
}

const changeNode = (file) => (file
  ? el('span', { class: 'nowrap' }, [el('span', { class: 'dim' }, `${file.status} `), el('span', { class: 'delta-pos' }, `+${file.additions}`), ' ', el('span', { class: 'delta-neg' }, `−${file.deletions}`)])
  : el('span', { class: 'dim' }, 'not changed'));

function fileTable(rows) {
  const head = el('tr', {}, ['File', 'Changed by', 'A', 'B'].map((label) => el('th', {}, label)));
  const body = rows.map((row) => el('tr', { class: `clickable ${state.file === row.path ? 'row-sel' : ''}`, onclick: () => { state.file = row.path; render(); } }, [
    el('td', {}, [row.path, isTestPath(row.path) ? el('span', { class: 'lore-tag' }, 'test') : null]),
    el('td', { class: row.where === 'both' ? 'accent' : 'warn' }, row.where),
    el('td', {}, changeNode(row.a)),
    el('td', {}, changeNode(row.b)),
  ]));
  return el('div', { class: 'table-wrap' }, el('table', { class: 'data' }, [el('thead', {}, head), el('tbody', {}, body)]));
}

const LANGUAGE_BY_EXTENSION = { ts: 'typescript', tsx: 'typescript', mts: 'typescript', cts: 'typescript', js: 'javascript', jsx: 'javascript', mjs: 'javascript', cjs: 'javascript', json: 'json', md: 'markdown', yml: 'yaml', yaml: 'yaml', css: 'css', html: 'xml', sh: 'bash' };
const KIND_CLASS = { '+': 'add', '-': 'del', ' ': '' };

/** Highlighted HTML for one line when highlight.js loaded and knows the language; plain text otherwise. Lines are highlighted one at a time, so a comment spanning lines loses its colour after the first. */
function codeNode(text, language) {
  const node = el('span', { class: 'code' });
  if (window.hljs && language && window.hljs.getLanguage(language)) node.innerHTML = window.hljs.highlight(text, { language, ignoreIllegals: true }).value;
  else node.textContent = text;
  return node;
}

function hunksNode(file) {
  if (!file) return el('p', { class: 'dim' }, 'This side did not change the file.');
  if (file.binary) return el('p', { class: 'dim' }, 'Binary file.');
  const language = LANGUAGE_BY_EXTENSION[file.path.split('.').pop()];
  return el('div', { class: 'code-view' }, file.hunks.flatMap((hunk) => [
    el('div', { class: 'code-hunk' }, hunk.header),
    ...hunk.lines.map((line) => el('div', { class: `code-row ${KIND_CLASS[line.kind]}` }, [
      el('span', { class: 'ln' }, line.oldNo ?? ''),
      el('span', { class: 'ln' }, line.newNo ?? ''),
      el('span', { class: 'sign' }, line.kind),
      codeNode(line.text, language),
    ])),
  ]));
}

function sidesNode(row, sources) {
  return el('div', { class: 'diff-sides' }, [['a', row.a], ['b', row.b]].map(([side, file]) => el('div', { class: 'diff-side' }, [
    el('div', { class: 'diff-side-head' }, [el('strong', {}, side.toUpperCase()), ` ${sources[side].label} `, changeNode(file)]),
    hunksNode(file),
  ])));
}

const filesText = (count) => `${count} ${count === 1 ? 'file' : 'files'}`;
const overlapSentence = ({ a, b, shared, either }) => `A changed ${filesText(a)} and B changed ${filesText(b)}; ${shared} ${shared === 1 ? 'file was' : 'files were'} changed by both${either ? ` (${Math.round((shared / either) * 100)}% of the ${filesText(either)} either one touched)` : ''}.`;

async function render() {
  writeHash(state);
  const sources = { a: sourceOf(state.a), b: sourceOf(state.b) };
  const pickers = el('div', { class: 'filters' }, [sidePicker('a'), sidePicker('b'), el('button', { onclick: () => { [state.a, state.b] = [state.b, state.a]; render(); } }, '[swap]'),
    el('label', { title: 'Both sides of every changed .ts file are run through the repository\'s prettier before they are compared, and blank-line-only changes are dropped.' }, [
      el('input', { type: 'checkbox', checked: state.raw === 'on', onchange: (e) => { state.raw = e.target.checked ? 'on' : ''; render(); } }), 'also show formatting-only changes',
    ]), copyLinkButton()]);
  if (!sources.a || !sources.b) {
    mount(app, el('div', { class: 'note' }, 'No run has a recorded change yet.'));
    return;
  }

  const [filesA, filesB] = await Promise.all([patchOf(sources.a), patchOf(sources.b)]);
  const byPath = (files) => new Map(files.map((file) => [file.path, file]));
  const [mapA, mapB] = [byPath(filesA), byPath(filesB)];
  const rows = unique([...mapA.keys(), ...mapB.keys()]).map((path) => ({
    path, a: mapA.get(path), b: mapB.get(path), where: mapA.has(path) && mapB.has(path) ? 'both' : mapA.has(path) ? 'only A' : 'only B',
  }));
  const shared = rows.filter((row) => row.where === 'both').length;
  const selected = rows.find((row) => row.path === state.file);

  mount(app,
    el('p', { class: 'dim' }, 'Pick two results. Each is everything one run of a model changed in the project for a ticket, or the real fix the team merged. The table lists the files each changed; click a file to read the two versions of its changes next to each other.'),
    panel('WHICH FILES DID EACH CHANGE?', el('p', { class: 'answer' }, overlapSentence({ a: mapA.size, b: mapB.size, shared, either: rows.length })), sources.a.ticket === sources.b.ticket ? null : el('div', { class: 'note' }, 'These two results are for different tickets, so they are not expected to change the same files.')),
    panel('WHICH TWO RESULTS?', pickers, fileTable(rows)),
    selected ? panel(selected.path, sidesNode(selected, sources)) : el('p', { class: 'dim' }, 'Click a file above to see its changes.'),
  );
}

await render();
