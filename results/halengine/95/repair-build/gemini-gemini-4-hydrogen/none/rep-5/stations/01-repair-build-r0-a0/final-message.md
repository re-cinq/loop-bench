Replaced `new Date().toISOString()` with a fixed `SENT_AT` timestamp constant in `src/orchestration/onErrorNonError.acceptance.test.ts` to resolve the `re-lint/no-nondeterministic-tests` ESLint failure reported at line 12:48.

Verified with `npx prettier --write src/orchestration/onErrorNonError.acceptance.test.ts` and `npm test -- src/orchestration/onErrorNonError.acceptance.test.ts` (2/2 tests passed); ESLint was not run locally per pod constraints. Committed (`4b45051`), pushed to `origin/loop-bench/95`, and confirmed up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"replaced non-deterministic new Date() in src/orchestration/onErrorNonError.acceptance.test.ts with a fixed timestamp constant"}}