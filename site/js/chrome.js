// Status bar, nav, theme toggle and footer: the frame every page shares.
import { el, money } from './lib.js';

const PAGES = [
  { href: 'index.html', label: 'summary' },
  { href: 'results.html', label: 'results' },
  { href: 'lore.html', label: 'knowledge base' },
  { href: 'tradeoff.html', label: 'cost vs quality' },
  { href: 'diff.html', label: 'diffs' },
  { href: 'stations.html', label: 'stations' },
  { href: 'methodology.html', label: 'methodology' },
  { href: 'downloads.html', label: 'downloads' },
];

function readStoredTheme() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}

function storeTheme(theme) {
  try { localStorage.setItem('theme', theme); } catch { /* private window: the toggle still works for this page */ }
}

const currentTheme = () => document.documentElement.dataset.theme || 'dark';
const themeLabel = () => (currentTheme() === 'dark' ? '[light]' : '[dark]');

function renderNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const nav = el('nav', { class: 'top' }, el('a', { href: 'index.html', class: 'brand' }, 'LOOP://bench'));
  for (const page of PAGES) nav.append(el('a', { href: page.href, class: here === page.href ? 'active' : '' }, page.label));
  const themeButton = el('button', {
    onclick: () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      storeTheme(next);
      themeButton.textContent = themeLabel();
    },
  }, themeLabel());
  nav.append(el('span', { class: 'spacer' }), themeButton);
  document.body.prepend(nav);
}

function renderStatus(bench) {
  const done = bench.cells.filter((cell) => cell.status === 'done').length;
  const sep = () => el('span', { class: 'sep' }, '·');
  document.body.prepend(el('div', { class: 'status' }, [
    el('span', { class: 'caret' }), 'experiment: ', el('strong', {}, bench.experimentId), sep(),
    'loops: ', el('strong', {}, bench.loops), sep(),
    'cells: ', el('strong', {}, `${done}/${bench.cells.length}`), sep(),
    'spend: ', el('strong', {}, money(bench.totalCostUsd)), sep(),
    'updated: ', el('strong', {}, bench.generatedAt),
  ]));
}

function renderFooter(bench) {
  document.body.append(el('footer', { class: 'bottom' }, el('div', { class: 'footer-inner' }, [
    el('div', { class: 'footer-row footer-id' }, 'LOOP://bench, which model runs each implementation-loop station best'),
    el('div', { class: 'footer-row footer-meta' }, `subject ${bench.subjectRepo} · prompts from lore ${bench.promptsLoreSha.slice(0, 8)}`),
  ])));
}

/** Applies the stored theme, draws the frame, and hands the page its data. */
export async function mountChrome(load) {
  const stored = readStoredTheme();
  if (stored) document.documentElement.dataset.theme = stored;
  renderNav();
  const bench = await load();
  renderStatus(bench);
  renderFooter(bench);
  return bench;
}
