I have completed the task to deliver the user's conversation list over the WebSocket protocol and fixed the associated build failures.

### Key Changes:
- **Protocol Renaming**: Systematic rename of all `list_sessions` and `session_list` related symbols, interfaces, and literals to `list_conversations` and `conversation_list` to align with the ticket requirements.
- **Message Handling**: Implemented the missing logic in `src/transport/ws/messageHandler.ts` to handle `list_conversations` frames. The handler now correctly fetches conversation summaries from the store for the authenticated user and returns them via a `conversation_list` frame.
- **Opt-in Configuration**: Added `transport.history.enabled` to `HalEngineConfig`. The feature is disabled by default, and attempts to use it when disabled result in an `UNSUPPORTED` error code.
- **Error Handling**: Added the `UNSUPPORTED` error code and the `StoreCannotList` exported error class. Stores can throw `StoreCannotList` to report permanent misconfigurations, which are surfaced as `UNSUPPORTED` on the wire.
- **Test Refactoring**: 
    - Fixed `re-lint/no-duplicate-code` errors by moving shared test logic (like `delegatingTo`, `eventually`, and `askAfterConnect`) to `src/transport/wsTestSupport.ts`.
    - Fixed `re-lint/prefer-early-return` in `wsTestSupport.ts` by using a `switch` statement.
    - Fixed `re-lint/no-flag-params` in `validation.test.ts` by avoiding boolean literals in `fill()`.
    - Corrected test expectations in `conversationList.acceptance.test.ts` to match the ticket's requirement that an unimplemented store returns `UNSUPPORTED` rather than an empty list.
- **Documentation**: Updated `specs/hal-engine-websocket-protocol/spec.md`, `docs/getting-started.md`, and `CHANGELOG.md` to reflect the new protocol messages and configuration options.
- **Validation**: Verified that all relevant test suites (`conversationList.acceptance.test.ts`, `ws/validation.test.ts`, `sessionResume.test.ts`, and `config.test.ts`) pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Renamed session list frames to conversation list, implemented missing handler, and fixed lint/test failures."}}