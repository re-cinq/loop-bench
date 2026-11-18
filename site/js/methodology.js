// How we measured: a short document, a glossary built from words.js, and limits computed from the data.
import { mountChrome } from './chrome.js';
import { header, el, loadBench, mount } from './lib.js';
import { groupSetups } from './steadiness.js';
import { END_REASONS, KNOWLEDGE_BASES, MEASURES, SIZES, STRENGTHS, TASKS } from './words.js';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('How did we measure this?'));
const app = document.getElementById('app');
const runs = bench.modelStats.runs;

const ticketCount = new Set(runs.map((run) => run.ticket)).size;
const ticketsOfSize = (size) => new Set(runs.filter((run) => run.size === size).map((run) => run.ticket)).size;
const bold = (text) => el('strong', {}, text);

const COUNTS_AS_WORKING = {
  dod: 'the tests fail on the old code and pass once the real fix is applied. That shows they test the right thing.',
  'tdd-round': 'the project\'s own checks pass on the code the model wrote.',
  'repair-build': 'the project\'s own checks pass again after the model\'s repair.',
};

const GLOSSARY_GROUPS = [
  ['Tasks', TASKS],
  ['Knowledge bases', KNOWLEDGE_BASES],
  ['Task sizes', SIZES],
  ['Measures', { ...MEASURES, ...STRENGTHS }],
  ['How a run ended', END_REASONS],
];

function glossaryGroup([title, terms]) {
  const items = Object.values(terms).filter((term) => term.explain);
  return [el('h3', {}, title), el('dl', { class: 'glossary' }, items.flatMap((term) => [el('dt', {}, term.label), el('dd', {}, term.explain)]))];
}

function tasksBlock() {
  return Object.entries(TASKS).map(([key, task]) => el('div', { class: 'method-task' }, [
    el('p', {}, [bold(task.label), el('br'), task.explain]),
    el('p', {}, `It counts as working when ${COUNTS_AS_WORKING[key]}`),
  ]));
}

function limitItem(lead, rest) {
  return el('li', {}, [bold(`${lead} `), rest]);
}

function limitsList() {
  const unknownCost = runs.filter((run) => run.costUsd == null).length;
  const loreSetups = groupSetups(runs.filter((run) => run.knowledgeBase === 'lore-mcp'));
  const loreSingles = loreSetups.filter((setup) => setup.runs.length === 1).length;
  return el('ul', {}, [
    limitItem(`Only ${ticketCount} tickets, one project.`, 'Results may not carry over to other projects.'),
    limitItem('Few tickets of each size.', `There are ${ticketsOfSize('small')} small, ${ticketsOfSize('medium')} medium and ${ticketsOfSize('large')} large. A size with one ticket is one example, not a trend.`),
    limitItem('The reviewer is an AI.', 'Its scores are an opinion, not a measurement.'),
    limitItem('Lore has few runs.', `Most Lore setups have 1 run (${loreSingles} of ${loreSetups.length}), so the Lore numbers are a hint, not a result.`),
    limitItem('Some costs are missing.', `${unknownCost} runs have no recorded cost because they were stopped before reporting it. They are left out of every cost number, never counted as free.`),
    limitItem('Prices are list prices.', 'They are the tokens used at published prices, not what any contract would charge.'),
    limitItem('Times are the model\'s working time.', 'Waiting for the project\'s checks is not counted, so it is shorter than the time a person would wait. The OpenAI models\' tool reports no duration, so for them it is how long the process ran.'),
    limitItem('"Edited tests it was given" is a flag.', 'It is read automatically from the changes a model made. It is something to look at, not a verdict.'),
  ]);
}

const SECTIONS = [
  ['what-we-did', 'What did we do?', () => el('p', {}, `We took ${ticketCount} real tickets that a software team had already solved. Each AI model got the ticket and the project as it was before the fix, tried to do three kinds of work, and we checked what it produced. Every model did every task several times, with and without a knowledge base.`)],
  ['tasks', 'The three tasks and when a run works', tasksBlock],
  ['setup-and-run', 'What are a setup and a run?', () => el('p', {}, 'A setup is one task, one model, one knowledge base choice and one ticket. A run is one attempt at a setup. Most setups were run several times, because the same setup can work one time and fail the next.')],
  ['reviewer', 'The AI reviewer', () => el('p', {}, 'Another AI model reads each result and scores it from 1 to 5 against the real fix: is it correct, is it complete, is it close to what a person wrote. Treat the score as an opinion. It is not used for writing the tests, because it gives every test-writing result the same top score.')],
  ['best-score', 'How is "best" scored?', () => el('p', {}, 'Quality counts 6, price 2 and speed 2 by default; you can change that on the Best model page. Every ticket counts equally, however often it was run. Models that skipped a ticket are not ranked, because they would be judged on easier work.')],
  ['limits', 'Limits', limitsList],
  ['words', 'What the words mean', () => GLOSSARY_GROUPS.flatMap(glossaryGroup)],
];

const contents = el('nav', { class: 'method-contents', 'aria-label': 'Contents' }, el('ul', {}, SECTIONS.map(([id, title]) => el('li', {}, el('a', { href: `#${id}` }, title)))));
const sections = SECTIONS.map(([id, title, content]) => el('section', { id }, [el('h2', {}, title), ...[].concat(content())]));

mount(app, el('div', { class: 'method' }, [
  el('p', { class: 'dim' }, 'Short answers to how the numbers on this site were made, what they mean, and what they cannot tell you.'),
  contents,
  ...sections,
]));
