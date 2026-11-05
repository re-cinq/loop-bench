This round cleared the one CI finding: the `re-lint/prefer-polymorphism` error at `src/transport/ws/validation.ts:30`. The 3-way `switch` on `message.type` is now a `VALIDATORS` lookup table, and unknown types still return the same error message.

- **Tests:** I ran only `src/transport/ws/validation.test.ts`, which passes (6 tests). I didn't run the acceptance tests, and I didn't re-run eslint, per the round rules, so CI will confirm the lint fix.
- **Red tests:** none were mine this round, and there were no regressions.
- **Pushed:** the commit is pushed, `origin/main` was already merged in, and the branch is not ahead of its upstream.
- **`.lore/dod.md`:** I didn't change it, since this fix closes no facet.

**Unrelated mismatch:** the ticket specifies `list_conversations` / `conversation_list`, but the branch and `.lore/dod.md` build `list_sessions` / `session_list`. I left that alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"clear eslint prefer-polymorphism finding in validation.ts (lookup table)","tdd_next":"acceptance green"}}