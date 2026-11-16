I fixed the one eslint error CI reported. I didn't run the linter or the tests here, so CI has to confirm.

The error was `re-lint/no-nondeterministic-tests` at `src/orchestration/onErrorNonError.acceptance.test.ts:12`, where the session fixture used `new Date().toISOString()`. I replaced that with the fixed timestamp `'2026-01-01T00:00:00.000Z'`. Prettier left the file unchanged.

The branch had not moved since CI judged it, and `origin/main` was already merged. I pushed the fix, and `git status` shows the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"replaced new Date() with a fixed timestamp in onErrorNonError.acceptance.test.ts to satisfy re-lint/no-nondeterministic-tests"}}