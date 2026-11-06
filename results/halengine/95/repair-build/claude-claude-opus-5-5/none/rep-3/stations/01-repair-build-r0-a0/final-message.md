I fixed the one eslint error CI reported, and the branch is pushed.

**What was wrong:** at line 12, `src/orchestration/onErrorNonError.acceptance.test.ts` used `new Date().toISOString()` as the session timestamp. The lint rule `re-lint/no-nondeterministic-tests` forbids that because the test can't repeat exactly.

**Fix:** the test now uses a fixed `SENT_AT = '2026-01-01T00:00:00.000Z'`, the same value `chatOrchestrator.test.ts` uses.

**Checks:**
- Prettier left the file unchanged.
- `npm test -- src/orchestration/onErrorNonError.acceptance.test.ts` passed both tests. This repo runs Jest, not vitest.
- I did not run eslint here, as instructed, so CI's next run will confirm the lint fix.

**Delivery:** the commit is pushed to `loop-bench/95`. `origin/main` was already merged in, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint no-nondeterministic-tests: replaced new Date() with a fixed timestamp in onErrorNonError.acceptance.test.ts"}}