Completed one red-green-refactor round for Facet 1:

1. **Red phase:** Added unit test `'sums the usage of every round, not only the last'` in `src/orchestration/chatOrchestrator.test.ts`. Confirmed failure on assertion (1 red test was ours, 0 regressions) because `chatOrchestrator.ts` retained only the final provider round's usage (`{inputTokens: 22, outputTokens: 5, totalTokens: 27}` instead of the accumulated `{inputTokens: 33, outputTokens: 8, totalTokens: 41}`).
2. **Green phase:** Defined explicit `TotalUsage` type contract in `src/types/ai.ts` (re-exported through `src/types/index.ts` and `src/index.ts`), updated `OrchestratorHooks.afterModelResponse` signature, and replaced `lastUsage` in `chatOrchestrator.ts` with `totalUsage` accumulation across provider rounds. Verified the test is green.
3. **Refactor and Traceability:** Updated doc blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`, added spec citation for the new test in `specs/hal-engine-architecture/spec.md`, updated shifted anchor line in `specs/hal-engine-tool-input-validation/spec.md`, and marked Facet 1 closed in `.lore/dod.md`. Committed and pushed to `origin/loop-bench/93`.

Unrelated smells noticed (none acted upon):
- `specs/hal-engine-architecture/spec.md` header status row is "In Progress" with issue "n/a".

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}