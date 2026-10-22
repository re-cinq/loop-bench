I have completed a round of fixes to address the CI failures reported in the previous push, ensuring the ticket's progress is unblocked and the implementation is correctly verified.

### Changes Summary
- **Type Safety**: Updated `src/transport/historyOptIn.test.ts` to include the `wss` property in the `servers` array, satisfying the requirements of the `cleanup` function.
- **ESLint Compliance**:
  - Shortened an over-length comment in `example/full-config.ts`.
  - Quoted the `user_message` and `list_sessions` keys in `src/transport/ws/validation.ts` to satisfy camelCase rules.
  - Moved the `isInvalidSessionId` helper below its caller and extracted `isInvalidLimit` to reduce boolean operator complexity in `validation.ts`.
- **Test Integrity**:
  - Fixed `src/transport/ws/messageHandler.test.ts` by updating the test harness to correctly propagate the `history` configuration, which was causing tests to return `UNSUPPORTED` incorrectly.
  - Removed redundant spec citations from `it()` blocks in `historyOptIn.test.ts` that were causing the `spec:names` check to fail.
- **Traceability & Documentation**:
  - Synchronized spec anchors using `npm run spec:names --fix`.
  - Fixed a global documentation issue where blank lines between doc-block markers and code fences prevented `npm run docs:fix` from working; after removing these across 11 files, I successfully regenerated `docs/getting-started.md` to include the new `history` configuration.
  - Updated the WebSocket Protocol specification status to `Shipped`.
- **Validation**: Verified the fixes by running `historyOptIn.test.ts`, `messageHandler.test.ts`, and `conversationList.acceptance.test.ts` locally; all passed.

All facets in `.lore/dod.md` are now verified and marked as complete. CI will judge the push to determine if the acceptance tests are now green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures and verified all facets","tdd_next":"acceptance green"}}