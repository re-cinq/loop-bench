## Summary

I completed one full TDD round on this ticket, addressing two main areas:

**Phase 1 - Fixed CI Failures (from previous round):**
- Converted Jest imports in `websocketCleanup.test.ts` (was using Vitest)
- Added spec citation to the cleanup test
- Fixed async cleanup timing to prevent "Cannot log after tests are done" error
- Committed and pushed CI fixes

**Phase 2 - Implemented New Facet: StoreCannotList Exception**
- **RED**: Wrote failing unit test for when `listFor` throws `StoreCannotList`
- **GREEN**: Implemented minimal code to make test pass:
  - Created `StoreCannotList` exception class in `src/types/sessionStore.ts`
  - Added `UNSUPPORTED` error code to `ErrorCodes`
  - Modified `handleListSessions` to catch and handle `StoreCannotList` specially
  - Exported new exception from public API
  - Exported `handleListSessions` for unit testing
- **REFACTOR**: Verified no duplication, all existing tests still pass
- Ran formatter, committed, and pushed

**Test Results:**
- ✅ New unit test passes
- ✅ Existing validation tests pass  
- ✅ Websocket cleanup test passes
- All code formatted correctly

The implementation now properly distinguishes between a store that doesn't support listing (configuration error) vs. one that failed to list (transient error), allowing clients to surface meaningful errors.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"StoreCannotList exception handling","tdd_next":"acceptance green"}}