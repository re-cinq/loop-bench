Implemented and pushed commit `e8268ab`:

- Added and exported `TotalUsageMetadata`.
- Updated `afterModelResponse` to use the explicit total-usage contract.
- Fixed both prior CI findings: spec traceability and changelog.
- Added the focused contract test; it passes.
- Merged `origin/main`; branch is fully pushed and clean.
- Red tests: 0 test assertions; the initial invocation failed only on missing ESM configuration. Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`."}}