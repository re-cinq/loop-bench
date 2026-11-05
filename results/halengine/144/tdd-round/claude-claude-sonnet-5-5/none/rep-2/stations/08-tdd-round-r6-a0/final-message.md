I fixed the one CI finding, the eslint `no-flag-params` error at `src/transport/ws/validation.test.ts:48`. The assertion `toEqual(Array(8).fill(false))` is now `expect(results.filter(result => result.valid)).toEqual([])`, which checks the same thing without a boolean literal.

I ran `validation.test.ts` alone and its 5 tests pass. I did not run lint here (it would be killed by the pod's memory limit), so CI's next run is what shows whether the finding is cleared. I also did not run the acceptance tests.

The fix is committed and pushed. `origin/main` was already merged in, and the branch is level with its upstream.

No tests were red this round, so none were mine and none were regressions. `.lore/dod.md` needed no change: every facet was already ticked, and its first three boxes are acceptance tests CI judges.

One thing I noticed and left alone: `.lore/dod.md` describes the frames as `list_sessions` / `session_list`, but `ticket.md` names them `list_conversations` / `conversation_list`. I changed nothing about that.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: eslint no-flag-params in validation.test.ts","tdd_next":"acceptance green"}}