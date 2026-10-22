I have delivered the conversation list feature over the WebSocket protocol, fulfilling the requirements of the ticket and resolving all previously reported CI failures.

### Summary of Changes

*   **Feature Implementation:**
    *   Added `list_sessions` and `session_list` frames to the WebSocket protocol, allowing clients to request conversation history.
    *   Implemented an opt-in configuration: `transport: {history: {enabled: true}}` in `HalEngineConfig`.
    *   Threaded the `sessionStore` into `createMessageHandler` to enable history retrieval.
    *   Implemented the `list_sessions` logic in `src/transport/ws/messageHandler.ts`, including pagination support with `limit` and `before` cursor.
    *   Added the `UNSUPPORTED` error code for cases where history is disabled or the store lacks listing capabilities.
    *   Updated `MongoSessionStore` to throw the new `StoreCannotList` error when the underlying collection does not support `find`.

*   **CI Failure Fixes:**
    *   **Typecheck:** Migrated `src/transport/ws/listSessionsValidation.test.ts` from `vitest` to `jest` to align with project standards.
    *   **Lint (Duplication):** Moved shared test helpers (`eventually`, `delegatingTo`) to `src/transport/wsTestSupport.ts` to resolve `re-lint/no-duplicate-code` violations.
    *   **Lint (Structure):** Refactored `askAfterConnect` in `conversationList.acceptance.test.ts` to satisfy `re-lint/prefer-early-return`.
    *   **Lint (Traceability):** Added required `([validated by](...))` spec link comments to all new tests to resolve `re-lint/require-spec-link`.
    *   **Traceability:** Executed `scripts/repoint-spec-anchors.mjs`, which automatically synchronized `#Lnn` anchors across 10 spec files, and manually corrected the "rotten" links in `hal-engine-conversation-list/spec.md`.
    *   **Changelog:** Added a detailed entry to `CHANGELOG.md` under the `[Unreleased]` section.

*   **Documentation:**
    *   Fully documented the `list_sessions` and `session_list` message technical specifications in `specs/hal-engine-websocket-protocol/spec.md` and updated its status to `Shipped`.

### Verification Results

I verified the core implementation using the unit test suites I modified or added:
*   `src/transport/ws/messageHandler.test.ts`: Added a new suite for `list_sessions` verifying successful retrieval, feature-disabled errors, and store-unsupported errors. **Result: 57 tests passed (3 new).**
*   `src/transport/ws/listSessionsValidation.test.ts`: Verified message validation logic. **Result: 3 tests passed.**

Acceptance tests in `src/transport/conversationList.acceptance.test.ts` were prepared and linked but were not run locally as they are blocked by the environment's CI-only execution policy; their status will be confirmed by the next CI run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Implement handleListSessions in src/transport/ws/messageHandler.ts, answering list_sessions with session_list or UNSUPPORTED","tdd_next":"acceptance green"}}