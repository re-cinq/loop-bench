Completed the TDD round for #95:

- Added a unit test in `src/orchestration/chatOrchestrator.test.ts` verifying `onError` is called with an `Error` (with `String(error)` message and `cause` set to the original value) for string, plain object, and `undefined` rejections while rethrowing the original rejection unchanged (1 red test written by us in RED phase, 0 regressions; all 27 tests in `chatOrchestrator.test.ts` pass in GREEN phase, including existing `Error`-instance tests without modification).
- Updated `src/orchestration/chatOrchestrator.ts` to coerce non-`Error` rejections in `catch` via `error instanceof Error ? error : new Error(String(error), {cause: error})`.
- Linked the new test in `specs/hal-engine-config-hooks/spec.md`, repointed spec anchors, added the `CHANGELOG.md` entry under `## [Unreleased]`, ticked the completed facets in `.lore/dod.md`, and pushed to `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for hooks.onError with cause, keep existing Error tests green, and update CHANGELOG.md","tdd_next":"acceptance green"}}