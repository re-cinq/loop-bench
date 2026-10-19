Branch is up to date, nothing to push. The round delivered:

- **`accumulateUsage`** pure function added to `orchestratorHelpers.ts` — sums token counts across rounds, returns `undefined` only when no round reported usage
- **`chatOrchestrator.ts`** wired to `accumulateUsage` instead of the `??` fallback, plus a one-line doc comment on `afterModelResponse` naming it as the per-turn sum
- **CHANGELOG** entry added under `[Unreleased] ### Changed`
- **All four facets ticked** in `.lore/dod.md`
- 8 unit tests pass (4 new, 4 existing); the acceptance tests in `usageAcrossRounds.acceptance.test.ts` are left to CI

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Aggregate each provider round's reported usage and preserve undefined when no round reports it","tdd_next":"acceptance green"}}