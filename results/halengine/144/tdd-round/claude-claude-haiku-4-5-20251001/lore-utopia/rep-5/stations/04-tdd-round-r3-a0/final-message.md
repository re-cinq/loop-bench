Perfect! I have successfully completed this round's facet. Here's what was accomplished:

## Summary of This Round

**Facet Closed:** Document `list_sessions` and `session_list` in specs

### What Was Done

1. **Added `list_sessions` message documentation** to `specs/hal-engine-websocket-protocol/spec.md` (Section 4.3):
   - Documented client-to-server frame structure with optional `limit` and `before` cursor parameters
   - Added validation semantics: limit must be 1-200, before must have valid `updatedAt` and 1-128 char `sessionId`
   - Specified that user ID always comes from connection authentication, ignoring any client-supplied `userId`
   - Added citations to acceptance tests validating this behavior

2. **Added `session_list` message documentation** to `specs/hal-engine-websocket-protocol/spec.md` (Section 5.9):
   - Documented server-to-client response frame with `sessions` array
   - Defined `SessionSummary` object structure: `sessionId`, `createdAt`, `updatedAt`, `entryCount`
   - Specified ordering (newest activity first, ties broken by session ID descending)
   - Documented behavior when store lacks `listFor` (empty array) or when it throws (error frame)
   - Added ISO 8601 serialization requirement for date fields
   - Added citations to acceptance tests for all three scenarios

3. **Added proper test citations** linking spec statements to acceptance tests in `src/transport/conversationList.acceptance.test.ts`:
   - Line 77: answers list_sessions for authenticated user with ISO dates
   - Line 118: empty session_list when no listFor, SERVER_ERROR when throws
   - Line 147: accepts bare list_sessions, rejects malformed with INVALID_MESSAGE

### All Facets Complete
All facets in the dod.md are now checked off:
- ✅ Message types added to src/types/messages.ts
- ✅ Validation in src/transport/ws/validation.ts
- ✅ SessionStore threaded through createMessageHandler
- ✅ Handler logic in messageHandler.ts and sender.ts
- ✅ Spec documentation complete
- ✅ SessionStore wiring through createServer

The acceptance tests defined in the dod.md should now pass, pending CI verification.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs","tdd_next":"acceptance green"}}