I have completed the first facet of ticket #144 by adding the necessary message types for conversation (session) listing to the WebSocket protocol.

### Changes:
- **`src/types/messages.ts`**:
    - Added `ListSessionsMessage` for incoming list requests.
    - Added `SessionSummaryFrame` to represent a conversation summary on the wire (with ISO strings for dates).
    - Added `SessionListMessage` for outgoing conversation lists.
    - Updated `IncomingMessage` and `OutgoingMessage` unions to include these new message types.
- **`src/index.ts`**:
    - Re-exported `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage`.
- **`src/types/messages.test.ts`**:
    - Created a new unit test to verify the structure and inclusion of the new message types.
- **`.lore/dod.md`**:
    - Ticked the first facet: "Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`..."

I followed the "Session" naming convention established in `src/types/sessionStore.ts` and used in the existing acceptance test `src/transport/conversationList.acceptance.test.ts` to ensure consistency and avoid breaking the existing "RED" state of the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add message types to src/types/messages.ts and export from src/index.ts","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}