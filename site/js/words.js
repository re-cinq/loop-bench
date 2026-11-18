// The one glossary: every bench key the site shows, with its plain label and a one-line explanation.
export const TASKS = {
  dod: { label: 'Write the tests', activity: 'writing the tests', explain: 'The model reads a ticket and writes the tests that say when the work is done.' },
  'tdd-round': { label: 'Write the code', activity: 'writing the code', explain: 'The model writes the code until the project\'s checks pass.' },
  'repair-build': { label: 'Fix a broken build', activity: 'fixing a broken build', explain: 'The model is handed a failing build and has to make the project\'s checks pass again.' },
};

export const KNOWLEDGE_BASES = {
  none: { label: 'none', explain: 'The model worked from the ticket and the code alone.' },
  'lore-mcp': { label: 'Lore', explain: 'The model could look things up in Lore, a knowledge base about the project.' },
  'lore-utopia': { label: 'Utopia', explain: 'The model could look things up in Lore running on Utopia, a larger knowledge base.' },
};

export const SIZES = {
  small: { label: 'small', explain: 'A small ticket: a few lines of change.' },
  medium: { label: 'medium', explain: 'A medium ticket: a handful of files.' },
  large: { label: 'large', explain: 'A large ticket: many files or a deeper change.' },
};

export const MEASURES = {
  works: { label: 'works', explain: 'The share of runs where the project\'s checks pass.' },
  cost: { label: 'usual cost', explain: 'The middle cost of one run at list prices; the smaller range is where the middle half of runs fall.' },
  time: { label: 'usual time', explain: 'The middle working time of one run: how long the model itself worked, as its command-line tool reports it. Waiting for the project\'s checks is not counted. The OpenAI models\' tool reports no duration, so for them it is how long the process ran. The smaller range is where the middle half of runs fall.' },
  review: { label: 'AI reviewer score', explain: 'An AI reviewer scores each result from 1 to 5 for being correct, complete and close to what a person wrote.' },
  costPerWorking: { label: 'cost per working result', explain: 'What all runs cost, divided by the runs that worked. It prices in the failures.' },
  quality: { label: 'Quality', explain: 'How often the result works, blended with the AI reviewer score.' },
  price: { label: 'Price', explain: 'How cheap a run is compared with the other models shown.' },
  speed: { label: 'Speed', explain: 'How short a run\'s working time is compared with the other models shown.' },
};

export const END_REASONS = {
  station_done: { label: 'finished normally', explain: 'The model said it was done.' },
  dod_scoped_out: { label: 'left some tests out', explain: 'The model decided part of the ticket was out of scope for the tests.' },
  retry_budget: { label: 'ran out of retries', explain: 'The model kept failing and used up its retries.' },
  green: { label: 'checks passed', explain: 'The project\'s checks passed.' },
  round_budget: { label: 'ran out of rounds', explain: 'The model used all its rounds without the checks passing.' },
};

export const FAILURE_REASONS = {
  station_done: { label: 'said it was done, but the checks did not pass', explain: 'The model stopped and reported it was finished, yet the project\'s checks still failed.' },
  dod_scoped_out: { label: 'left some tests out', explain: 'The model decided part of the ticket was out of scope for the tests.' },
  retry_budget: { label: 'ran out of retries', explain: 'The model kept failing and used up its retries.' },
  round_budget: { label: 'ran out of rounds', explain: 'The model used all its rounds without the checks passing.' },
};

export const TASK_VERBS = {
  dod: 'Writes working tests in',
  'tdd-round': 'Writes working code in',
  'repair-build': 'Fixes the broken build in',
};

export const MAKERS = {
  claude: 'Anthropic',
  codex: 'OpenAI',
  gemini: 'Google',
  glm: 'Z.ai',
};

export const STRENGTHS = {
  measured: { label: 'measured', explain: 'Five or more runs.' },
  few: { label: 'few runs', explain: 'Fewer than five runs, so treat the numbers as a hint.' },
};

export const NONE_OR_ALL = 'all';
export const labelOf = (glossary, key) => glossary[key]?.label ?? key;

export const SIZE_MIXES = {
  seen: { label: 'the mix seen in the results' },
  small: { label: 'all small' },
  medium: { label: 'all medium' },
  large: { label: 'all large' },
  own: { label: 'my own mix' },
};
