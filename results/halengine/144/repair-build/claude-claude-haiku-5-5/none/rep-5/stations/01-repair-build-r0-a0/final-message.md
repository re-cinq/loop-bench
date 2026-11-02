The red build is repaired and pushed to `loop-bench/144` (`5cd4e67..ee173f5`). The branch is not ahead of its upstream, and `origin/main` was already an ancestor, so the merge produced nothing.

**What CI named and what I changed**

- **`test` (the acceptance suite).** The `list_sessions` frame was validated but never handled. `createMessageHandler` now takes an optional session store, and it answers `list_sessions` off the per-session lock with a `session_list` frame. The user is `session.userId`, never a frame field, and summaries go out as ISO strings. A store with no `listFor` gets an `UNSUPPORTED` error. A throwing `listFor` gets a `SERVER_ERROR` plus a `ws` error log. `createServer` passes the store through, and `ErrorCodes` gains `UNSUPPORTED`.
- **One expectation changed.** The test "answers an empty session_list when the store has no listFor" conflicted with the ticket, which says an empty list must never be sent for that case. I changed the expectation to `UNSUPPORTED`, following the ticket. This is a correction, not a loosening.
- **`eslint` (duplicate code).** `eventually` and `delegatingTo` were copied into both acceptance and session-resume tests. They now live once in `src/transport/wsTestSupport.ts`.
- **`eslint` (prefer-early-return).** The `askAfterConnect` message handler in `conversationList.acceptance.test.ts` now uses early returns.
- **`eslint` (no-flag-params).** `Array(9).fill(false)` in `validation.test.ts` is now `Array.from({length: 9}, () => false)`.

**Verification**

- Jest, scoped to the touched files: `conversationList.acceptance.test.ts`, `sessionResume.test.ts`, and `ws/validation.test.ts` pass (32 tests). `ws/messageHandler.test.ts`, `createServer.test.ts`, `ws/beforeToolCall.test.ts`, and `ws/sessionSave.test.ts` pass (75 tests).
- Prettier reports all seven changed files as already formatted.
- I did not run eslint, and I did not typecheck or build, per the pod rules. The lint fixes are read from the annotations, so CI has the final say on them.

**Not done, and worth knowing**

- The Lore trace tools are not available in this pod, so I could not query `failures_touching` for these files.
- The branch names the frames `list_sessions` / `session_list`, but the ticket specifies `list_conversations` / `conversation_list`. I kept the branch's names because the red tests are written against them. Renaming would be a separate change.
- The ticket's opt-in `transport.history` flag, the spec and docs updates, and the CHANGELOG entry are not on this branch. The verdict did not name them and the tests do not exercise them, so I left them alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frames were validated but never answered: wired the handler and store, then cleared the eslint duplicate-code, early-return and no-flag-params findings in the new tests"}}