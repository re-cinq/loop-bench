I have completed the TDD round for implementing the `history.enabled` opt-in flag and resolving the CI regressions.

### Summary of Changes

1.  **Fixed CI Regressions:**
    *   Resolved multiple `eslint` and `spec-names` errors by running `npm run spec:names:fix`, which repointed 84 drifted spec anchors to their correct test declarations in `src/transport/ws/messageHandler.test.ts` and other files.
    *   Refactored a test in `src/transport/ws/validation.test.ts` from `it.each` to a regular `it` block to ensure compatibility with the spec-link traceability scripts.
2.  **Implemented History Opt-in:**
    *   Created `src/transport/ws/sessionHistory.ts` defining the `SessionHistoryOptions` interface with a GDPR-compliance warning.
    *   Updated `HalEngineConfig` and `HalServerOptions` to include the `history` opt-in flag (defaulting to off).
    *   Modified `createMessageHandler` and `handleListSessions` in `src/transport/ws/messageHandler.ts` to check the `history.enabled` flag. If disabled, `list_sessions` now returns an `UNSUPPORTED` error frame even if the store supports listing.
    *   Added a startup warning in `createHalEngine` (`src/config.ts`) if `history` is enabled but `resume` is not, as the conversation list would be non-functional without the ability to rejoin sessions.
3.  **Documentation & Traceability:**
    *   Updated `example/full-config.ts` with the new `history` option and refreshed documentation blocks in `docs/getting-started.md` using `npm run docs:fix`.
    *   Added a new unit test in `src/transport/ws/messageHandler.test.ts` verifying the opt-in behavior and linked it to the relevant specifications in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
    *   Ticked the completed facets in `.lore/dod.md`.

### Verification Results

*   **Unit Tests:** Ran `src/transport/ws/messageHandler.test.ts` using Jest. All 60 tests passed, including the new test for the history opt-in flag.
*   **Traceability:** `npm run spec:names` reports 803 correctly named citations across the repository.
*   **Formatting:** All modified files were formatted using Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add opt-in history: {enabled: boolean} and thread it through to createMessageHandler","tdd_next":"acceptance green"}}