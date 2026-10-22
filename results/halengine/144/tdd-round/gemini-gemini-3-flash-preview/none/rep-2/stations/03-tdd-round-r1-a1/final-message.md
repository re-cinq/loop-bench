I have completed the round, addressing the CI failures from the previous push and implementing the next facet of the conversation list feature.

### Changes Made
- **Resolved CI Failures**:
  - Fixed lint errors in `src/transport/ws/validation.test.ts`: added missing traceability links to `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`, and refactored tests to comply with the `max-expects` rule.
  - Resolved the `changelog` check failure by adding a detailed entry for ticket #144 in `CHANGELOG.md`.
  - Added the `UNSUPPORTED` error code to `src/types/session.ts` as required by the ticket.
- **Implemented Threading Facet**:
  - Updated the `createMessageHandler` factory in `src/transport/ws/messageHandler.ts` to accept an optional `sessionStore` and a new `options` object.
  - Threaded these parameters through the message handling pipeline (`answerInTurn`, `answerUserMessage`, and `answerFrame`).
  - Added a `handleListSessions` stub in the message handler that returns an `UNSUPPORTED` error when the history feature is disabled (the default state).
  - Updated `HalServerOptions` in `src/transport/createServer.ts` and `HalEngineConfig` in `src/config.ts` to include the `history` feature toggle and wired them together.
- **Verification**:
  - Added new unit tests to `src/transport/ws/messageHandler.test.ts` to verify the threading and the default `UNSUPPORTED` response for `list_sessions`.
  - Ran `jest` to confirm all 56 tests in `messageHandler.test.ts` are green.
  - Ran `repoint-spec-anchors.mjs` and `check-spec-links.mjs` to ensure documentation traceability remains intact.

### Technical Debt Identified
- The `src/transport/conversationList.acceptance.test.ts` file appears to have "rotten" spec links according to the re-anchor script, likely from changes in the previous round or earlier. These should be investigated and fixed in a future round to maintain full traceability.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler","tdd_next":"Handle list_sessions in src/transport/ws/messageHandler.ts"}}