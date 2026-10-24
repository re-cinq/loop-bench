Pushed and confirmed. The branch is up to date with origin.

**Summary:** Added `accumulateUsage` to `orchestratorHelpers.ts`, updated the import in `chatOrchestrator.ts`, and changed `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = accumulateUsage(lastUsage, outcome.usage)`. All 8 tests in `orchestratorHelpers.test.ts` pass (4 new, 4 existing). The remaining facets (type-signature update, spec update, CHANGELOG entry) are unchecked in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across all rounds in chatOrchestrator.ts instead of keeping only the last round","tdd_next":"Add or update type signature for afterModelResponse to make the accumulated sum unambiguous"}}