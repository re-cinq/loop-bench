Perfect! The round is complete and pushed. Let me summarize what was done:

## Summary

**RED phase:** Created a unit test (`chatOrchestrator.beforeSession-error-handling.test.ts`) that verifies `onError` is called when `beforeSession` throws. The test failed as expected because `beforeSession` was outside the try block.

**GREEN phase:** Moved the `beforeSession` call inside the try block in `chatOrchestrator.ts` (line 91 → 92). This ensures errors thrown from `beforeSession` are caught by the same catch and finally blocks as other failures, allowing both `onError` and `afterSession` hooks to execute.

**REFACTOR phase:** Code is clean and minimal. Formatter confirmed no changes needed. Test continues to pass.

**Facet completed:** "Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`"

**Next facet:** Update the spec and CHANGELOG to document the new guarantee.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}