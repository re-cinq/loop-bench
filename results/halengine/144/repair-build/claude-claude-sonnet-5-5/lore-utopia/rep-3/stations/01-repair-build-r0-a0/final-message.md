I fixed the failing test and the lint findings and pushed the branch. The tests I ran pass. I didn't run the linter, as instructed, so CI will be the first to check the lint fixes.

- **`test` failure:** the branch had the `list_sessions` types and validation but no handler. I added `handleListSessions` in `src/transport/ws/messageHandler.ts`.
  - It reads the user id from `ws.userId`, never from the frame, and forwards `limit` and `before` to `listFor`.
  - It sends the dates as ISO strings.
  - A store with no `listFor` gets an empty `session_list`. A `listFor` that throws gets a `ws` error log and a `SERVER_ERROR` frame.
  - `createServer` now passes `options.sessionStore` to `createMessageHandler`.
- **`eslint` duplicate-code (`re-lint/no-duplicate-code`):** `eventually` and `delegatingTo` now live in `src/transport/wsTestSupport.ts`. `sessionResume.test.ts` imports them. `conversationList.acceptance.test.ts` uses the shared `startEngineWith`, `connectClient` and `stopEngines`.
- **`eslint` early-return (`re-lint/prefer-early-return`):** I flattened the message handler in the acceptance test into guard clauses.
- **`eslint` flag-param (`re-lint/no-flag-params`):** in `validation.test.ts`, `Array(9).fill(false)` became `rejected.map(() => false)`.

I ran `conversationList.acceptance`, `sessionResume`, `ws/validation` and `ws/messageHandler` through `npm test`: 86 tests passed. The run printed a "Cannot log after tests are done" warning from a socket-close log, and it didn't fail anything. I ran prettier on the changed files and did no typecheck or build.

I merged `origin/main`, which added nothing, and `git status` shows the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"added list_sessions handler (session_list / SERVER_ERROR) to messageHandler and wired the store in createServer; deduplicated ws test helpers into wsTestSupport, flattened early-return, removed boolean flag arg"}}