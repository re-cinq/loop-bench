I have completed the round by implementing usage aggregation across all provider rounds in the `afterModelResponse` hook.

Summary of changes:
1.  **Implemented Aggregation Logic**: Updated `ChatOrchestrator.ts` to accumulate `inputTokens`, `outputTokens`, and `totalTokens` from every provider round instead of just retaining the last one.
2.  **Explicit Type Contract**: Introduced the `AggregateUsage` type in `src/types/ai.ts` and updated the `afterModelResponse` hook signature. This ensures the API explicitly communicates that the reported usage is a turn-wide aggregate.
3.  **Refactored Tests**: Updated `chatOrchestrator.test.ts`, `toolBudget.test.ts`, and the acceptance tests in `chatOrchestratorUsage.acceptance.test.ts` to align with the new signature and type.
4.  **Verified via TDD**: Wrote a new unit test `src/orchestration/usageSumming.test.ts` that specifically verifies the summation of tokens across two tool rounds and one final response round. All orchestrator unit tests passed using the project's native Jest runner.
5.  **Updated Documentation**: Recorded the behavior change in `CHANGELOG.md` and updated `CLAUDE.md` and `specs/hal-engine-architecture/spec.md` to reflect the new hook signature. Also fixed a rotten link in `specs/hal-engine-config-hooks/spec.md`.

All changes have been formatted, committed, and pushed to the `loop-bench/93` branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"acceptance green"}}