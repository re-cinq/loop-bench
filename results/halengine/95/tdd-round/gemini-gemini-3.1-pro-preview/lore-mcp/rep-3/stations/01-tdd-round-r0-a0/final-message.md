I have completed the TDD round for the `#95 Call onError for a rejection that is not an Error` ticket.

- Started by identifying that the `onError` hook bypassed rejections that were not `Error` instances.
- Added a failing unit test in `src/orchestration/chatOrchestrator.test.ts` to ensure that throwing a non-Error string coerced it into an `Error` and passed it to `onError`.
- Updated `chatOrchestrator.ts` to coerce caught non-`Error` rejections using `JSON.stringify(error)` for objects and `String(error)` for primitives, wrapping them in an `Error` where the original is preserved as the `cause`.
- Ensured the existing `Error`-instance unit tests remained green.
- Updated `CHANGELOG.md` with the new behaviour for existing consumers under `[Unreleased]`.
- Updated `.lore/dod.md` to check off all facets for this ticket.
- Formatted changed files with Prettier.
- Committed and pushed the changes to the `loop-bench/95` branch.
- Validated that the branch merges cleanly with `origin/main`.

During test execution within my round, all 27 tests in `src/orchestration/chatOrchestrator.test.ts` passed. There were no red tests of my own creation and no regressions. I did not run the acceptance tests directly, as CI is responsible for judging them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to Error before onError hook","tdd_next":"acceptance green"}}