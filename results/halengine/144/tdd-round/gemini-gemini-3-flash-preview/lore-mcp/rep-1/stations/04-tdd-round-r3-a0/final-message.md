I have completed the round, focusing on fixing the CI failures reported in the `round-brief.md` and ensuring that the acceptance tests are green.

### Summary of Changes

#### 1. Fixed Lint and Traceability in `src/transport/ws/listSessions.test.ts`
- **Removed Unused Import:** Removed the unused `log` import.
- **Fixed Type Safety:** Replaced the `any` cast in `setLogger` with `unknown as Logger`.
- **Consolidated Tests:** Merged two duplicated test cases into one: "answers SERVER_ERROR and logs when listFor fails".
- **Followed Naming Conventions:** Removed inline `([validated by](...))` links from test descriptions to follow the repository's convention.

#### 2. Fixed Duplication in Acceptance Tests
- **Refactored `wsTestSupport.ts`:** Moved the shared `delegatingTo` helper and `eventually` utility to `wsTestSupport.ts`. Enhanced `stopEngines` to include a wait for all clients to terminate, ensuring cleaner teardowns.
- **Cleaned up `conversationList.acceptance.test.ts` and `sessionResume.test.ts`:** Removed local duplicated copies of `delegatingTo`, `eventually`, and `afterEach` by utilizing the new helpers in `wsTestSupport.ts`.

#### 3. Resolved Failing Acceptance Tests
- **Enabled History Feature:** Identified that the acceptance tests in `src/transport/conversationList.acceptance.test.ts` were failing with `UNSUPPORTED` because the `history` feature was not enabled in the test server. Updated `startEngine` to default to `history: {enabled: true}`.
- **Verified Success:** Locally ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts` and confirmed all 3 tests passed.

#### 4. Updated Spec Traceability
- **Standardized Links:** Updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` to use the standard `([validated by: Description](Path#Lnn))` format for all links to `listSessions.test.ts`.
- **Added Missing Links:** Added traceability links for the pagination and error logging tests in `listSessions.test.ts`.
- **Ran Anchor Fix:** Executed `npm run spec:names:fix` to ensure all anchors are correctly aligned with the test descriptions.

I have verified the fixes by running both the unit and acceptance tests locally, and I have formatted the code with Prettier before committing and pushing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}