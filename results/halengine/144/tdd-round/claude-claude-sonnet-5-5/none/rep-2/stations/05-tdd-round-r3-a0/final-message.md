This round fixed the four lint findings from CI's red build and pushed them. I did not run the lint, the typecheck or the acceptance tests here.

- **`validation.ts`:** the three-way `switch` on `message.type` is now a lookup table, guarded with `Object.hasOwn` so a type like `constructor` still reads as an unknown message type.
- **`validation.test.ts`:** the cursor case that used a boolean `updatedAt` now uses `null`. It is still an invalid cursor.
- **`wsTestSupport.ts`:** `settleAndStop` now waits for all servers' sockets to close in one step and then stops each server. That removes the seven-line duplicate with the acceptance file's teardown without touching the acceptance test.

I ran `validation.test.ts` and its 5 tests passed. `.lore/dod.md` already had every facet ticked, so I left it alone.

The branch is pushed, `origin/main` was already merged in, and `git status` shows it is not ahead of its upstream. All four red findings were lint errors from the previous push. No test was red, so there were no regressions.

One smell I left alone: the ticket text and the acceptance tests disagree on naming (`list_conversations` / `conversation_list` / `UNSUPPORTED` versus `list_sessions` / `session_list` / an empty list when `listFor` is missing). The branch follows the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: eslint prefer-polymorphism, no-flag-params and no-duplicate-code findings","tdd_next":"acceptance green"}}