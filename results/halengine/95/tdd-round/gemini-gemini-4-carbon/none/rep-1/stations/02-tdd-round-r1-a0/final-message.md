Fixed all CI findings from the previous push (`eslint` and `spec-names`): replaced `new Date().toISOString()` in the `sessionWith` fixture helper of `src/orchestration/onErrorNonError.acceptance.test.ts` with a fixed ISO timestamp (`re-lint/no-nondeterministic-tests`) and repointed the two off-by-one spec citations in `specs/hal-engine-config-hooks/spec.md` from `#L52`/`#L63` to `#L53`/`#L64` (`check-spec-anchor-names` and `re-lint/require-spec-link`).

Red tests on the previous push: 0 ours, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI eslint (re-lint/no-nondeterministic-tests, re-lint/require-spec-link) and spec-names anchor findings","tdd_next":"acceptance green"}}