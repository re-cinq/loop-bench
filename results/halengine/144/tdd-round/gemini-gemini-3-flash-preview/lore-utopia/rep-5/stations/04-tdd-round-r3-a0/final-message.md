I have completed the TDD round for ticket #144.

**Round Summary:**
1.  **Fixed 7 CI-reported lint failures:**
    *   `example/full-config.ts`: Moved long comments above the lines to satisfy `max-comment-lines`.
    *   `src/transport/conversationList.acceptance.test.ts`: Removed unused `eventually` import.
    *   `src/transport/sessionResume.test.ts`: Removed unused `HAL_WS_SUBPROTOCOL` import.
    *   `src/transport/ws/validation.ts`: Quoted object keys (`'user_message'`, `'list_sessions'`) to satisfy `camelcase` and flattened a nested `if` in `validateListSessionsMessage`.
    *   `src/transport/wsTestSupport.ts`: Flattened the member chain `hal.wss.clients.size` to satisfy `max-member-chain`.
2.  **Enforced `limit` range (1–200):** Added a check in `src/transport/ws/validation.ts` that the `list_sessions` limit is an integer between 1 and 200, as specified in the ticket.
3.  **Added and verified tests:** Added 3 new test cases to `src/transport/ws/validation.test.ts` for `limit: 0`, `limit: 201`, and `limit: -1`. Verified that they failed with the correct error message and passed after the implementation fix.
4.  **Updated Traceability:** 
    *   Updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` with the new constraints and citations.
    *   Fixed 3 "rotten" links in `websocket-protocol/spec.md` pointing to `sessionResume.test.ts` that were shifted by my lint fix.
    *   Updated `websocket-protocol/spec.md` status to `Implemented`.
5.  **Synchronized Documentation:** Fixed pre-existing formatting issues in `docs/getting-started.md` (empty lines between markers and code fences) and ran `npm run docs:fix` to ensure the example configuration in the documentation matches the updated code.

**Unrelated Smells:**
*   The `history` opt-in configuration (`transport.history.enabled`) described in `ticket.md` is not yet implemented in `createServer.ts` or `createMessageHandler.ts`.
*   The `UNSUPPORTED` error code and `StoreCannotList` error handling mentioned in the ticket amendments are missing; the current implementation returns `SERVER_ERROR` or an empty list.
*   There are many pre-existing "rotten" links in `specs/hal-engine-session-resume/spec.md` that I did not fix as they were outside the scope of my changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enforce limit range (1-200) for list_sessions","tdd_next":"implement transport.history opt-in and UNSUPPORTED error"}}