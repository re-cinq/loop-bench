I have fixed the CI failures reported in the brief:
- Reverted the accidental addition of a duplicate test in `src/orchestration/chatOrchestrator.test.ts` (which also shifted all lines and broke ESLint's spec-link checks), as the strategy relied on the existing acceptance tests.
- Replaced `new Date().toISOString()` with a deterministic string in `src/orchestration/onErrorNonError.acceptance.test.ts` to satisfy the `re-lint/no-nondeterministic-tests` ESLint rule.
- Repointed the spec anchors in `specs/hal-engine-config-hooks/spec.md` to match the exact lines of the acceptance tests in `onErrorNonError.acceptance.test.ts`.
- Added the missing `CHANGELOG.md` entry under `## [Unreleased]` -> `### Fixed` describing the behavior change.

0 red tests were mine and 0 were regressions (only ESLint, spec-names, and changelog verification errors reported by CI were fixed).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under ## [Unreleased] describing the behaviour change for existing consumers.","tdd_next":"acceptance green"}}