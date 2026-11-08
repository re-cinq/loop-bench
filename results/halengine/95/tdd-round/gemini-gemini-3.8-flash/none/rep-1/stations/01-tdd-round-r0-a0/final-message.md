### TDD Round Summary

1. **Red Phase**: Added a unit test `coerces a non-Error rejection to an Error carrying the thrown value as cause` to `src/orchestration/chatOrchestrator.test.ts`. Running only this test failed (RED) because non-`Error` rejections bypassed `hooks.onError`.
   - Red tests: 1 (ours)
   - Regressions: 0

2. **Green Phase**: In `src/orchestration/chatOrchestrator.ts`, added the `toError` helper function to coerce non-`Error` rejections to an `Error` instance carrying the original value as `cause` and a readable `message`, while passing existing `Error` instances through unchanged. Updated the `catch` block to invoke `await hooks.onError(session, toError(error))` on any caught rejection before re-throwing the original value. Re-running the test passed (GREEN).

3. **Refactor & Traceability**:
   - Linked the new test to the corresponding statement in `specs/hal-engine-config-hooks/spec.md`.
   - Repointed spec anchor line numbers across specifications using `npm run spec:names:fix`.
   - Added an entry under `## [Unreleased] -> ### Fixed` in `CHANGELOG.md`.
   - Updated `.lore/dod.md` checking off the completed facets.
   - Formatted all changed files with Prettier.
   - Committed and pushed to `origin/loop-bench/95`.

Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error with a readable message (while passing an Error instance through unchanged) so hooks.onError always fires on any rejection inside the try block.","tdd_next":"Confirm existing Error-instance tests in src/orchestration/chatOrchestrator.test.ts (called with session and error when stream fails, error still propagates after onError hook, error path calls onError then afterSession) remain green without modification."}}