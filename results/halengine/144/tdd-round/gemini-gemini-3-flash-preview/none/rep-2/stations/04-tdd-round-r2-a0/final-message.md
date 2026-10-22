Fixed all CI failures reported in the previous round, including missing spec links, duplicated test code, and `any` type usage. Moved shared test helpers `eventually` and `delegatingTo` to `src/transport/wsTestSupport.ts` to resolve lint errors and improve maintainability.

Completed the red-green-refactor round for the `list_sessions` facet:
1.  **Red**: Added a new unit test to `src/transport/ws/messageHandler.test.ts` that verifies `list_sessions` calls `sessionStore.listFor` with the correct `userId` and parameters, and returns a formatted `session_list` with ISO-8601 dates.
2.  **Green**: Implemented `handleListSessions` in `src/transport/ws/messageHandler.ts` and added the `sendSessionList` helper to `src/transport/ws/sender.ts`. The implementation correctly checks for the `transport.history.enabled` opt-in and handles the authenticated user's session list request.
3.  **Refactor**: Verified and updated spec traceability links in `specs/hal-engine-conversation-list/spec.md` and the test files to ensure accurate line numbers and coverage.

One red test (the new one) was made green; no regressions were observed in the 57 passing unit tests for the message handler.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in src/transport/ws/messageHandler.ts","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}