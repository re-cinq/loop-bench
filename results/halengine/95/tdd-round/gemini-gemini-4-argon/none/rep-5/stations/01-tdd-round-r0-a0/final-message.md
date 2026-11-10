Completed one TDD round:

- **Red:** Added unit test `wraps a non-Error rejection in an Error with cause for onError while rethrowing the original value` in `src/orchestration/chatOrchestrator.test.ts` (1 red test of mine, 0 regressions).
- **Green & Refactor:** Updated `src/orchestration/chatOrchestrator.ts` so `catch (error)` coerces non-`Error` values via `toError(error)` (`new Error(String(error), {cause: error})`) while passing `Error` instances through unchanged and re-throwing the raw `error`. All 27 tests in `src/orchestration/chatOrchestrator.test.ts` pass.
- **Traceability & Delivery:** Linked the test in `specs/hal-engine-config-hooks/spec.md`, repointed spec anchors across affected specs, added the `CHANGELOG.md` entry under `## [Unreleased]`, ticked the completed facets in `.lore/dod.md`, formatted with Prettier, committed, and pushed to `origin`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Error for hooks.onError, confirm existing Error tests pass, and document in CHANGELOG.md","tdd_next":"acceptance green"}}