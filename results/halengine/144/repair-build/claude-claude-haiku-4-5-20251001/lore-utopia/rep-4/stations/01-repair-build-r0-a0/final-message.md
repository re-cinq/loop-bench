Perfect! I've successfully fixed all the CI failures. Here's what I did:

## Summary of Changes

### Main Implementation
1. **messageHandler.ts**: 
   - Modified `createMessageHandler` to accept `sessionStore` parameter
   - Made `answerFrame` async and added handling for `list_sessions` frames
   - Implemented `handleListSessions` to query the store and format response

2. **createServer.ts**: Updated to pass `sessionStore` to `createMessageHandler`

### Test Utilities Refactoring (Eliminated Code Duplication)
1. **wsTestSupport.ts**: Extracted common test helpers:
   - `eventually()` - polling utility with retries
   - `cleanupEngines()` - common test teardown
   - `delegatingTo()` - minimal store stub factory

2. **conversationList.acceptance.test.ts** & **sessionResume.test.ts**: Updated to import and use shared utilities, reducing duplicate code

### Style/Lint Fixes
1. **conversationList.acceptance.test.ts**: Fixed prefer-early-return by reordering if statements  
2. **validation.test.ts**: Fixed flag-params lint error by replacing `.fill(false)` with explicit array

### Verification
- All 3 acceptance tests passing
- All 4 validation tests passing  
- All 28 related test suite tests passing
- Branch is up-to-date with origin/main
- Formatted with prettier

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added list_sessions handler to deliver conversation list over WebSocket with proper error handling and Date-to-ISO-string conversion"}}