I have completed the task to report summed usage across every provider call in a turn.

### Changes Made:
1.  **Contract Update**: Defined `AggregateUsage` in `src/types/ai.ts` which extends `UsageMetadata`. This type is now explicitly used in the `afterModelResponse` hook to represent accumulated usage.
2.  **Implementation**: Updated `src/orchestration/chatOrchestrator.ts` to accumulate usage from all provider rounds within a turn. The `afterModelResponse` hook now receives the summed tokens across all rounds.
3.  **Behavior Preservation**: Ensured that turns with no reported usage still pass `undefined` to the hook, and single-round turns without tools report exactly the same token fields as before, maintaining compatibility with existing regression guards.
4.  **Verification**: Added a new unit test suite `src/orchestration/chatOrchestratorUsage.test.ts` to verify accumulation and gap handling. Confirmed that the existing regression guard in `src/orchestration/chatOrchestrator.test.ts` remains satisfied.
5.  **Documentation**: Updated `CHANGELOG.md` with the behavior change and migration notes. Refined `specs/hal-engine-config-hooks/spec.md` to reflect the new `AggregateUsage` contract and linked it to the new verification tests.

I performed one red-green-refactor cycle, starting with a failing unit test that reproduced the under-counting reported in ticket #93. All facets in `.lore/dod.md` are now closed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"acceptance green"}}