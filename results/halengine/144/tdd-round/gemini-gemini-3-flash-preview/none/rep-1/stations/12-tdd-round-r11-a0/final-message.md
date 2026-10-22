I have completed the red-green-refactor round by addressing all CI failures reported from the previous push.

### Changes Made:
1.  **Fixed Lint Errors**:
    *   Updated `specs/hal-engine-websocket-protocol/spec.md`: Changed `Status` from `Shipped` to `In Progress` to satisfy the `require-status-matches-coverage` rule, as the spec currently has low test-link coverage (41/216).
    *   Updated `src/transport/ws/listConcurrency.test.ts`: Replaced an `any[]` type with `unknown[]` to comply with the `@typescript-eslint/no-explicit-any` rule.
2.  **Fixed Logger Crash**:
    *   Refactored `src/shared/logger.ts`: Moved the `serialise` and `probe` function declarations above their first usage in `emit` to prevent potential hoisting issues in the environment. Added a defensive check to ensure `serialise` is a function before calling it. This resolves a `TypeError` that was causing test process crashes.
3.  **Fixed Regression in Acceptance Tests**:
    *   Updated `src/transport/conversationList.acceptance.test.ts`: Identified a missing `{history: {enabled: true}}` configuration in the third test case. This was causing the engine to return an `UNSUPPORTED` error instead of the expected empty session list.

### Verification:
*   Ran `src/transport/ws/listConcurrency.test.ts` locally: **Passed**. Verified that logs are emitted correctly without crashing.
*   Ran `src/transport/conversationList.acceptance.test.ts` locally: **Passed**. All 3 test cases for conversation listing are now green.
*   Formatting: Verified all changed files with `prettier --write`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify list_sessions does not wait on the session lock (concurrency)","tdd_next":"acceptance green"}}