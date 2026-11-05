Closed two facets this round: the `list_sessions`/`session_list` types and the `list_sessions` frame validation. The new validation tests pass (5 of 5 in `validation.test.ts`), and the commit is pushed with no merge needed from `origin/main`. I didn't run the acceptance tests or the typechecker here. There was no round brief, so I had no CI verdict to work from.

- **Types:** `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage` are in `src/types/messages.ts`, added to the `IncomingMessage` and `OutgoingMessage` unions, and re-exported from `src/index.ts`.
- **Validation:** `validateMessage` now handles `list_sessions`. It accepts a bare frame, and `limit` must be a non-negative integer. `before` must be a `{updatedAt, sessionId}` cursor with a 1–128 character id and a parseable date, and any `userId` on the frame is dropped.
- **Tests:** two new tests in `validation.test.ts` cover the accepted frames and the eight malformed ones.
- **`.lore/dod.md`:** I ticked those two facets.

The ticket text says `list_conversations` / `conversation_list` with an `UNSUPPORTED` error code. `.lore/dod.md` and the red acceptance test say `list_sessions` / `session_list`, with an empty list for a store that has no `listFor`. I followed `.lore/dod.md`. The ticket's no-empty-list rule and error code conflict with that and need a decision at some point.

The next round takes the `messageHandler.ts` wiring (the remaining facets). That means threading `sessionStore` into `createMessageHandler`, wiring it in `createServer.ts`, and handling `list_sessions` there. The spec documentation facet comes after that.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions/session_list types and frame validation","tdd_next":"thread sessionStore into createMessageHandler/createServer and handle list_sessions (answer session_list, SERVER_ERROR on throw), then specs"}}