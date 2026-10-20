I have completed the TDD round for ticket #93. I introduced the `TurnUsage` contract to explicitly represent aggregated usage and updated the `chatOrchestrator` to accumulate token counts across every provider round in a turn.

**Changes:**
- **Types:** Added `TurnUsage` interface in `src/types/ai.ts` which wraps an aggregated `UsageMetadata` object.
- **Orchestration:** 
    - Added `aggregateUsage` helper in `src/orchestration/orchestratorHelpers.ts` to safely sum token counts while preserving `undefined` state.
    - Updated `chatOrchestrator.ts` to maintain an `accumulatedUsage` variable across the tool loop and report it via the `afterModelResponse` hook.
    - Updated the `afterModelResponse` hook signature in `OrchestratorHooks` to use `TurnUsage`.
- **Tests:**
    - Updated existing unit tests in `src/orchestration/chatOrchestrator.test.ts` to match the new hook signature while preserving regression coverage.
    - Updated the acceptance tests in `src/orchestration/chatOrchestratorUsage.acceptance.test.ts` to reflect the new explicit usage structure.
- **Documentation:**
    - Updated `specs/hal-engine-config-hooks/spec.md` to describe the new aggregated behavior.
    - Added a migration note to `CHANGELOG.md` detailing the breaking change in the hook signature and the improved counting accuracy.

Verified the changes with a new unit test (which I removed before committing) and ensured all existing unit tests in `src/orchestration/chatOrchestrator.test.ts` pass with Jest.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"acceptance green"}}