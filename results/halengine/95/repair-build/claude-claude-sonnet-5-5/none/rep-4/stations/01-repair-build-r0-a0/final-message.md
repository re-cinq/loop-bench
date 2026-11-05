The eslint failure was `new Date()` in the test fixture at `src/orchestration/onErrorNonError.acceptance.test.ts:12`, which the `no-nondeterministic-tests` rule rejects. I replaced it with a fixed ISO timestamp (`'2026-01-01T00:00:00.000Z'`), so the test no longer depends on the clock.

I did not run eslint or the tests here, per the pod rules. I did run prettier on the file, which reported it unchanged. The fix is pushed and the branch is not ahead of its upstream. `origin/main` was already merged in, so there was nothing new to pull. The next CI run on the new head will confirm.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint no-nondeterministic-tests: replaced new Date() with a fixed timestamp in onErrorNonError.acceptance.test.ts"}}