I have completed the TDD round for ticket #144. This round focused on resolving the CI lint failures from the previous round and implementing the core handling logic for the conversation list over WebSocket.

### Summary of Changes

1.  **Resolved CI Failures:**
    *   **Code Duplication:** Extracted shared test helpers (`eventually`, `stopEngines`, `delegatingTo`) into `src/transport/wsTestSupport.ts`. Refactored `conversationList.acceptance.test.ts` and `sessionResume.test.ts` to use these shared utilities, satisfying the `re-lint/no-duplicate-code` rule.
    *   **Architectural Smells:** Refactored `src/transport/ws/validation.ts` to replace a 3-way `switch` with a polymorphic lookup table and flattened nested `if` statements in `validateListSessionsMessage` using guard clauses.
    *   **Traceability:** Added the missing spec link in `src/transport/ws/validation.test.ts` and updated Section 4.3 of `specs/hal-engine-websocket-protocol/spec.md` with the corresponding citation.
2.  **Implemented Feature:**
    *   **Dependency Injection:** Threaded `sessionStore` through `createServer` and into `createMessageHandler`.
    *   **Message Handling:** Implemented `handleListSessions` in `src/transport/ws/messageHandler.ts` to retrieve the authenticated user's conversations, format them with ISO-8601 dates, and return them via a `session_list` frame.
    *   **Error Management:** Added robust error handling and logging (category `'ws'`) for store failures during listing.
3.  **Verification:**
    *   Verified all changes with Jest. Both the unit tests in `validation.test.ts` and the complex acceptance tests in `conversationList.acceptance.test.ts` are now **GREEN**.
    *   Confirmed no regressions in `sessionResume.test.ts` (all 25 tests passed).

The codebase is now in a clean, lint-free state with the primary functional requirements for conversation listing implemented and verified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler","tdd_next":"Document list_sessions and session_list"}}