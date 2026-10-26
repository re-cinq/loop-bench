Pushed and up to date. 

**What this round did:** Added `accumulateUsage` to `orchestratorHelpers.ts`, wrote 4 unit tests for it in `orchestratorHelpers.test.ts`, and wired it into `chatOrchestrator.ts` replacing the `lastUsage = outcome.usage ?? lastUsage` keep-last pattern. The `afterModelResponse` hook now receives the sum across all rounds. Two dod.md facets ticked.

**Regressions:** 0 new regressions; 0 acceptance tests edited.

**Unrelated smell noticed:** None.

**Remaining facets:** spec.md update, CHANGELOG entry, and all acceptance tests passing (CI will judge those).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage across all rounds + pass sum to afterModelResponse","tdd_next":"Update specs/hal-engine-config-hooks/spec.md and add CHANGELOG entry"}}