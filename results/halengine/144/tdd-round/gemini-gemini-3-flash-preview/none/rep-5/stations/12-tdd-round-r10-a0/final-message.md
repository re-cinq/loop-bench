I have completed a red-green-refactor round for ticket #144.

**Summary of changes:**
1.  **Fixed Lint Errors:**
    *   Refactored `src/transport/ws/validation.ts` to resolve the `re-lint/max-boolean-operators` error by extracting the `limit` validation into a named predicate `isValidLimit`.
    *   Updated `specs/hal-engine-websocket-protocol/spec.md` by changing its status from `Shipped` to `In Progress`. This satisfies the `re-lint/require-status-matches-coverage` rule, as the current test-link coverage (38/217) is below the 100% threshold required for the `Shipped` status.
2.  **Added Test Coverage:**
    *   Identified that the "lock bypass" facet (handling `list_sessions` without waiting for a streaming `user_message`) lacked explicit test coverage.
    *   Added a new test case to `src/transport/conversationList.acceptance.test.ts` using a slow orchestrator and a deferred promise to verify that `session_list` frames are indeed delivered while a stream is in progress.
3.  **Verification:**
    *   Verified all changes by running `src/transport/conversationList.acceptance.test.ts` and `src/transport/ws/validation.test.ts` using the project's `jest` runner. All tests passed.
    *   Ran the project's `prettier` formatter on modified files.
4.  **Documentation:**
    *   Added a new section "10.3 Parallel Requests" to `specs/hal-engine-websocket-protocol/spec.md` describing the concurrency behavior and linking it to the new test case.
    *   Updated `.lore/dod.md` to reflect the completed lint fixes and the addition of the lock bypass test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint errors and add lock bypass test coverage","tdd_next":"acceptance green"}}