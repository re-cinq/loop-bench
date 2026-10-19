Branch is up to date. The round delivered:

- **`accumulateUsage` helper** in `orchestratorHelpers.ts` — sums two `UsageMetadata` objects, skipping `undefined` rounds without voiding the total
- **`chatOrchestrator.ts`** — changed `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = accumulateUsage(lastUsage, outcome.usage)`, making every tool round's tokens count
- **Unit test** at `orchestratorHelpers.test.ts:L29` — green; validates summation
- **Spec links** for all 3 acceptance tests added to `specs/hal-engine-config-hooks/spec.md`; spec updated to describe the new correct behavior
- **`specs/hal-engine-architecture/spec.md`** — added statement linking to the new unit test
- **`CHANGELOG.md`** — MINOR-bump Changed entry

Unrelated smell noticed: the `chatOrchestrator.ts` import list now has 8 items from `orchestratorHelpers.js`; no action taken.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across rounds in the orchestrator; replace under-counting spec statement; add CHANGELOG entry","tdd_next":"Make the hook's type say it is a turn total (OrchestratorHooks.afterModelResponse usage?: UsageMetadata)"}}