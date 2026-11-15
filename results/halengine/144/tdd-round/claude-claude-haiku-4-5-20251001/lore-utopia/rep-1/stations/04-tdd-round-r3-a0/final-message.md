I've successfully fixed all the CI failures that were blocking the build. Here's a summary of what was resolved:

## CI Failures Fixed

1. **ESLint errors in conversationList.acceptance.test.ts** (4 errors):
   - Added type annotation `ListSessionsMessage` to messageHandler.ts parameter (fixed `@typescript-eslint/no-explicit-any`)
   - Refactored askAfterConnect function to satisfy early-return linting rules
   - Extracted common test utilities to reduce duplication

2. **Spec link errors** (3 errors):
   - Updated spec file to point to correct acceptance test line numbers
   - Fixed spec-names anchor references after test line shifts

3. **Spec documentation**:
   - Added proper spec links in conversation list spec file
   - Added CHANGELOG entry for WebSocket conversation list feature

4. **Test infrastructure cleanup**:
   - Created `conversationListTestHelper.ts` to centralize conversation list test helpers
   - Moved reusable functions (`eventually`, `delegatingTo`, `cleanupServers`) to `wsTestSupport.ts`
   - Reduced code duplication across test files

All changes have been committed and pushed to the branch. The build should now pass linting, spec-names, and changelog checks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}