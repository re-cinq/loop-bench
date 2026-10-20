I have completed the round for ticket #93. I have replaced the final-round usage retention with an aggregated usage contract that accumulates tokens across every provider call in a turn.

### Changes Made:
- **Defined `AggregateUsage` Type**: Introduced `AggregateUsage` in `src/types/ai.ts` to explicitly represent summed tokens across rounds, while maintaining structural compatibility with `UsageMetadata`.
- **Updated `OrchestratorHooks`**: Modified the `afterModelResponse` hook in `src/orchestration/chatOrchestrator.ts` to receive `AggregateUsage`.
- **Implemented Usage Accumulation**: Added a `sumUsage` helper in `src/orchestration/orchestratorHelpers.ts` and updated the `ChatOrchestrator` turn loop to accumulate usage across all rounds.
- **Verified with Unit Tests**: Added comprehensive tests to `src/orchestration/chatOrchestrator.test.ts` covering multi-round accumulation, usage gaps (missing `usage` in some rounds), and turns with no usage reported.
- **Maintained Structural Integrity**: Updated the acceptance test and existing unit tests (`toolBudget.test.ts`) to use the new `AggregateUsage` type, ensuring the codebase remains type-consistent.
- **Updated Documentation**: Refined `specs/hal-engine-config-hooks/spec.md` to mention the new contract and added a detailed entry to `CHANGELOG.md` explaining the behavior change and its impact on consumers.
- **Refined Spec Links**: Ran the `repoint-spec-anchors.mjs` script to ensure all spec trace links are accurate following the additions to the test suite.

I ran my new tests using `jest` and they passed successfully. No regressions were observed in the unit tests I updated.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"acceptance green"}}