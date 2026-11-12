CI failed on check `eslint` at `src/orchestration/onErrorNonError.acceptance.test.ts:12:48` due to rule `re-lint/no-nondeterministic-tests` flagging `new Date()`.

Replaced `new Date().toISOString()` with a constant ISO timestamp (`'2026-01-01T00:00:00.000Z'`), verified the acceptance tests pass locally via Jest, ran Prettier, verified spec link anchors remain aligned, and pushed the commit to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"replace new Date() with fixed timestamp in onError acceptance test to satisfy re-lint/no-nondeterministic-tests"}}