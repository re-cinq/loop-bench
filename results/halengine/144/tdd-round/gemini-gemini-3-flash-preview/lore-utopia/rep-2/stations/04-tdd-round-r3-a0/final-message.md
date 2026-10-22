I have completed the requested round of development for ticket #144.

### Work Completed
- **Addressed CI Failures**: Fixed the `eslint` errors reported in the previous build:
    - Added missing spec links for `list_sessions` validation and response in `specs/hal-engine-websocket-protocol/spec.md`.
    - Resolved `max-expects` violation in `src/transport/ws/messageHandler.test.ts` by consolidating assertions.
    - Eliminated code duplication in `src/transport/ws/messageHandler.test.ts` by refactoring the `UNSUPPORTED` test cases.
- **Updated Specifications**: 
    - Added trailing parenthetical citations `([validated by: ...](...#Lnn))` to the WebSocket protocol specification.
    - Ensured that `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md` correctly reflect the test coverage.
    - Ran `npm run spec:names:fix` to repoint anchors after the edits.
- **Documentation & Opt-in**: Verified that `HalEngineConfig.transport.history` opt-in behavior and `StoreCannotList` error handling are correctly implemented and documented.
- **Definition of Done**: Updated `.lore/dod.md`, ticking off the remaining facets for documentation, opt-in configuration, and `StoreCannotList` usage.

### Verification Results
- Ran `src/transport/ws/messageHandler.test.ts` and `src/transport/ws/listSessionsValidation.test.ts` locally; all 60 tests passed.
- Formatted changed files with Prettier.
- The build is now ready for CI to verify the acceptance tests and the new spec links.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list, Opt-in configuration, StoreCannotList usage","tdd_next":"acceptance green"}}