### Round Summary

1. **Red Phase**: Added unit test coverage to `src/transport/ws/validation.test.ts` for validating `list_sessions` payloads, asserting that valid `limit` and `before` cursors are accepted, unknown fields like `userId` are stripped, and malformed frames (non-integer/negative limit, non-object before, invalid `sessionId` length, non-date `updatedAt`) are rejected. Verified the tests failed with `Unknown message type: list_sessions`.
2. **Green Phase**:
   - Defined `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` in `src/types/messages.ts`, extending `IncomingMessage` and `OutgoingMessage`.
   - Re-exported the new types from `src/index.ts` and `src/types/index.ts`.
   - Implemented `validateListSessionsMessage` in `src/transport/ws/validation.ts`.
   - Re-ran `src/transport/ws/validation.test.ts` and verified all tests passed.
3. **Refactor & Delivery**:
   - Formatted all touched files with Prettier.
   - Synchronized line anchors in `specs/hal-engine-conversation-list/spec.md` with `conversationList.acceptance.test.ts` declarations and verified with `check-spec-anchor-names.mjs` and `check-spec-links.mjs`.
   - Updated `.lore/dod.md` to tick off the completed message types and validation facets.
   - Committed changes and pushed to `origin HEAD`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts and validate list_sessions in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts"}}