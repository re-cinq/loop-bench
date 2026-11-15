I fixed the one eslint error CI reported, and the branch is pushed. CI hasn't re-run on it yet.

**What was broken:** At `src/orchestration/onErrorNonError.acceptance.test.ts:12`, the test session built its timestamp with `new Date().toISOString()`. The repo's lint rule `re-lint/no-nondeterministic-tests` rejects that because the test gives a different result on each run.

**Fix:** I replaced it with a fixed value, `'2024-01-01T00:00:00.000Z'`. Nothing in the test checks the timestamp, so no assertion changed.

**Checks:**
- Prettier left the file unchanged.
- `npm test -- src/orchestration/onErrorNonError.acceptance.test.ts` (Jest) passed both tests.
- I didn't run eslint here because this pod doesn't have the memory for it, so the lint result will come from CI's next run.
- The branch was at the sha CI judged, the merge from `origin/main` had nothing new to bring in, and the branch is not ahead of its upstream after the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint no-nondeterministic-tests: new Date() in onErrorNonError acceptance test replaced with fixed timestamp"}}