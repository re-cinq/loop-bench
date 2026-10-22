I have completed the round by addressing all CI failures from the previous push and finishing the final facet of the ticket.

### Summary of Changes

1.  **Fixed Type and ESLint Errors:**
    *   Resolved `Awaitable` type issues in `src/transport/ws/messageHandler.ts` by using `Promise.resolve()` and added explicit types to satisfy `noImplicitAny`.
    *   Imported missing `SessionStore` and `SessionSummary` types in `src/transport/ws/messageHandler.test.ts`.
    *   Fixed declaration order and removed incorrect `as any` casts in tests.
2.  **Documentation & Spec Links:**
    *   Added Section 4.3 (`list_sessions`) and Section 5.9 (`session_list`) to `specs/hal-engine-websocket-protocol/spec.md`.
    *   Updated `specs/hal-engine-websocket-protocol/spec.md` status to **Shipped**.
    *   Fixed dozens of "rotten" spec links across multiple spec files (`websocket-protocol`, `abandon-on-close`, `conversation-list`, `tool-executor-throw`) caused by file shifts.
    *   Removed incorrectly placed spec citations from test titles in the source code, ensuring `npm run spec:names` passes (verified 810 citations).
3.  **Acceptance Tests & DOD:**
    *   Enabled the `history` feature in `src/transport/conversationList.acceptance.test.ts` to allow the acceptance tests to pass (they were previously failing with `UNSUPPORTED`).
    *   Verified that all 3 acceptance tests and all 57 unit tests in `messageHandler.test.ts` pass locally.
    *   Ticked all remaining boxes in `.lore/dod.md`.

### Verification Results

*   **Unit Tests:** `src/transport/ws/messageHandler.test.ts` passed (57 tests).
*   **Acceptance Tests:** `src/transport/conversationList.acceptance.test.ts` passed (3 tests).
*   **Spec Names:** `npm run spec:names` verified 810 citations.
*   **Formatting:** All changed files were formatted with Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md","tdd_next":"acceptance green"}}