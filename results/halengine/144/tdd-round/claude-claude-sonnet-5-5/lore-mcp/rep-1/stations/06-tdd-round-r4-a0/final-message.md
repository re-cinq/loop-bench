I fixed four of the five lint findings and pushed them. One remains: `prefer-early-return` at `conversationList.acceptance.test.ts:67`. I can't fix it without editing an acceptance test, and CI will stay red on that finding until someone decides how to handle it. The branch is pushed and not ahead of its upstream. `origin/main` was already merged.

- **`validation.ts`:** the `camelcase` errors on `user_message` and `list_sessions` are gone. The dispatch table is now a `Map` keyed by string, because prettier strips quotes from plain object keys.
- **`wsTestSupport.ts`:** the three-hop member chain is fixed by passing `hal.wss` to a one-hop helper. `untilNoClients` now sits below `closeAll`.
- **Tests:** I ran `validation.test.ts` under Jest, since this repo uses Jest, not vitest. It passed with 5 tests. I did not run the acceptance tests, per the instructions.
- **`.lore/dod.md`:** I ticked the new lint item and marked the acceptance-file finding as blocked.
- **Red tests:** none this round, mine or regressions. The only red check is the eslint finding above.
- **Naming drift:** the ticket specifies `list_conversations` / `conversation_list` and `UNSUPPORTED`, while `.lore/dod.md` and the acceptance tests use `list_sessions` / `session_list`. I left that alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint repairs in validation.ts and wsTestSupport.ts","tdd_next":"re-check CI verdict; the acceptance file's prefer-early-return finding (line 67) needs a human decision"}}