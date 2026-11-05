This round closed the wire-types facet and pushed it. The branch is up to date with `origin/main` and not ahead of its upstream.

- **Types:** `src/types/messages.ts` gains `SessionSummaryFrame` and `SessionListMessage`, and `SessionListMessage` is now part of `OutgoingMessage`. `src/index.ts` now re-exports `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage`.
- **Test:** the new test is `src/types/messages.test.ts`, and it passes. It builds a `session_list` frame with ISO-string times and checks it survives a JSON round trip. I didn't see it fail first: the type-only change gave it nothing to fail on at runtime, and I never confirmed that jest type-checks.
- **Not run:** I didn't run the acceptance tests, lint, the typechecker or any build here.
- **`.lore/dod.md`:** I ticked the types facet.
- **Red tests:** the one test I wrote is green, and none are red. I didn't check which tests cover `messages.ts` on main, so I can't rule out a regression.
- **Ticket vs `.lore/dod.md`:** the ticket names `list_conversations` and `conversation_list`, with `transport.history` and `UNSUPPORTED`. `.lore/dod.md` and the acceptance tests use `list_sessions` and `session_list`, so I followed `.lore/dod.md`. For an unsupported store it also expects an empty `session_list`, where the ticket expects an error. The next rounds should settle which one is meant.

Next facet: thread `sessionStore` into `createMessageHandler` and `createServer`, then handle `list_sessions` in the handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"SessionSummaryFrame/SessionListMessage wire types, OutgoingMessage union and index.ts re-exports","tdd_next":"thread sessionStore into createMessageHandler/createServer and handle list_sessions"}}