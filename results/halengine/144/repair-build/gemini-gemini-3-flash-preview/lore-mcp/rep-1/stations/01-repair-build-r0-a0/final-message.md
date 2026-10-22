I have completed the task of fixing the red build for ticket #144.

### Summary of Changes

1.  **Deduplicated and Improved Test Infrastructure**:
    *   Moved shared test helpers `eventually`, `delegatingTo`, and a robust `stopEngines` teardown logic to `src/transport/wsTestSupport.ts`. This resolved multiple `re-lint/no-duplicate-code` errors.
    *   Improved `stopEngines` to wait for WebSocket clients to fully disconnect before stopping the server, ensuring cleaner test teardown.

2.  **Resolved Linting Issues**:
    *   **Early Return**: Refactored the message handling loop in `askAfterConnect` within `conversationList.acceptance.test.ts` to use an `if...else if` structure, satisfying the `re-lint/prefer-early-return` rule.
    *   **Flag Parameters**: Replaced `Array.fill(false)` with `Array.from` in `validation.test.ts` to avoid passing a boolean literal to a function, satisfying `re-lint/no-flag-params`.

3.  **Implemented Conversation List Protocol**:
    *   **Naming Alignment**: Renamed `list_sessions` to `list_conversations` and `session_list` to `conversation_list` across types, validation, and tests to strictly adhere to the ticket's specification.
    *   **Error Handling**: Added the `UNSUPPORTED` error code to `ErrorCodes`. The handler now correctly returns this code when the feature is disabled or the underlying store does not support listing.
    *   **Handler Logic**: Updated `createMessageHandler` to accept `sessionStore` and `history` configuration. Implemented `handleListConversations` to fetch summaries via `sessionStore.listFor`, converting `Date` objects to ISO strings for the wire.
    *   **Security**: Ensured the user ID is always derived from the authenticated connection (`ws.userId`) and never from the incoming frame.

4.  **Verification**:
    *   Fixed missing imports and reference errors in `sessionResume.test.ts` caused by the refactoring.
    *   Updated all acceptance and validation tests to use the correct frame names and expect the new error behaviors.
    *   Verified that all 32 tests in `conversationList.acceptance.test.ts`, `sessionResume.test.ts`, and `validation.test.ts` pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Deduplicated test helpers, fixed lint errors, and implemented the list_conversations WebSocket handler with appropriate authorization and error signaling."}}