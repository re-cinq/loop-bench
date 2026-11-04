Perfect! I've completed this round of the TDD loop. Here's what was accomplished:

## Round Summary

### Fixed CI Failures
1. **Added spec documentation** for `list_sessions` (section 4.3) and `session_list` (section 5.9) in the WebSocket protocol spec with proper validation constraints
2. **Fixed eslint issues**:
   - Fixed prefer-early-return pattern in `conversationList.acceptance.test.ts`
   - Fixed multiple expect calls in `validation.test.ts` (combined into single assertion)
   - Extracted `delegatingStore` helper to `wsTestSupport.ts` to eliminate code duplication between test files
3. **Added spec validation links** to statements in specs, ensuring traceability

### Implemented List Sessions Handler
1. **Threaded sessionStore** into `createMessageHandler` as an optional parameter (maintains backward compatibility with existing 1-arg callers)
2. **Implemented `handleListSessions`** in `messageHandler.ts`:
   - Reads `session.userId` from connection (authenticated user)
   - Ignores any `userId` field from the frame
   - Calls `sessionStore.listFor()` with `{limit, before}`
   - Returns empty array when store has no `listFor` method
   - Logs errors with userId when `listFor` throws
3. **Added `sendSessionList`** helper in `sender.ts`
4. **Date serialization**: Converts Date objects to ISO-8601 strings for wire protocol
5. **Wired sessionStore** in `createServer.ts` to pass through to message handler
6. **Added unit test** for `sendSessionList` function

### All Facets Complete
✅ Message types defined (ListSessionsMessage, SessionCursorFrame, SessionListMessage, SessionSummaryFrame)  
✅ Validation implemented for list_sessions frames  
✅ SessionStore threaded into handler  
✅ Handler implemented with error handling  
✅ Documentation complete with spec links  

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in messageHandler and wire sessionStore","tdd_next":"acceptance green"}}