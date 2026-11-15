Perfect! I've completed one full TDD round. Here's what I did:

**RED:** I wrote a unit test in `src/types/messages.unit.test.ts` that imports `ListSessionsMessage`, `SessionListMessage`, and `SessionSummaryFrame` types that didn't exist.

**GREEN:** I added these types to `src/types/messages.ts`:
- `SessionCursorFrame` - represents the `before` cursor with `updatedAt` (ISO string) and `sessionId`
- `ListSessionsMessage` - incoming message with type `'list_sessions'`, optional `limit` and `before`
- `SessionSummaryFrame` - represents a session summary with ISO-formatted date strings
- `SessionListMessage` - outgoing message with type `'session_list'` and `sessions` array

I updated both `IncomingMessage` and `OutgoingMessage` union types to include the new message types, and the test now passes.

**REFACTOR:** The code is clean and follows the existing patterns. Updated `.lore/dod.md` to mark the first facet complete.

**Committed and pushed:** `feat(types): add message types for list_sessions protocol`

The branch is up to date with main. The test file passes with 3 passing tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add message types to src/types/messages.ts","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}