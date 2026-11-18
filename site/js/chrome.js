// Status bar, nav, theme toggle and footer: the frame every page shares.
import { factsOf, moneyText } from './findings.js';
import { el } from './lib.js';

const PAGES = [
  { href: 'index.html', label: 'Home' },
  { href: 'best.html', label: 'Best model' },
  { href: 'grid.html', label: 'Overview' },
  { href: 'model.html', label: 'Models' },
  { href: 'setup.html', label: 'Repeats' },
  { href: 'compare.html', label: 'Compare' },
  { href: 'calculator.html', label: 'Calculator' },
  { href: 'lore.html', label: 'Knowledge' },
  { href: 'diff.html', label: 'Diffs' },
  { href: 'results.html', label: 'All results' },
  { href: 'methodology.html', label: 'Method' },
  { href: 'downloads.html', label: 'Downloads' },
];

function readStoredTheme() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}

function storeTheme(theme) {
  try { localStorage.setItem('theme', theme); } catch { /* private window: the toggle still works for this page */ }
}

const currentTheme = () => document.documentElement.dataset.theme || 'dark';
const themeLabel = () => (currentTheme() === 'dark' ? 'Light' : 'Dark');

function loadFrameStyles() {
  const link = el('link', { rel: 'stylesheet', href: 'css/frame.css' });
  document.head.append(link);
}

function renderNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const nav = el('nav', { class: 'top' }, el('a', { href: 'index.html', class: 'brand' }, 'AI model bench'));
  const menuButton = el('button', { class: 'menu-toggle', 'aria-expanded': 'false', onclick: () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  } }, 'Menu');
  nav.append(menuButton);
  const links = el('div', { class: 'links' }, PAGES.map((page) => el('a', { href: page.href, class: here === page.href ? 'active' : '' }, page.label)));
  nav.append(links);
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
  const facts = factsOf(bench.modelStats.runs, bench.totalCostUsd);
  const sep = () => el('span', { class: 'sep' }, '·');
  const fact = (value, label) => [el('strong', {}, value), ` ${label}`];
  document.body.prepend(el('div', { class: 'status' }, [
    el('span', { class: 'caret' }),
    ...fact(facts.runs.toLocaleString('en-US'), 'runs measured'), sep(),
    ...fact(facts.models, 'models tried'), sep(),
    ...fact(facts.tickets, 'real tickets used'), sep(),
    ...fact(moneyText(facts.totalCostUsd), 'spent on the runs'), sep(),
    'updated ', el('strong', {}, bench.generatedAt),
  ]));
}

function renderFooter(bench) {
  document.body.append(el('footer', { class: 'bottom' }, el('div', { class: 'footer-inner' }, [
    el('div', { class: 'footer-row footer-id' }, 'AI model bench: which AI model does which coding task best'),
    el('div', { class: 'footer-row footer-meta' }, `Measured on real, already-solved tickets of the project ${bench.subjectRepo} · instructions from Lore version ${bench.promptsLoreSha.slice(0, 8)}`),
  ])));
}

/** Applies the stored theme, draws the frame, and hands the page its data. */
export async function mountChrome(load) {
  const stored = readStoredTheme();
  if (stored) document.documentElement.dataset.theme = stored;
  loadFrameStyles();
  renderNav();
  const bench = await load();
  renderStatus(bench);
  renderFooter(bench);
  return bench;
}
