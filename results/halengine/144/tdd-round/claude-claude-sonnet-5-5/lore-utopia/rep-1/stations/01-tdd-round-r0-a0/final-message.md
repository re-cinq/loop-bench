I closed the first two facets: the protocol types and the `list_sessions` validation. The three acceptance tests are still red, because nothing handles the frame yet. I didn't run them, per the brief.

- **Types:** `src/types/messages.ts` now has `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage`, added to `IncomingMessage` and `OutgoingMessage`. All three are re-exported from `src/index.ts`.
- **Validation:** `validateMessage` in `src/transport/ws/validation.ts` accepts `list_sessions`, as the acceptance test and `.lore/dod.md` require.
  - `limit`, when present, must be a non-negative integer.
  - `before`, when present, must be an object with a `sessionId` of 1–128 characters and an `updatedAt` that is a valid date string or number.
  - Any other field, such as a client-sent `userId`, is dropped.
- **Test:** I added cases to `src/transport/ws/validation.test.ts` for the bare frame, the pass-through with `userId` dropped, and nine malformed frames. That file passes with 13 tests. The repo uses Jest, so I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js` rather than vitest.
- **dod:** I ticked both facets.
- **Delivery:** the commit is pushed, merging `origin/main` changed nothing, and the branch is not ahead of its upstream.

**Not done:**
- No spec or docs edits this round, so the spec statements have no validation citations yet.
- No other test or CI check was run.
- I didn't ask the graph which existing tests cover the files I edited.

**Ticket vs brief:** the ticket text describes a `list_conversations` / `conversation_list` frame with a `transport.history` flag and `UNSUPPORTED` errors. `.lore/dod.md` and the acceptance tests use `list_sessions` / `session_list`, with an empty list when the store has no `listFor`. I followed `.lore/dod.md`, since it is the stated bar.

No test was red because of my change; the one failing suite was a wrong-runner mistake I fixed.

The next round should thread `sessionStore` into `createMessageHandler`, wire it in `createServer`, and handle `list_sessions` in `messageHandler.ts`. After that come the spec updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions types and frame validation","tdd_next":"thread sessionStore into createMessageHandler and handle list_sessions (session_list, SERVER_ERROR), then specs"}}