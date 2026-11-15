I fixed both red checks, `test` and `eslint`, on `loop-bench/144` and pushed. It was already up to date with `origin/main` and has nothing unpushed. Locally, the jest suite for `src/transport` passes (200 of 200). I didn't run the linter or a typecheck in this pod, so CI still has to confirm the eslint fixes and the types.

**test:** the acceptance tests failed because nothing answered a `list_sessions` frame yet. That part of the work hadn't been written.
- `src/transport/ws/messageHandler.ts`: `createMessageHandler(orchestrator, sessionStore?)` now answers `list_sessions` outside the per-session lock, next to `ping`.
  - It calls `listFor(session.userId, {limit, before})`, using the connection's user and never a user id from the frame.
  - It replies with `session_list`, with both times as ISO strings.
  - If the store has no `listFor`, the reply is an empty list.
  - If `listFor` throws, it logs a `ws` error with the session id, user id and error message, and sends a `SERVER_ERROR` frame.
- `src/transport/createServer.ts`: passes `options.sessionStore` to the handler.

**eslint**, all 8 errors:
- **Duplicated code (3 pairs):** the wait helper, the server teardown and the stripped-down test store were copied between the new acceptance test and `sessionResume.test.ts`. They now live once in `wsTestSupport.ts` (`eventually`, `stopWhenClosed`, `delegatingTo`) and both tests import them.
- **prefer-early-return:** I flattened the message callback in `askAfterConnect` in the acceptance test.
- **no-flag-params:** in `validation.test.ts`, `Array(9).fill(false)` became a check against the string `'rejected'`. It asserts exactly the same thing.

The run also printed a "Cannot log after tests are done" warning: a late `disconnected` info log after a test finished. It isn't a failure, and I didn't check whether it happened before this change.

**Decision for you:** the tests on this branch disagree with the ticket in several ways, and I built to the tests because CI judges against them.
- They use the frame names `list_sessions` / `session_list`, where the ticket says `list_conversations` / `conversation_list`.
- They expect an empty list when the store has no `listFor`, where the ticket says an `UNSUPPORTED` error, not an empty list.
- They don't require the `transport.history` opt-in flag.

Changing the code to match the ticket means changing these tests first. Two other parts of the ticket are still undone: the `transport.history` flag and the `UNSUPPORTED` error code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions was not handled by the message handler (acceptance tests red), and eslint flagged duplicated ws test helpers, a nested-if callback and a boolean fill argument"}}