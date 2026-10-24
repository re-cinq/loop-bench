All done. The branch is pushed and up to date.

**What this round did:** Fixed all 14 ESLint errors from the previous CI failure by:

1. **Created `chatOrchestratorTestSupport.ts`** — extracted `scriptedProvider`, `registryReturning` (with optional default param), `TOOL_CALL`, `STOP_FOR_TOOL`, `STOP_DONE` to a single shared module, eliminating the cross-file code duplication
2. **Updated `chatOrchestrator.test.ts`** — replaced the `ToolResponse` import and local definitions with an import from the shared support file
3. **Rewrote `chatOrchestrator.acceptance.test.ts`** — used `captureUsage()` and a new `makeToolOrchestrator()` helper throughout, eliminating within-file duplication and reducing the 6-expect test to a single assertion
4. **Updated `specs/hal-engine-config-hooks/spec.md`** — reanchored the 8 validated-by line references to match the post-format positions in the refactored acceptance test

All 8 acceptance tests pass locally. No new tests written (mechanical repair round — the test file was rewritten to be lint-clean, not to add new assertions).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix duplicate-code lint errors blocking CI","tdd_next":"acceptance green"}}