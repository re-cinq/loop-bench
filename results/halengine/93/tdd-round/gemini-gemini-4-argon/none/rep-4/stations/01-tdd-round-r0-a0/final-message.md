Completed the red-green-refactor round for accumulating `totalUsage` across all provider rounds in `createChatOrchestrator`:
- Added `sums the usage of every round, not only the last` in `src/orchestration/chatOrchestrator.test.ts` (1 red test added and made green; 0 regressions).
- Updated `OrchestratorHooks.afterModelResponse` (`totalUsage?: UsageMetadata`) and `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` to sum token fields across reporting rounds while preserving `undefined` when no round reports usage.
- Updated `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-tool-input-validation/spec.md`, `CLAUDE.md`, `CHANGELOG.md`, and `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate token usage across every reporting provider round and pass totalUsage to afterModelResponse","tdd_next":"acceptance green"}}