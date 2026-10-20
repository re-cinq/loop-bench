This round completes the core implementation of aggregate usage across tool rounds, fulfilling the first three facets from `.lore/dod.md`:
1. Introduced the deliberately named `AggregateUsage` type and updated the `afterModelResponse` hook signature.
2. Summed each token field properly, preserving `undefined` when no rounds reported usage.
3. Preserved the unchanged no-tool regression guard.

During the RED phase, exactly 1 failing test (the one I wrote for this round) was encountered, and 0 regressions occurred (all 25 existing tests in `src/orchestration/chatOrchestrator.test.ts` stayed green).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers."}}