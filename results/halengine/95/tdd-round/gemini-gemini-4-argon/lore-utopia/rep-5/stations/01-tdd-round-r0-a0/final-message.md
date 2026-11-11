Completed one red-green-refactor round for #95:

- Added a failing unit test in `src/orchestration/chatOrchestrator.test.ts` (`wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original`) and verified it failed in the red phase (1 red test ours, 0 regressions).
- Updated `src/orchestration/chatOrchestrator.ts` to coerce non-`Error` rejections via `toError(error)` (`new Error(String(error), {cause: error})`) before invoking `hooks.onError`, leaving `Error` instances untouched and still rethrowing the original `error` value.
- Verified the unit test passed in the green phase, updated `specs/hal-engine-config-hooks/spec.md`, repointed spec anchors via `scripts/repoint-spec-anchors.mjs`, added the `CHANGELOG.md` entry under `## [Unreleased]`, ticked the facets in `.lore/dod.md`, and pushed `bef32e6` to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Error with readable message and original cause in chatOrchestrator.ts and update CHANGELOG.md","tdd_next":"acceptance green"}}