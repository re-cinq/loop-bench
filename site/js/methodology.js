// How we measured: plain panels, a glossary built from words.js, and limits computed from the data.
import { mountChrome } from './chrome.js';
import { header, el, loadBench, mount, panel } from './lib.js';
import { groupSetups } from './steadiness.js';
import { END_REASONS, KNOWLEDGE_BASES, MEASURES, SIZES, STRENGTHS, TASKS } from './words.js';

const bench = await mountChrome(loadBench);
document.getElementById('header').append(header('How did we measure this?'));
const app = document.getElementById('app');
const runs = bench.modelStats.runs;

const ticketsOfSize = (size) => new Set(runs.filter((run) => run.size === size).map((run) => run.ticket)).size;
const bullets = (items) => el('ul', {}, items.map((item) => el('li', {}, item)));
const bold = (text) => el('strong', {}, text);

const WORKS_RULE = {
  dod: 'The tests fail on the old code and pass once the real fix is applied. That shows they test the right thing.',
  'tdd-round': 'The project\'s own checks pass on the code the model wrote.',
  'repair-build': 'The project\'s own checks pass again after the model\'s repair.',
};

function glossaryList() {
  const glossary = { ...TASKS, ...KNOWLEDGE_BASES, ...SIZES, ...MEASURES, ...END_REASONS, ...STRENGTHS };
  const terms = Object.values(glossary).filter((term) => term.explain);
  return el('dl', { class: 'glossary' }, terms.flatMap((term) => [el('dt', {}, term.label), el('dd', {}, term.explain)]));
}

function limitsList() {
  const unknownCost = runs.filter((run) => run.costUsd == null).length;
  const loreSetups = groupSetups(runs.filter((run) => run.knowledgeBase === 'lore-mcp'));
  const loreSingles = loreSetups.filter((setup) => setup.runs.length === 1).length;
  return bullets([
    `Only ${new Set(runs.map((run) => run.ticket)).size} tickets, all from one project. Results may not carry over to other projects.`,
    `The tickets are ${ticketsOfSize('small')} small, ${ticketsOfSize('medium')} medium and ${ticketsOfSize('large')} large. A size with one ticket is one example, not a trend.`,
    'The AI reviewer is an AI, so its scores are an opinion, not a measurement.',
    `Most Lore setups have 1 run (${loreSingles} of ${loreSetups.length}), so the Lore numbers are a hint, not a result.`,
    `${unknownCost} runs have no recorded cost because they were stopped before reporting it. They are left out of every cost number, never counted as free.`,
    'Prices are list prices for the tokens used, not what any contract would charge.',
    'Every time on this site is the model\'s own working time, as its command-line tool reports it. Waiting for the project\'s checks is not counted, so it is shorter than the time a person would wait. The OpenAI models\' tool reports no duration, so for them it is how long the process ran.',
    '"Edited tests it was given" is read automatically from the changes a model made. It is a flag to look at, not a verdict.',
  ]);
}

mount(app,
  el('p', { class: 'dim' }, 'Short answers to how the numbers on this site were made, what they mean, and what they cannot tell you.'),
  el('div', { class: 'method-grid' }, [
    panel('WHAT DID WE DO?', el('p', {}, `We took ${new Set(runs.map((run) => run.ticket)).size} real tickets that a software team had already solved. Each AI model got the ticket and the project as it was before the fix, tried to do three kinds of work, and we checked what it produced. Every model did every task several times, with and without a knowledge base.`)),
    panel('THE THREE TASKS AND WHEN A RUN WORKS', bullets(Object.entries(TASKS).map(([key, task]) => [bold(`${task.label}. `), `${task.explain} It works when: ${WORKS_RULE[key]}`]))),
    panel('WHAT ARE A SETUP AND A RUN?', el('p', {}, 'A setup is one task, one model, one knowledge base choice and one ticket. A run is one attempt at a setup. Most setups were run several times, because the same setup can work one time and fail the next.')),
    panel('THE AI REVIEWER', el('p', {}, 'Another AI model reads each result and scores it from 1 to 5 against the real fix: is it correct, is it complete, is it close to what a person wrote. Treat the score as an opinion. It is not used for writing the tests, because it gives every test-writing result the same top score.')),
    panel('HOW IS "BEST" SCORED?', el('p', {}, 'Quality counts 6, price 2 and speed 2 by default; you can change that on the Best model page. Every ticket counts equally, however often it was run. Models that skipped a ticket are not ranked, because they would be judged on easier work.')),
    panel('LIMITS', limitsList()),
  ]),
  panel('WHAT THE WORDS MEAN', glossaryList()));
