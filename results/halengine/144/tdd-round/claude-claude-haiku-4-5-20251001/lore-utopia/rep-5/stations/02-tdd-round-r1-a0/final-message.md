Perfect! I've completed one TDD red-green-refactor round for implementing WebSocket list_sessions handling.

## Summary

**RED**: Wrote a failing test for the messageHandler to expect list_sessions frame handling with proper session_list response

**GREEN**: Implemented the handler:
- Updated `createMessageHandler` to accept optional `sessionStore` parameter
- Added `handleListSessions` function that calls `sessionStore.listFor()` and returns serialized summaries
- Added `sendSessionList` helper to sender.ts
- Properly typed all parameters using `ListSessionsMessage` type

**REFACTOR**: 
- Extracted shared test utilities to reduce duplication
- Fixed spec link line numbers in conversation-list spec
- Fixed typecheck error in validation.ts

**Tests**: All 55 messageHandler tests pass ✓

**Facets completed**:
- [x] Threading sessionStore into createMessageHandler  
- [x] Handling list_sessions in messageHandler

**Facets remaining**:
- [ ] Document list_sessions/session_list in specs
- [ ] Wire sessionStore through createServer.ts

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in messageHandler","tdd_next":"Wire sessionStore through createServer to messageHandler"}}