I fixed one of the two lint errors CI reported. The other one is in the acceptance test, which I'm not allowed to edit, so the build will stay red until you decide what to do about it.

- **Fixed: `src/transport/wsTestSupport.ts:122`** (`max-member-chain`). `stopWhenDrained` now stores `hal.wss.clients` in a variable first and polls its `.size`, so the chain is never more than two hops. It's the same Set object either way, so behaviour doesn't change. `src/transport/sessionResume.test.ts`, the one test file that uses this helper, passes under Jest (25/25). I didn't run any acceptance tests.
- **Still red: `src/transport/conversationList.acceptance.test.ts:67`** (`prefer-early-return`). The line is inside the acceptance test, so this round can't fix it, and the round before couldn't either. You need to choose one of these:
  - rewrite that `if` in the acceptance test yourself, or
  - relax that lint rule for acceptance tests.

  I didn't touch the lint config, because doing that to turn a build green would be getting round the check rather than passing it.

**Red tests on the last push:** two lint findings and no failing tests. One finding was in a test-support file a previous round wrote and is now fixed. The other is in the acceptance test itself. Neither was a regression.

**Other problems I noticed but left alone:**
- `.lore/dod.md` describes the frames as `list_sessions` / `session_list` and says a store without `listFor` gets an empty list. The ticket says `list_conversations` / `conversation_list`, and says that case should get an `UNSUPPORTED` error, not an empty list. Someone should reconcile these.
- Running `npx vitest` on this repo fails, because the tests are Jest (`beforeAll is not defined`).

I updated `.lore/dod.md` to say the `wsTestSupport.ts` finding is cleared and the acceptance-test one is still open. The commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream. The next round takes the §5 `session_list` field table in `specs/hal-engine-websocket-protocol/spec.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI eslint max-member-chain at wsTestSupport.ts:122 cleared","tdd_next":"Add the §5 session_list field table to specs/hal-engine-websocket-protocol/spec.md; acceptance-test lint at conversationList.acceptance.test.ts:67 needs owner decision"}}