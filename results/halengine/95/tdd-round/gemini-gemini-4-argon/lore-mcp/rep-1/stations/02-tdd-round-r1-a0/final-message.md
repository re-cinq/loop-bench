Fixed the CI ESLint failure (`re-lint/no-nondeterministic-tests` at `src/orchestration/onErrorNonError.acceptance.test.ts:12:48`) by replacing `new Date().toISOString()` with `'2026-01-01T00:00:00.000Z'`, formatted with Prettier, verified spec anchors, and pushed to `origin`.
0 red tests were mine and 0 were regressions; this round ran no tests here (fixed the single ESLint finding reported by CI).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix re-lint/no-nondeterministic-tests in src/orchestration/onErrorNonError.acceptance.test.ts","tdd_next":"acceptance green"}}