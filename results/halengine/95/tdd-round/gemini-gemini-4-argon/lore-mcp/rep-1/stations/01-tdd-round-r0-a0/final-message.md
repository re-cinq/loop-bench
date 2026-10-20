Completed one TDD round for #95:

- **Red:** Added unit test `wraps a non-Error rejection in an Error with cause and rethrows the original value` in `src/orchestration/chatOrchestrator.test.ts` (1 red test of mine, 0 regressions).
- **Green:** Updated `src/orchestration/chatOrchestrator.ts` so `hooks.onError` receives `error instanceof Error ? error : new Error(String(error), {cause: error})` while still rethrowing `error` unchanged; all 27 tests in `src/orchestration/chatOrchestrator.test.ts` passed.
- **Refactor & Traceability:** Cited the new unit test in `specs/hal-engine-config-hooks/spec.md`, repointed spec anchors across `specs/`, added the `## [Unreleased]` entry to `CHANGELOG.md`, ticked the facets in `.lore/dod.md`, formatted with Prettier, and pushed `5dffd0d` to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Error with cause and readable message in chatOrchestrator.ts, verify existing Error-instance unit tests, and document in CHANGELOG.md","tdd_next":"acceptance green"}}