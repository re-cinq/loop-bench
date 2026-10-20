I have completed Ticket #93 by implementing usage aggregation across all provider calls in a multi-round conversation turn.

Summary of changes:
- **`src/orchestration/chatOrchestrator.ts`**:
    - Introduced `TotalUsageMetadata` type, extending `UsageMetadata` to explicitly represent aggregated totals.
    - Updated `OrchestratorHooks.afterModelResponse` signature to use `totalUsage?: TotalUsageMetadata`.
    - Implemented `aggregateUsage` helper to safely sum token counts, preserving `undefined` if no rounds report usage.
    - Modified the orchestrator's main loop to accumulate usage across every provider round.
- **`src/orchestration/usageAggregation.test.ts`**:
    - Created a new unit test suite to verify the aggregation logic, including handling of multi-round turns, missing usage data in some rounds, and turns with no reported usage at all.
- **`src/index.ts`**:
    - Exported `TotalUsageMetadata` from the package root to ensure it's part of the public API.
- **`specs/hal-engine-config-hooks/spec.md`**:
    - Updated the `afterModelResponse` description to reflect the new aggregated behavior and explicitly mention `TotalUsageMetadata`.
    - Added a new validated statement regarding the handling of missing round usage.
    - Re-anchored the `onError` statement to its new line number (L153).
- **`CHANGELOG.md`**:
    - Documented the change in the `afterModelResponse` hook behavior and provided a migration note for consumers who use it for billing or auditing.
- **`.lore/dod.md`**:
    - Ticked off all facets as completed.

I verified the implementation with the new unit tests and ensured that existing tests in `src/orchestration/chatOrchestrator.test.ts` still pass. The branch has been merged with `origin/main` and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Report usage across every tool round","tdd_next":"acceptance green"}}