Perfect! I have completed the TDD round:

## Summary

**Phase 1 — RED**: Written a focused test (`chatOrchestrator.onError.test.ts`) that verifies `onError` is called when `beforeSession` throws. Test failed as expected (caughtError was undefined).

**Phase 2 — GREEN**: Implemented the minimal fix—moved the `beforeSession` call from outside the try block (line 91) to inside it (after line 93). This allows the error from `beforeSession` to be caught by the catch handler and `onError` to be invoked. Test now passes, along with all 23 existing orchestrator tests and 6 session save tests.

**Phase 3 — REFACTOR**: Verified code is clean, properly formatted, and all tests remain green. The test is focused and follows existing repo patterns. No additional refactoring needed.

**Facet completed**: Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.

The changes are committed and pushed. The next round should handle updating the spec and CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}