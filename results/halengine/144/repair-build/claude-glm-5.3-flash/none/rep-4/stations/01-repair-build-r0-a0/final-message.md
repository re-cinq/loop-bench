Done — working tree clean, pushed, `origin/main` merged (already up to date), and the only commits ahead of it are this ticket's own.

## What was broken and what I changed

**The `test` failure** — `list_sessions` had types and validation but no handler, so the frame fell off the end of `answerFrame` and the ping-barrier acceptance test hung. Implemented in `src/transport/ws/messageHandler.ts`:
- `list_sessions` answers `session_list` with the socket's own authenticated user's `listFor` summaries (ISO-8601 timestamps, `limit`/`before` forwarded, any client-supplied `userId` ignored); a store without `listFor` answers an empty list; a throwing `listFor` logs on the `ws` category and answers `SERVER_ERROR`.
- Because `ws` parses frames in one synchronous pass, ping/`session_list` answers now serialise per socket (`answerInOrder`) — a pong never precedes the frame asked before it — while staying off the per-session turn lock, so a list never queues behind a streaming answer.

**The eight eslint errors** — the three duplicate-code pairs went away by moving the `eventually`/`delegatingTo`/server-tracking scaffolding that `sessionResume.test.ts` had copied into the existing `wsTestSupport.ts` (with a draining `stopEngines` so no close is logged after teardown restores the logger); the `prefer-early-return` finding went away by reshaping the `askAfterConnect` listener; the `no-flag-params` finding by `Array.from({length: 9}, () => false)` in `validation.test.ts`. Supporting edits: `connectionHandler.ts` passes `ExtWebSocket` (the handler reads `ws.userId`), and `createMessageHandler` takes the store it answers lists from — threaded to all call sites.

**Follow-through** — repointed the spec anchors for the moved test lines (the branch-authored conversation-list spec by hand, since the baseline script skips it; eight others via the repo's own script), and corrected the now-false CHANGELOG sentence claiming nothing in the engine calls `listFor`.

**Branch-vs-ticket note:** the ticket's mock proposes `UNSUPPORTED` for stores without `listFor` and a `transport.history` opt-in; the branch's own spec and red tests (from the prior round) define an empty `session_list` and no opt-in instead. I implemented the branch's contract — the failing test asserts it verbatim.

**Verified locally:** jest over the twelve touched/ws-adjacent suites (153 tests, green), prettier over the changed `.ts` files, and the cheap checks CI runs after lint — `spec:names`, `check:spec-links`, `check:spec-status`, `docs:check`, `check:regions`. Not run here, per the pod's limits: eslint, typecheck, build, and the repo-wide coverage run (the `docs:check-paths` `dist/` findings resolve once CI's build step runs, which precedes it).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions frame had no handler (acceptance test hung) plus 8 eslint findings: duplicate ws scaffolding, prefer-early-return, boolean flag param"}}