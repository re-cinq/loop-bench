The branch is green locally for the suites I could run, and the fix is pushed to `loop-bench/144` as `7c6e03e`. The branch is level with its upstream, and `origin/main` was already merged, so no merge commit was needed.

**What was red:** the `test` job failed because the handler for `list_sessions` was never written; the acceptance suite from f291811 was red against it. The `eslint` job named eight findings across three test files.

**What I changed:**
- **Handler:** `list_sessions` is answered beside the per-session lock, using `ws.userId`, never the frame. Invalid frames get `INVALID_MESSAGE`. A store without `listFor` gets `UNSUPPORTED`. A throwing `listFor` gets `SERVER_ERROR` and a `ws` error log. `createMessageHandler` takes the store as an optional second argument, and `createServer` passes it.
- **Error code:** `UNSUPPORTED` added to `ErrorCodes` in `src/types/session.ts`.
- **Lint:** `delegatingTo` and socket teardown moved into `wsTestSupport.ts` and shared with `sessionResume.test.ts`. `askAfterConnect` loses its nested `if`. `Array(9).fill(false)` became `Array.from({length: 9}, () => false)`. These are fixes by reading, not by running eslint.

**Test expectation I changed:** the red test expected an empty `session_list` when the store has no `listFor`. The ticket forbids that ("a client that renders 'no conversations' … is a worse answer") and asks for an error. I changed the expectation to `UNSUPPORTED`. If you want the empty list instead, the code and this expectation change together.

**Ticket gaps I did not close:** the red suite uses `list_sessions` and `session_list`, not the ticket's `list_conversations` and `conversation_list`, so I kept the branch's names. The suite also passes no opt-in config, so I did not add the `transport.history` flag, which the ticket says defaults off. Both are ticket items that a later round will need to settle.

**Verified locally:**
- `npm test` on the three affected suites (`conversationList.acceptance`, `validation`, `sessionResume`): 32 of 32 pass.
- `npm test` on `src/transport/ws` and `createServer.test.ts`: 114 of 114 pass.
- `prettier --write` on the touched files: no changes needed.

**Not run:** eslint and typecheck, per the pod rules. The lint fixes and the type changes are unverified until CI judges the push. Jest also prints "Cannot log after tests are done" warnings from disconnect logs during teardown. They do not fail the run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions handler added and the three test files cleaned to clear the eight lint findings; local suites green, lint and typecheck left to CI"}}