I fixed both red checks (`test` and `eslint`) and pushed commit `554607a` to `loop-bench/144`. The branch already includes `origin/main`, and `git status` shows it is not ahead of its upstream. CI hasn't judged the new commit yet.

**What was broken**
- **test:** the branch's acceptance tests in `conversationList.acceptance.test.ts` expect the server to answer `list_sessions`, but no code handled that request yet. The previous round had only added the message types and validation.
- **eslint:** 8 errors:
  - Code in the new acceptance test duplicated `sessionResume.test.ts` in three places: the `eventually` polling helper, the shutdown after each test, and the `delegatingTo` test store. All three duplicate pairs are gone.
  - One `prefer-early-return` in that test's `askAfterConnect`.
  - One `no-flag-params` (`Array(9).fill(false)`) in `validation.test.ts:58`.

**What I changed**
- `messageHandler.ts`: `createMessageHandler` now also takes the session store. A `list_sessions` request is answered without waiting for the per-session lock, so it isn't stuck behind a streaming answer. It calls `listFor` with the connection's own user id and `{limit, before}`, and ignores any `userId` the client sends. If `listFor` throws, it logs an error under `ws` and sends `SERVER_ERROR`.
- `sender.ts`: a new `sendSessionList` turns the dates into ISO strings.
- `createServer.ts`: passes the session store to the handler.
- `wsTestSupport.ts`: now exports `eventually` and `delegatingTo`. `sessionResume.test.ts` imports them instead of keeping its own copies.
- The acceptance test now starts and stops servers through the shared helpers, and still waits for sockets to close before restoring the logger.
- `validation.test.ts`: the check now asserts that none of the malformed requests are accepted. It tests the same thing as before, written without the boolean literal argument.

**Verified locally**
- `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport`: 18 suites, 200 tests passed.
- Prettier left all changed files unchanged.
- Per this pod's rules, I didn't run eslint or tsc.

**This branch doesn't match the ticket.** The tests I made pass were written on this branch and differ from issue #144 in four ways:
- The request is named `list_sessions` / `session_list`, not `list_conversations` / `conversation_list`.
- A store without `listFor` gets an empty list. The ticket says to send an `UNSUPPORTED` error.
- There is no `transport.history` opt-in flag, so the list is always available.
- `StoreCannotList` doesn't exist.

I kept to what the red build required, but a reviewer checking against the ticket will flag all four.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frames were never handled (acceptance tests red) and the new test duplicated sessionResume helpers plus two other lint findings"}}