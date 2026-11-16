I fixed the one eslint finding from CI and pushed it. I didn't run any tests, lint or typecheck in this pod, so CI is the judge of the fix.

- **The finding:** `re-lint/no-nondeterministic-tests` at line 12 of `onErrorNonError.acceptance.test.ts`, where the test used `new Date().toISOString()`. I replaced it with the fixed timestamp `'2026-01-01T00:00:00.000Z'`. Prettier reported the file unchanged.
- **Delivery:** The branch already contains `origin/main`, so there was no merge. The push succeeded, and `git status` shows it isn't ahead of its upstream.
- **Facets and acceptance:** `.lore/dod.md` already has every facet and both acceptance tests ticked, so I didn't change it.
- **Failures:** None of the red results were tests I wrote this round, and there were no regressions. The only red check was the one eslint error.
- **Unrelated smells:** None noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI eslint finding: deterministic timestamp in acceptance test","tdd_next":"acceptance green"}}