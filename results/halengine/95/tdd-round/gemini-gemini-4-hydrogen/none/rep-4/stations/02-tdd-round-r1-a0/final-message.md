Fixed the CI findings and closed the remaining facets for #95:

- Replaced `new Date().toISOString()` with `'2026-01-01T00:00:00.000Z'` in `src/orchestration/onErrorNonError.acceptance.test.ts` (`re-lint/no-nondeterministic-tests`).
- Added unit tests in `src/orchestration/chatOrchestrator.test.ts` for plain-object `cause` preservation, `undefined` `cause` preservation, and `Error`-instance identity preservation; all 30 tests in `src/orchestration/chatOrchestrator.test.ts` passed (0 red tests written, 0 regressions; acceptance tests were not run locally).
- Added the `## [Unreleased]` entry in `CHANGELOG.md`, updated spec citations/anchors (`specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-tool-input-validation/spec.md`), ticked the closed facets in `.lore/dod.md`, and pushed `b09bd0c` to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in chatOrchestrator.test.ts for plain-object and undefined cause preservation and Error-instance identity, confirm existing Error tests pass, fix CI eslint/changelog failures, and add CHANGELOG.md entry","tdd_next":"acceptance green"}}