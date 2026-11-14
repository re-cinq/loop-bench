Resolved the CI `eslint` failure (`re-lint/no-nondeterministic-tests`) at `src/orchestration/onErrorNonError.acceptance.test.ts:12:48` by replacing `new Date().toISOString()` in `sessionWith` with a fixed ISO timestamp (`'2026-01-01T00:00:00.000Z'`), verified Prettier formatting and spec citation line anchors, and pushed commit `2f9f392` to `origin/loop-bench/95`.

- Red tests: 0 yours, 0 regressions (CI failed on ESLint only; this round ran no tests locally as no new test file was introduced and acceptance tests are executed by CI).
- Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI eslint re-lint/no-nondeterministic-tests in src/orchestration/onErrorNonError.acceptance.test.ts","tdd_next":"acceptance green"}}