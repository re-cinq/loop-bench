I closed the first two facets: the protocol types and `list_sessions` frame validation. Both are committed and pushed, and the branch is level with its upstream. I merged `origin/main`; it was already up to date. The acceptance tests aren't green yet, because nothing handles or answers a `list_sessions` frame.

- **Test:** I ran only `src/transport/ws/validation.test.ts`, and all 12 tests pass. I wrote the tests and the code in one go, so there was no separate red run before the implementation.
- **Types:** `src/types/messages.ts` gains `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage`, added to the incoming and outgoing unions. `src/index.ts` re-exports them.
- **Validation:** `validation.ts` accepts a bare `{type: 'list_sessions'}`. It rejects a `limit` that isn't a non-negative integer. It also rejects a `before` that isn't `{updatedAt, sessionId}` with a 1–128 character `sessionId` and a parseable `updatedAt`. Unknown fields such as `userId` are dropped.
- **Tracking:** I added one spec statement about `list_sessions` frames to `specs/hal-engine-websocket-protocol/spec.md`, with a link to the new test at line 24. I set the link by hand because `scripts/spec-links/reanchor.mjs` doesn't exist in this repo. I ticked both facets in `.lore/dod.md`.
- **Regressions:** none seen. This round's own tests were green, and CI hasn't judged the push yet.

**Ticket and acceptance tests disagree:** `ticket.md` names the frames `list_conversations` and `conversation_list`, with an `UNSUPPORTED` code and `transport.history`. `.lore/dod.md` and the acceptance tests use `list_sessions` and `session_list`. They also expect an empty list when the store has no `listFor`, which the ticket forbids. I followed the acceptance tests and left that conflict alone.

**Next round:** thread `sessionStore` into `createMessageHandler` and `createServer`, then handle `list_sessions` in `messageHandler.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions/session_list message types and validateMessage list_sessions validation","tdd_next":"thread sessionStore into createMessageHandler/createServer and handle list_sessions (listFor with session.userId, ISO serialisation, SERVER_ERROR logging)"}}