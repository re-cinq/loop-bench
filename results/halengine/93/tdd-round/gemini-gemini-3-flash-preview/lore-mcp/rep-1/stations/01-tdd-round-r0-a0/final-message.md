I have completed the TDD round to report aggregate usage across every tool round in the `afterModelResponse` hook.

1.  **Research & Strategy**: I identified the `lastUsage` retention logic in `chatOrchestrator.ts` and the `UsageMetadata` type in `src/types/ai.ts`. My strategy was to introduce a `TurnUsage` contract to make aggregation explicit and refactor the orchestrator to sum tokens across rounds.
2.  **Red Phase**: I created `src/orchestration/chatOrchestratorUsage.test.ts` with tests verifying that usage is summed across multiple rounds and that turns with no reported usage remain `undefined`. These tests failed as expected with the initial code only reporting the final round's usage.
3.  **Green Phase**:
    *   Defined `TurnUsage` in `src/types/ai.ts` as a deliberately named contract for turn-level usage.
    *   Updated `OrchestratorHooks` in `chatOrchestrator.ts` to use `TurnUsage`.
    *   Refactored the round loop to accumulate usage into a `turnUsage` variable, summing fields only when a round reports usage.
    *   Verified the fix with the new test suite and confirmed the existing regression guard in `chatOrchestrator.test.ts` stayed green.
4.  **Refactor & Traceability**:
    *   Updated `CHANGELOG.md` to document the behavior change and the new `TurnUsage` type.
    *   Updated `specs/hal-engine-config-hooks/spec.md` with a traceability link to the new test and fixed a rotten link caused by line shifts in the orchestrator.
    *   Ran the `re-anchor` script to synchronize spec links.
    *   Formatted all changed files with Prettier.

All facets in `.lore/dod.md` have been completed and ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregation and TurnUsage contract","tdd_next":"acceptance green"}}