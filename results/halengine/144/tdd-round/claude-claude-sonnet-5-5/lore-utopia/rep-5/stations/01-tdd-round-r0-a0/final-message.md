I closed the first two facets: the wire types and the `list_sessions` validation. The change is pushed, and the branch is not ahead of its upstream. `origin/main` was already merged in.

- **Types:** `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage` are in `src/types/messages.ts`. They are added to the `IncomingMessage` and `OutgoingMessage` unions and re-exported from `src/index.ts`.
- **Validation:** `validateMessage` in `src/transport/ws/validation.ts` now accepts `list_sessions`.
  - A bare frame is valid.
  - `limit` must be a non-negative integer.
  - `before` must be an object with a `sessionId` of 1–128 characters and a parseable `updatedAt` (string or number).
  - Any other field, such as a client-supplied `userId`, is dropped.
- **Test:** I added unit tests to `src/transport/ws/validation.test.ts`. Running that file, 13 of 13 pass, including the new ones. I ran no acceptance tests and no lint or typecheck, as instructed. I ticked both facets in `.lore/dod.md`.
- **Mismatch:** The ticket text and `.lore/dod.md` disagree. The ticket specifies `list_conversations` and `conversation_list` with opt-in and `UNSUPPORTED` behaviour. The DoD and the acceptance tests use `list_sessions` and `session_list`, answer an empty list when the store has no `listFor`, and have no flag. I followed the acceptance tests because they define the bar.
- **Spec links:** I added no spec citations this round, because the spec text for the new frames is the last facet. There was no round-brief, so I had no CI verdict to check. No regressions came up.

Next round is the handler: thread `sessionStore` into `createMessageHandler`, wire it in `createServer`, and answer `list_sessions`. After that comes the spec documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"types and list_sessions validation","tdd_next":"thread sessionStore into createMessageHandler/createServer and handle list_sessions (session_list, SERVER_ERROR logging), then spec docs"}}