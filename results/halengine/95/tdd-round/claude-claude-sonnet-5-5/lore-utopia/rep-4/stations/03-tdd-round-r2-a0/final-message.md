This round fixed both lint errors CI reported on the last push. I ran no tests, lint or typecheck here; CI judges the push.

- **`src/orchestration/chatOrchestrator.ts`:** the comment about a store outage belongs to `saveSession`. My earlier insertion had pushed it above `toError`, which made a two-line comment. I moved it back above `saveSession`, so `toError` now has a one-line comment.
- **`src/orchestration/onErrorNonError.acceptance.test.ts`:** I replaced `new Date().toISOString()` with a fixed timestamp string. This edits the setup helper only, not an assertion.

The branch is pushed and not ahead of its upstream. Merging `origin/main` produced nothing new.

No test went red this round, so there were no regressions to separate from my own tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI eslint findings (comment length, nondeterministic test date)","tdd_next":"acceptance green"}}