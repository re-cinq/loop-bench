I have completed the TDD round to address under-counting of usage in the `afterModelResponse` hook. I refactored the `chatOrchestrator` to aggregate usage metadata across every provider round in a turn, rather than only retaining the last round's usage.

### Changes:
- **`src/types/ai.ts`**: Added the `AggregateUsageMetadata` interface to explicitly represent summed usage across multiple rounds.
- **`src/orchestration/orchestratorHelpers.ts`**: Implemented a `sumUsage` helper function that safely adds token counts from successive provider rounds, preserving `undefined` if no usage is reported.
- **`src/orchestration/chatOrchestrator.ts`**: Updated the `afterModelResponse` hook signature to use `AggregateUsageMetadata`. Refactored the tool loop to accumulate usage using the new `sumUsage` helper.
- **`src/orchestration/chatOrchestratorUsageSumming.test.ts`**: Added a new unit test verifying that usage from multiple tool rounds is correctly summed in the final hook call.
- **`specs/hal-engine-config-hooks/spec.md`**: Updated the measured semantics to document the new aggregate usage behavior and point to the acceptance test verification.
- **`CHANGELOG.md`**: Added an entry for the behavioral change and the new explicit type in the public API.
- **`.lore/dod.md`**: Ticked all facets as complete.

I verified the fix by running the new unit test and ensured no regressions by running the existing orchestrator tests. All tests passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"summed usage across rounds","tdd_next":"acceptance green"}}