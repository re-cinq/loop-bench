I have fixed the red build for ticket #144 by implementing the missing conversation list logic and resolving the lint and test failures reported by CI.

### Summary of Changes

1.  **Deduplicated Test Code:** Moved common test helpers (`eventually`, `delegatingTo`) and unified server teardown logic into `src/transport/wsTestSupport.ts`. Refactored `conversationList.acceptance.test.ts` and `sessionResume.test.ts` to use these shared helpers, resolving the duplicated code lint errors.
2.  **Fixed Lint Errors:** 
    *   Resolved the `re-lint/prefer-early-return` error in `conversationList.acceptance.test.ts` by flattening the connection handling logic.
    *   Fixed the `re-lint/no-flag-params` error in `validation.test.ts` by replacing a boolean literal argument in `Array.fill` with `Array.from`.
3.  **Implemented History Listing:**
    *   Added `history` opt-in configuration to `HalEngineConfig` and `HalServerOptions`.
    *   Updated `createMessageHandler` to accept `sessionStore` and `history` options.
    *   Implemented `handleListSessions` in `messageHandler.ts` to retrieve and send conversation summaries over WebSocket.
    *   Added `UNSUPPORTED` error code and `StoreCannotList` error class.
    *   Ensured `list_sessions` requests are answered immediately without waiting for the session lock, as required by the ticket.
4.  **Updated Tests and Documentation:**
    *   Updated `conversationList.acceptance.test.ts` to enable history and match the ticket's requirement that a missing `listFor` results in an `UNSUPPORTED` error.
    *   Added a test case to verify that `list_sessions` does not wait on the session lock during streaming.
    *   Extended `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` with the new protocol details and updated citations.
    *   Updated `example/full-config.ts` and `docs/getting-started.md` to document the new feature.
5.  **Validation:** Verified that all 5 tests in `conversationList.acceptance.test.ts`, all 25 tests in `sessionResume.test.ts`, and all 4 tests in `validation.test.ts` pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented list_sessions logic, fixed lint errors, and updated tests to match ticket requirements."}}