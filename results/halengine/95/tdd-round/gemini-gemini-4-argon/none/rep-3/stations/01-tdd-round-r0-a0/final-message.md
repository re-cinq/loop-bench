Completed the TDD round for ticket #95:

- Added a failing unit test in `src/orchestration/chatOrchestrator.test.ts` (`wraps a non-Error rejection in an Error with cause preserved and rethrows the original value`) and observed 1 red test (mine) and 0 regressions.
- Updated `src/orchestration/chatOrchestrator.ts` to coerce non-`Error` rejections via `toError(error)` (`error instanceof Error ? error : new Error(String(error), {cause: error})`) so `hooks.onError` fires on every rejection inside the `try` block while `Error` instances pass through unchanged and the original value still propagates to the caller.
- Verified all 27 tests in `src/orchestration/chatOrchestrator.test.ts` pass (0 red tests, 0 regressions), updated `CHANGELOG.md`, re-anchored spec citations, ticked `.lore/dod.md`, and pushed to `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Error in chatOrchestrator.ts, confirm existing Error tests stay green, and update CHANGELOG.md","tdd_next":"acceptance green"}}