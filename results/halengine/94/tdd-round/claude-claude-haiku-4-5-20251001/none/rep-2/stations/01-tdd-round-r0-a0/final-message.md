## Summary

I've completed the first TDD round for ticket #94. Here's what was done:

**RED Phase:** Created a unit test that verifies when `beforeSession` throws, both `onError` and `afterSession` hooks are invoked—test failed as expected.

**GREEN Phase:** Made the minimal code change: moved the `beforeSession` call from before the try block into inside it (one line edit in `src/orchestration/chatOrchestrator.ts`). This ensures exceptions thrown by `beforeSession` are caught and trigger the error/cleanup handlers.

**REFACTOR Phase:** Consolidated the new test into the existing `chatOrchestrator.test.ts` using established patterns and helper functions (`outcomeOf`, `recordingHooks`), removed the separate test file, and verified all 24 tests pass with no regressions.

**Changes committed:**
- `src/orchestration/chatOrchestrator.ts`: `beforeSession` now executes inside the try block
- `src/orchestration/chatOrchestrator.test.ts`: Added test verifying the hook execution order when `beforeSession` throws
- `.lore/dod.md`: Marked first facet as complete

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}