// Two branches side by side: which files each changed, and each file's hunks next to the other's. Either side can be the merged pull request.
import { mountChrome } from './chrome.js';
import { cellName, el, header, isDone, loadBench, mount, panel, readHash, two, unique, writeHash } from './lib.js';
import { isTestPath, parsePatch } from './patch.js';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('FILES & DIFFS'));
const app = document.getElementById('app');

/** Every branch a side can show: each replicate of each finished cell, then each ticket's merged pull request. */
const SOURCES = [
  ...bench.cells.filter(isDone).flatMap((cell) => cell.loopIds.map((loopId, i) => ({
    key: `loop:${loopId}`, ticket: cell.ticket, label: `${cellName(cell)}${cell.loopIds.length > 1 ? ` · rep ${i + 1}` : ''}`, url: `data/diffs/${loopId}.patch`,
  }))),
  ...unique(bench.cells.map((cell) => cell.ticket)).map((ticket) => ({ key: `pr:${ticket}`, ticket, label: `merged PR · ticket #${ticket}`, url: `data/diffs/pr-${ticket}.patch` })),
];
const sourceOf = (key) => SOURCES.find((source) => source.key === key);

function initialState() {
  const hash = readHash();
  const fromCells = (hash.cells ?? '').split(',').map((id) => bench.cells.find((cell) => cell.id === id)?.loopIds[0]).filter(Boolean).map((id) => `loop:${id}`);
  const first = SOURCES.find((source) => source.key.startsWith('loop:'));
  const a = hash.a ?? fromCells[0] ?? first?.key;
  const b = hash.b ?? fromCells[1] ?? (sourceOf(a) ? `pr:${sourceOf(a).ticket}` : undefined);
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
  return el('label', {}, [side.toUpperCase(), el('select', { onchange: (e) => { state[side] = e.target.value; state.file = ''; render(); } },
    SOURCES.map((source) => el('option', { value: source.key, selected: state[side] === source.key }, source.label)))]);
}

const changeNode = (file) => (file
  ? el('span', { class: 'nowrap' }, [el('span', { class: 'dim' }, `${file.status} `), el('span', { class: 'delta-pos' }, `+${file.additions}`), ' ', el('span', { class: 'delta-neg' }, `−${file.deletions}`)])
  : el('span', { class: 'dim' }, 'not changed'));

function fileTable(rows) {
  const head = el('tr', {}, ['file', 'in', 'A', 'B'].map((label) => el('th', {}, label)));
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

async function render() {
  writeHash(state);
  const sources = { a: sourceOf(state.a), b: sourceOf(state.b) };
  const pickers = el('div', { class: 'filters' }, [sidePicker('a'), sidePicker('b'), el('button', { onclick: () => { [state.a, state.b] = [state.b, state.a]; render(); } }, '[swap]'),
    el('label', { title: 'Both sides of every changed .ts file are run through the repository\'s prettier before they are compared, and blank-line-only changes are dropped.' }, [
      el('input', { type: 'checkbox', checked: state.raw === 'on', onchange: (e) => { state.raw = e.target.checked ? 'on' : ''; render(); } }), 'show formatting changes (raw patch)',
    ])]);
  if (!sources.a || !sources.b) {
    mount(app, el('div', { class: 'note' }, 'No finished loop has a diff yet.'));
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
    el('p', { class: 'dim' }, 'Pick two branches. Each is the whole change a loop pushed from the ticket\'s base commit, or the change the team merged. Click a file to read both sides\' hunks next to each other.'),
    sources.a.ticket === sources.b.ticket ? null : el('div', { class: 'note' }, 'These two branches solve different tickets, so their files are not expected to overlap.'),
    panel('BRANCHES', pickers, el('p', {}, [
      `A changed ${mapA.size} files, B changed ${mapB.size}; ${shared} in both. `,
      el('span', { class: 'dim' }, `Jaccard overlap ${two(rows.length ? shared / rows.length : 0)}.`),
    ]), fileTable(rows)),
    selected ? panel(selected.path, sidesNode(selected, sources)) : el('p', { class: 'dim' }, 'Click a file above to see its diff.'),
  );
}

await render();
