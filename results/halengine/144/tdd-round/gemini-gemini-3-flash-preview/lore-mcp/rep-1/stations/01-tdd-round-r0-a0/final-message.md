I have completed one red-green-refactor round for ticket #144.

**Summary of changes:**
1.  **Added message types**: Defined `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` in `src/types/messages.ts`.
2.  **Updated message unions**: Included `ListSessionsMessage` in `IncomingMessage` and `SessionListMessage` in `OutgoingMessage`.
3.  **Implemented validation**: Added `validateListSessionsMessage` to `src/transport/ws/validation.ts` with checks for `limit` (non-negative integer) and `before` (object with `sessionId` and `updatedAt`).
4.  **Public API**: Re-exported the new message types from `src/index.ts`.
5.  **Verified with tests**: Created `src/transport/ws/conversationList.test.ts` which provides exhaustive unit testing for the new validation logic, including edge cases for malformed inputs and ensuring unknown fields like `userId` are stripped.
6.  **Updated DoD**: Ticked off the first two facets in `.lore/dod.md`.

All tests in `src/transport/ws/conversationList.test.ts` passed. No regressions were observed in the touched files' existing behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Message types and validation for list_sessions","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}