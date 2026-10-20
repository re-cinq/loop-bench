Completed one red-green-refactor round for #95:

- Added a unit test (`wraps a non-Error rejection in an Error with cause while rethrowing the original value`) in `src/orchestration/chatOrchestrator.test.ts` (1 red test of mine before implementation; 0 regressions; all 27 tests in `src/orchestration/chatOrchestrator.test.ts` green after implementation with existing `Error`-instance tests unedited).
- Updated `src/orchestration/chatOrchestrator.ts` to call `hooks.onError` on every rejection, passing `Error` instances through unchanged and wrapping non-`Error` values with `new Error(String(error), {cause: error})` while re-throwing the original `error`.
- Updated `specs/hal-engine-config-hooks/spec.md`, repointed spec anchors across `specs/`, added the `CHANGELOG.md` entry under `## [Unreleased]`, ticked the completed facets in `.lore/dod.md`, and pushed `4db6abd` to `origin/loop-bench/95`.
- Unrelated smell noticed (untouched): `src/orchestration/onErrorNonError.acceptance.test.ts` uses `new Date().toISOString()` in `sessionWith`, which may trigger `re-lint/no-nondeterministic-tests`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Error with cause for hooks.onError, confirm existing Error tests pass unedited, and document in CHANGELOG.md","tdd_next":"acceptance green"}}