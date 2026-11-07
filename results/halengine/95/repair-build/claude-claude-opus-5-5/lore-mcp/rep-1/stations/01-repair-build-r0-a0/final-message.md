The eslint check is fixed and pushed. CI failed on line 12 of `src/orchestration/onErrorNonError.acceptance.test.ts`, which called `new Date().toISOString()`. The `re-lint/no-nondeterministic-tests` rule rejects that.

**Fix:** the test now uses a fixed constant, `SENT_AT = '2026-01-01T00:00:00.000Z'`, for that timestamp. Other tests in the repo already do it this way, for example `mongoDurability.test.ts`. The test's assertions are unchanged.

**What I ran:**
- Prettier on that one file: no formatting changes.
- `npm test -- src/orchestration/onErrorNonError.acceptance.test.ts`: both tests pass. The repo runs Jest, so I used that rather than vitest.
- I did not run eslint, as instructed. CI will confirm the lint fix on the new push.

**Delivery:** the change is committed and pushed. `origin/main` was already merged in, and `git status` shows the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint re-lint/no-nondeterministic-tests: new Date() in onErrorNonError.acceptance.test.ts replaced with fixed timestamp"}}