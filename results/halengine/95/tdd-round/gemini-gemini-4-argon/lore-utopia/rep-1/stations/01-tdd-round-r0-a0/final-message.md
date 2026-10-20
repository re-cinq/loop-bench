Completed the TDD round for Ticket #95:

- Added a failing unit test in `src/orchestration/chatOrchestrator.test.ts` (`wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original`) and verified it failed in the red phase (1 red test was mine, 0 regressions).
- Updated `src/orchestration/chatOrchestrator.ts` so `hooks.onError` always fires on any rejection inside the `try` block, passing `Error` instances through unchanged and wrapping non-`Error` values in `new Error(String(error), {cause: error})` while re-throwing the original `error` unchanged.
- Confirmed all 27 tests in `src/orchestration/chatOrchestrator.test.ts` pass, updated `CHANGELOG.md`, repointed spec citations, ticked the completed facets in `.lore/dod.md`, and pushed the commit to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Error with cause in chatOrchestrator.ts, verify existing Error-instance tests stay green, and document in CHANGELOG.md","tdd_next":"acceptance green"}}