Completed one red-green-refactor TDD round for #93:

- Added failing unit test `sums the usage of every round, not only the last` in `src/orchestration/chatOrchestrator.test.ts` (1 red test of mine in the red phase, 0 regressions; all 25 tests in `src/orchestration/chatOrchestrator.test.ts` passed in the green phase).
- Added `accumulateUsage` in `src/orchestration/orchestratorHelpers.ts` and updated `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` (`totalUsage?: UsageMetadata`) in `src/orchestration/chatOrchestrator.ts`.
- Updated `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-tool-input-validation/spec.md`, `CLAUDE.md`, `CHANGELOG.md`, and `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field across provider rounds with totalUsage contract and update specs/CHANGELOG","tdd_next":"acceptance green"}}