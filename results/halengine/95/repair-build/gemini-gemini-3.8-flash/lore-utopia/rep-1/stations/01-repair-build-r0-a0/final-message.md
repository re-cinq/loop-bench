CI failed on eslint rule `re-lint/no-nondeterministic-tests` at `src/orchestration/onErrorNonError.acceptance.test.ts:12:48` due to `new Date()`.

Replaced `new Date().toISOString()` with a fixed ISO timestamp `'2026-01-01T00:00:00.000Z'`, formatted the file with Prettier, verified the test suite and spec anchors passed, and pushed the commit to origin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"new Date() in onErrorNonError.acceptance.test.ts violated re-lint/no-nondeterministic-tests"}}