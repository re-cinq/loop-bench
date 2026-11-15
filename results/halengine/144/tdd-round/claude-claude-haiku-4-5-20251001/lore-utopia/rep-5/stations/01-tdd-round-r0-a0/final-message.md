Perfect! I've completed one red-green-refactor round for ticket #144. Here's what I implemented:

**RED**: Wrote a failing unit test that validates a bare `list_sessions` frame
**GREEN**: Added the necessary types and validation logic to make the test pass
**REFACTOR**: Extracted `SessionSummaryFrame` as a separate type and re-exported all new types from index.ts

The changes include:
- `ListSessionsMessage` type for incoming client frames with optional `limit` (1-200) and `before` cursor
- `SessionSummaryFrame` type for individual session metadata on the wire
- `SessionListMessage` type for outgoing server responses
- Full validation in `validation.ts` that rejects malformed frames and strips unknown fields like `userId`
- Added tests to verify validation accepts bare `list_sessions` frames

All changes are additive to messages.ts (no existing code modified), all tests pass, and code is formatted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"types and validation for list_sessions","tdd_next":"thread sessionStore into createMessageHandler"}}