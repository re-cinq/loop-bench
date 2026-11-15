I fixed the red test and eslint checks, and the affected test suites now pass locally. The commit is `4d69c7b` and it's pushed. The branch was already up to date with `origin/main`, and `git status` shows it isn't ahead of its upstream.

**What was broken**
- **test:** The branch had acceptance tests for listing sessions over the socket, but the code that answers that request had never been written, so the tests got no reply.
- **eslint:** The new acceptance test copied about 30 lines of setup from `sessionResume.test.ts` (three duplicate-code errors on each side). It also had one nested-`if` finding (prefer-early-return), and `validation.test.ts:58` passed a bare `false` to a function (no-flag-params).

**What I changed**
- `src/transport/ws/messageHandler.ts`: `createMessageHandler` now takes the session store as well. A `list_sessions` request is answered right away rather than waiting behind a streaming reply. The list is always for the connected user (`ws.userId`), even if the request names someone else. Dates go out as ISO strings. A store that throws gets a `SERVER_ERROR` reply and an error log with the session id, user id and error message.
- `src/transport/createServer.ts`: passes the store in.
- **Lint fixes:** I moved the duplicated store helper (`delegatingTo`) into `wsTestSupport.ts` and pointed both test files at it. The acceptance test now uses the existing shared helpers for starting and stopping servers, and its message callback no longer nests. The `Array(9).fill(false)` became `Array.from({length: 9}, () => false)`. I also made the shared teardown `stopEngines` wait for server sockets to close before stopping. Without that, the acceptance test logged "Cannot log after tests are done" nine times.

**Checks I ran:** `npm test` (Jest) on the ten suites that touch this code, including the acceptance, session-resume, validation and message-handler tests: 126 of 126 passed, with no late-log warnings. I ran prettier on the changed files. As instructed, I didn't run eslint or a typecheck here, so CI's next run is what will confirm those.

**The branch doesn't match the ticket yet.** The tests and types from earlier rounds use `list_sessions` / `session_list`, not the ticket's `list_conversations` / `conversation_list`. They also expect an empty list when the store has no `listFor`, where the ticket wants an `UNSUPPORTED` error. I built to those tests, because CI judges against them. These parts of the ticket aren't built yet:
- the `transport.history` opt-in flag
- the `UNSUPPORTED` error code and `StoreCannotList`
- the spec and docs changes

That needs a separate decision, not a fix in this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions handler was missing (acceptance tests red) and the new test duplicated sessionResume helpers/used a flag param (eslint); implemented the handler and shared the helpers"}}