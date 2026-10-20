Completed one red-green-refactor round for ticket #93:

- **Red:** Added `sums the usage of every round, not only the last` in `src/orchestration/chatOrchestrator.test.ts` (1 red test of mine, 0 regressions).
- **Green:** Renamed `OrchestratorHooks.afterModelResponse`'s third parameter to `totalUsage` and replaced `lastUsage` in `createChatOrchestrator` with `totalUsage` summed across rounds via `accumulateUsage`, keeping `undefined` when no round reports usage.
- **Refactor & Traceability:** Updated `OrchestratorHooks` doc-blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`, updated `specs/hal-engine-config-hooks/spec.md` and repointed spec anchors, added the `[Unreleased]` note to `CHANGELOG.md`, ticked the facets in `.lore/dod.md`, formatted with `prettier`, committed, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with totalUsage summed across rounds via accumulateUsage, update hooks spec and CHANGELOG","tdd_next":"acceptance green"}}