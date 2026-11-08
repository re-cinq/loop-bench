I have completed the round by resolving the CI failures identified in the previous push. My changes addressed type errors, linting violations, and the failing acceptance tests.

### Summary of Changes

1.  **Resolved Type Errors**: Added the missing `log` import in `src/config.ts`.
2.  **Fixed Linting Violations**:
    *   **Member Chain Depth**: Refactored `config.transport?.history?.enabled` in `src/config.ts` and `hal.wss.clients.size` in `src/transport/wsTestSupport.ts` to satisfy the `max-member-chain` rule.
    *   **Comment Length**: Shortened multi-line comments in `example/full-config.ts`.
    *   **Spec Status**: Updated the status of `specs/hal-engine-websocket-protocol/spec.md` to "In Progress" to correctly reflect its test-citation coverage.
    *   **Code Duplication**: Reformatted tests in `src/transport/ws/messageHandler.test.ts` to eliminate structural duplication flagged by the linter.
    *   **Nested Logic**: Flattened a nested `if` statement in `src/transport/ws/validation.ts` using a guard clause.
3.  **Fixed Acceptance Tests**: The `src/transport/conversationList.acceptance.test.ts` was failing because the `startEngine` helper did not enable the `history` feature. I updated the helper to opt-in to history, which allowed the tests to receive the expected `session_list` frames rather than `UNSUPPORTED` errors.

### Verification Results

*   **Acceptance Tests**: `src/transport/conversationList.acceptance.test.ts` passed (3/3).
*   **Unit Tests**: `src/transport/ws/messageHandler.test.ts` passed (60/60).
*   **Formatting**: All modified files were processed with Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}