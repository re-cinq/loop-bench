I have completed the task of reporting usage across every tool round, not just the last.

### Changes Made:
- **Types Update**: Added the `TotalUsage` interface to `src/types/ai.ts`. Although structurally identical to `UsageMetadata` for now, it makes the aggregation contract explicit in the public API.
- **Orchestrator Logic**: Modified `processMessageStream` in `src/orchestration/chatOrchestrator.ts` to accumulate token usage (`inputTokens`, `outputTokens`, `totalTokens`) across all rounds of the tool loop. If a round does not report usage, it is skipped; if no rounds report usage, the final `totalUsage` remains `undefined`.
- **Hook Signature**: Updated the `afterModelResponse` hook signature to use the `TotalUsage` type and renamed the parameter from `usage` to `totalUsage` for clarity.
- **Traceability & Documentation**:
    - Updated `specs/hal-engine-config-hooks/spec.md` to reflect the new behavior and updated shifted traceability links to `src/orchestration/chatOrchestrator.test.ts`.
    - Added a `Changed` entry to `CHANGELOG.md` detailing the breaking change for consumers.
    - Updated `.lore/dod.md` facets.
- **Compatibility**:
    - Added explicit Vitest imports to `src/orchestration/chatOrchestrator.test.ts` to ensure compatibility with the `npx vitest` runner.
    - Updated `example/server.ts`, `example/full-config.ts`, and `src/orchestration/chatOrchestratorUsage.acceptance.test.ts` to align with the new parameter name and type.
- **Verification**: Created `src/orchestration/chatOrchestratorUsage.test.ts` with unit tests covering multi-round aggregation, `undefined` preservation when no usage is reported, and partial reporting (some rounds reporting, others not). Verified that all 24 existing tests in `chatOrchestrator.test.ts` still pass.

The changes have been formatted, committed, and pushed to `origin/HEAD`. The branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregated usage across rounds","tdd_next":"acceptance green"}}