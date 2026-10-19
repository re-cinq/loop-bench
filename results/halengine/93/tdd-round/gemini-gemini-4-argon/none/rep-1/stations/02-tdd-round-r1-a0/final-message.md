Closed the remaining facets for #93 and resolved the CI failures from the previous push:
- Updated `OrchestratorHooks.afterModelResponse` parameter to `turnUsage` with a one-line JSDoc comment, and synced the `OrchestratorHooks` doc-blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`.
- Added unit test coverage in `src/orchestration/chatOrchestrator.test.ts` for summing usage across rounds and refactored `scriptedProvider` to resolve `re-lint/no-duplicate-code`.
- Updated `specs/hal-engine-config-hooks/spec.md` to remove the obsolete `lastUsage` out-of-scope bullet, convert the remaining out-of-scope note to a prose paragraph (resolving `re-lint/require-status-matches-coverage`), and re-anchored spec citations.
- Added the `CHANGELOG.md` entry under `## [Unreleased]` (`### Changed`).
- Red tests in this round: 0 of mine, 0 regressions (CI failures were `eslint` and `changelog` checks).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the hook's signature say it is a turn total, update specs/hal-engine-config-hooks/spec.md, and add CHANGELOG.md entry","tdd_next":"acceptance green"}}