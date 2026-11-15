## Summary

I completed the red-green-refactor TDD cycle for ticket #95 to fix the `onError` hook being silently skipped for non-Error rejections.

**Phase 1 - RED:** Created `src/orchestration/onErrorCoercion.test.ts` with three tests demonstrating that:
- String rejections were not calling onError (failed as expected)
- Plain object rejections were not calling onError (failed as expected)
- Error instances work correctly with onError (passed, showing the existing behavior)

**Phase 2 - GREEN:** Modified `src/orchestration/chatOrchestrator.ts` line 150-152 to:
- Call `onError` for any rejection (removed the `error instanceof Error` guard)
- Wrap non-Error rejections in an Error with a readable message
- Preserve the original value as the `cause` property
- Re-throw the original value unchanged to the caller

All three new tests passed. Verified all 26 existing `chatOrchestrator.test.ts` tests still pass.

**Phase 3 - REFACTOR:** Formatted files with prettier and added a CHANGELOG entry documenting the behavior change for existing consumers.

All three facets in `.lore/dod.md` are now ticked off. The acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts` will be judged by CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to Error before calling onError","tdd_next":"acceptance green"}}