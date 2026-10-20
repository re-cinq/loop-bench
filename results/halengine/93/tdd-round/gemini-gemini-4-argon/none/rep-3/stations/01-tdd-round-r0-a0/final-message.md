Completed the TDD round for ticket #93:

- Added unit test `sums reported round token counts and preserves undefined when no round reported usage` in `src/orchestration/orchestratorHelpers.test.ts` (1 red test written and turned green; 0 regressions).
- Exported `TotalUsageMetadata` from `src/types/ai.ts`, `src/types/index.ts`, and `src/index.ts`, added `sumUsage` in `src/orchestration/orchestratorHelpers.ts`, and updated `OrchestratorHooks.afterModelResponse` and `processMessageStream` in `src/orchestration/chatOrchestrator.ts` to accumulate `totalUsage` across every provider call in a turn.
- Updated `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-architecture/spec.md`, `CLAUDE.md`, `CHANGELOG.md`, and `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field across reported provider rounds with TotalUsageMetadata and update hooks spec and CHANGELOG","tdd_next":"acceptance green"}}