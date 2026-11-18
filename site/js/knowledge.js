// Pure comparison of no knowledge base, Lore and Utopia, using only setups that ran with all three.
import { percentile } from './rank.js';

export const KNOWLEDGE_BASE_KEYS = ['none', 'lore-mcp', 'lore-utopia'];
export const ABOUT_THE_SAME_POINTS = 5;

const known = (values) => values.filter((value) => value != null);
const medianOf = (values) => {
  const present = known(values);
  return present.length ? percentile(present, 0.5) : null;
};

/** The runs of setups (model and ticket) that were run with no knowledge base, with Lore and with Utopia. */
export function runsOfThreeWaySetups(runs) {
  const byModelAndTicket = Map.groupBy(runs, (run) => `${run.task}|${run.harness}|${run.model}|${run.ticket}`);
  return [...byModelAndTicket.values()].filter((group) => KNOWLEDGE_BASE_KEYS.every((kb) => group.some((run) => run.knowledgeBase === kb)));
}

function measuresOf(runs) {
  return {
    runs: runs.length,
    successes: runs.filter((run) => run.success).length,
    successRate: runs.length ? runs.filter((run) => run.success).length / runs.length : null,
    medianCostUsd: medianOf(runs.map((run) => run.costUsd)),
    medianMinutes: medianOf(runs.map((run) => run.minutes)),
  };
}

/** Per knowledge base, the runs of one task on the setups that ran with all three, and how many setups had one run only. */
export function compareKnowledgeBases(runs, task) {
  const groups = runsOfThreeWaySetups(runs.filter((run) => run.task === task));
  const flat = groups.flat();
  const byKnowledgeBase = Object.fromEntries(KNOWLEDGE_BASE_KEYS.map((kb) => [kb, measuresOf(flat.filter((run) => run.knowledgeBase === kb))]));
  const loreSetups = groups.map((group) => group.filter((run) => run.knowledgeBase === 'lore-mcp'));
  return {
    task,
    setups: groups.length,
    models: new Set(flat.map((run) => run.model)).size,
    loreSetupsWithOneRun: loreSetups.filter((loreRuns) => loreRuns.length === 1).length,
    byKnowledgeBase,
  };
}

export function verdictOf(deltaPoints) {
  if (deltaPoints >= ABOUT_THE_SAME_POINTS) return 'better';
  if (deltaPoints <= -ABOUT_THE_SAME_POINTS) return 'worse';
  return 'about the same';
}

/** Per model, how Lore and Utopia change the share of runs that work, on setups that ran with all three. Largest effect first. */
export function effectPerModel(runs) {
  const groups = runsOfThreeWaySetups(runs);
  const byModel = Map.groupBy(groups.flat(), (run) => `${run.harness}/${run.model}`);
  const rows = [...byModel.values()].map((modelRuns) => {
    const measures = Object.fromEntries(KNOWLEDGE_BASE_KEYS.map((kb) => [kb, measuresOf(modelRuns.filter((run) => run.knowledgeBase === kb))]));
    const effectOf = (kb) => {
      const deltaPoints = Math.round((measures[kb].successRate - measures.none.successRate) * 100);
      return { runs: measures[kb].runs, deltaPoints, verdict: verdictOf(deltaPoints), successRate: measures[kb].successRate };
    };
    return { harness: modelRuns[0].harness, model: modelRuns[0].model, setups: new Set(modelRuns.map((run) => `${run.task}|${run.ticket}`)).size, none: measures.none, lore: effectOf('lore-mcp'), utopia: effectOf('lore-utopia') };
  });
  const size = (row) => Math.max(Math.abs(row.lore.deltaPoints), Math.abs(row.utopia.deltaPoints));
  return rows.sort((a, b) => size(b) - size(a) || a.model.localeCompare(b.model));
}

const percentText = (share) => `${Math.round(share * 100)}%`;

function effectPhrase(deltas) {
  if (deltas.every((delta) => verdictOf(delta) === 'better')) return 'helps';
  if (deltas.every((delta) => verdictOf(delta) === 'worse')) return 'hurts';
  if (deltas.every((delta) => verdictOf(delta) === 'about the same')) return 'makes little difference';
  return 'has mixed effects';
}

/** One plain sentence on what a knowledge base does for a task, from compareKnowledgeBases. */
export function knowledgeAnswer(comparison, labels) {
  const { none, 'lore-mcp': lore, 'lore-utopia': utopia } = comparison.byKnowledgeBase;
  const deltas = [lore, utopia].map((measures) => Math.round((measures.successRate - none.successRate) * 100));
  return `For ${labels.activity}, a knowledge base ${effectPhrase(deltas)}: runs work ${percentText(none.successRate)} of the time with none, ${percentText(lore.successRate)} with ${labels.lore} and ${percentText(utopia.successRate)} with ${labels.utopia}, over ${comparison.setups} ${comparison.setups === 1 ? "setup" : "setups"} run with all three.`;
}
