Pushed. Branch is not ahead of upstream.

**What this round did:**

- **RED** — added three tests for `addUsage` to `orchestratorHelpers.test.ts`; they imported a function that didn't exist yet
- **GREEN** — added `addUsage(a, b)` to `orchestratorHelpers.ts` (returns `undefined` when both sides are undefined, the defined side when one is missing, field-by-field sum otherwise); swapped `lastUsage = outcome.usage ?? lastUsage` for `lastUsage = addUsage(lastUsage, outcome.usage)` in the round loop
- **REFACTOR** — added one-line JSDoc to `afterModelResponse` in `OrchestratorHooks` to document that the parameter is the per-turn total; updated CLAUDE.md's generated block to match; added CHANGELOG `### Changed` entry; updated the `#L150` → `#L152` link in the spec (two lines shifted by the import and JSDoc additions); ticked all five facets in dod.md

No regressions caused; the 0 red tests I introduced were all mine. No unrelated smells acted on (the `lastUsage` rename to a more descriptive name was considered but skipped — it's in a function-local scope and the JSDoc on the hook covers it).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace lastUsage with addUsage running total across all tool rounds","tdd_next":"acceptance green"}}