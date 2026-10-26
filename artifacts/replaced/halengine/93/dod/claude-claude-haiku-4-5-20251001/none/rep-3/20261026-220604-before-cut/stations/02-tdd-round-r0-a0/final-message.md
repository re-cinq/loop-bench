Branch is up to date and pushed. The round:

- **Facet closed**: `accumulateUsage` helper implemented in `orchestratorHelpers.ts`; `chatOrchestrator.ts` now calls `accumulateUsage(lastUsage, outcome.usage)` instead of `lastUsage = outcome.usage ?? lastUsage`, so `afterModelResponse` receives the full turn total across all provider calls.
- **Unit test written and green**: `accumulateUsage sums all fields of two usage objects` in `orchestratorHelpers.test.ts`.
- **No regressions**: 0 tests I wrote were regressions; 1 new test was mine.
- **Smells noted but not touched**: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulateUsage helper sums UsageMetadata across rounds; orchestrator wired to accumulate instead of overwrite","tdd_next":"update afterModelResponse type signature to make the sum contract unambiguous (acceptance criterion 4)"}}