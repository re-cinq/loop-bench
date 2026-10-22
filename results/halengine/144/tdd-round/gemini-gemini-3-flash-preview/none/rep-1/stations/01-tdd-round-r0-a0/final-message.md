I have completed the first TDD round for implementing conversation listing over WebSockets.

**Changes made:**
- **Types:** Added `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts` and updated the `IncomingMessage` and `OutgoingMessage` unions. These types were also re-exported from `src/index.ts`.
- **Validation:** Implemented validation for the `list_sessions` frame in `src/transport/ws/validation.ts`, supporting optional `limit` (non-negative integer) and `before` (cursor with `sessionId` and `updatedAt`).
- **Tests:** Added unit tests in `src/transport/ws/validation.test.ts` to verify the new validation logic, covering both successful and failed validation cases.
- **Documentation:** Updated `specs/hal-engine-websocket-protocol/spec.md` with the new `list_sessions` and `session_list` message definitions and added test citations.
- **Traceability:** Verified and updated spec links in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` to point to the correct lines in the test files.

**Verification:**
- Ran `npm test -- src/transport/ws/validation.test.ts` and all 5 tests passed.
- Formatting was applied to the changed files using the project's Prettier configuration.
- The changes have been committed and pushed to the repository.

**Next steps:**
The next round should focus on handling the `list_sessions` message in `createMessageHandler` and `messageHandler.ts`, wiring it to the `SessionStore.listFor` method.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts and validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Handle list_sessions in src/transport/ws/messageHandler.ts by calling sessionStore.listFor"}}