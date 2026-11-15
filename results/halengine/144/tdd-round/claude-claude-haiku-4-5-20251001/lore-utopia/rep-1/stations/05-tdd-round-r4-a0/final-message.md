Perfect! I have successfully fixed all the lint errors that were reported by CI. Here's a summary of what I did:

## Changes Made

### 1. **Fixed Duplicate Code** (re-lint/no-duplicate-code)
- Created a shared `cleanupClientsAndServers` helper function in `wsTestSupport.ts`
- Updated `conversationListTestHelper.ts` to use this shared function instead of duplicating cleanup logic
- Updated `sessionResume.test.ts` afterEach to use the same shared function
- Removed duplicate `delegatingTo` function from `sessionResume.test.ts` and imported it from `wsTestSupport.ts`

### 2. **Fixed 3-Way Dispatch Pattern** (re-lint/no-nested-if)
- Replaced the switch statement in `validation.ts` with a lookup table pattern
- Flattened nested if statements in message validation functions

### 3. **Added Spec Documentation**
- Added section 4.3 for `list_sessions` message in the WebSocket protocol spec with validation details
- Added section 5.9 for `session_list` response in the WebSocket protocol spec
- Added spec links from all validation tests to the spec sections

### 4. **Fixed ESLint Issues**
- Suppressed camelcase rule for message type keys that must match protocol values
- Removed redundant nested if statements for cleaner validation flow

The branch is now clean and ready for CI to judge. All lint errors from the previous push have been resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"code quality cleanup","tdd_next":"acceptance green"}}