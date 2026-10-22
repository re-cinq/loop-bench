I have completed the red-green-refactor round for ticket #144.

### Work Completed

1.  **Resolved Lint Failures**: Fixed multiple `eslint` finding from the previous round across several files:
    *   **`src/transport/ws/validation.ts`**: Replaced a 3-way `switch` with a lookup table, renamed vague `data` variables, and flattened nested `if` statements.
    *   **`src/transport/ws/validation.test.ts`**: Split a test with multiple expectations into three distinct tests.
    *   **`src/transport/conversationList.acceptance.test.ts`**: Replaced complex nested `if` logic with a `switch` statement in `askAfterConnect`.
    *   **Code Duplication**: Consolidated shared test helpers (`eventually`, `delegatingTo`, `stopEngines`, and registration functions) into `src/transport/wsTestSupport.ts`. Updated `conversationList.acceptance.test.ts` and `sessionResume.test.ts` to use these shared helpers, eliminating a significant amount of duplicated code.

2.  **Implemented Next Facet**:
    *   **`src/transport/ws/messageHandler.ts`**: Threaded `sessionStore` into `createMessageHandler` as an optional parameter. Implemented `handleListSessions` to call `sessionStore.listFor`, serializing the resulting `Date` objects to ISO strings and handling potential store failures with proper logging and `SERVER_ERROR` frames.
    *   **`src/transport/createServer.ts`**: Wired the `sessionStore` from server options into the message handler factory.

3.  **Verification**:
    *   Added new unit tests to `src/transport/ws/messageHandler.test.ts` covering successful `list_sessions` dispatch, empty lists for missing store implementations, and error handling for store rejections.
    *   Verified that all 3 acceptance tests in `src/transport/conversationList.acceptance.test.ts` now pass.

4.  **Documentation & Traceability**:
    *   Updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` with new test citations for the implemented behavior.
    *   Ran `scripts/repoint-spec-anchors.mjs`, which successfully updated 73 shifted anchors in unaffected specs. Manually corrected anchors in the modified specs that the script skipped due to anchor-set changes.

### Final Status
All core implementation facets for delivering conversation lists over WebSocket are complete and verified. The remaining work involves final documentation checks and any project-specific polishing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in src/transport/ws/messageHandler.ts","tdd_next":"acceptance green"}}