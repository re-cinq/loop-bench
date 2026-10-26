## Summary

I completed one TDD red-green-refactor round:

**RED:** Wrote a small focused test verifying that when `beforeSession` throws, the error is caught and passed to the `onError` hook. The test failed as expected because `beforeSession` was outside the try block.

**GREEN:** Moved the `beforeSession` call inside the try block (line 91-92 in chatOrchestrator.ts). This minimal change ensures errors from `beforeSession` are caught by the catch block and passed to `onError`, with `afterSession` running in the finally block.

**REFACTOR:** No refactoring needed—the change is already clean and minimal.

All 24 tests pass. The code is formatted, committed, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}