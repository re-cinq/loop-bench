Excellent! I've completed the TDD round for adding error handling to `handleListSessions`. Here's what was accomplished:

## Changes Made:

**1. Red Phase:** Wrote a failing unit test that verifies error handling when `listFor` rejects.

**2. Green Phase:** Implemented error handling in `handleListSessions` that:
   - Wraps the `listFor` call in a try-catch block
   - Logs errors with category 'ws', userId, and error message
   - Sends a `SERVER_ERROR` response to the client

**3. Refactor Phase:** 
   - Extracted common test setup into a helper function
   - Combined assertions to satisfy linting rules
   - Fixed the test mock to use `delegatingTo` for proper SessionStore typing
   - Added spec link validation for the new tests
   - All 56 messageHandler tests pass green

## Facet Completed:
- ✅ Add error handling to `handleListSessions`: on listFor rejection, log error with userId and message, send `SERVER_ERROR` frame

## Commits:
1. `fcbc388` - transport(ws): add error handling to handleListSessions on listFor rejection
2. `1f14573` - refactor(transport): reduce duplication in list_sessions test and add spec links

The implementation satisfies the acceptance test requirement "answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws".

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add error handling to handleListSessions","tdd_next":"Document list_sessions and session_list in specs"}}