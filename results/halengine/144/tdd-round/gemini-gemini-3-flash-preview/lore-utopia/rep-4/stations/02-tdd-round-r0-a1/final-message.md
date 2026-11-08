I have completed the red-green-refactor round for ticket #144.

### Changes Made:
- **Threaded `sessionStore`**: Updated `createMessageHandler` in `src/transport/ws/messageHandler.ts` to accept an optional `sessionStore` and wired it in `src/transport/createServer.ts`.
- **Implemented `list_sessions` handling**: Added logic to `messageHandler.ts` to handle the `list_sessions` message, query the `sessionStore`, and respond with a `session_list` message.
- **Added `sendSessionList` helper**: Added a new helper function in `src/transport/ws/sender.ts` for sending session list messages.
- **Updated Specifications**: 
    - Documented `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md`.
    - Updated `specs/hal-engine-conversation-list/spec.md` with protocol-level details.
    - Updated traceability links in both specs to point to the new tests.
- **Verified with Tests**:
    - Added a new test suite for `list_sessions` within `src/transport/ws/messageHandler.test.ts`.
    - Verified that existing acceptance tests in `src/transport/conversationList.acceptance.test.ts` now pass.

All 58 tests in the relevant suites are passing, and the codebase follows the project's formatting standards.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md.","tdd_next":"acceptance green"}}