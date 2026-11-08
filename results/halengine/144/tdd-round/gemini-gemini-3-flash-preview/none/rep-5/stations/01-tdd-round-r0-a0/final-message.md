I have completed one red-green-refactor round for ticket #144.

### Research and Strategy
I began by reviewing the ticket requirements and the Definition of Done. The goal is to deliver a user's conversation list over WebSocket. I identified the first testable facet as adding the new protocol message types and implementing their validation.

### Implementation
1.  **Message Types**: I added `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts` and updated the `IncomingMessage` and `OutgoingMessage` unions. I also re-exported these types from `src/index.ts`.
2.  **Validation**: I implemented `validateListSessionsMessage` in `src/transport/ws/validation.ts` to handle the new `list_sessions` frame, including validation for optional `limit` (non-negative integer) and `before` cursor (string/number `updatedAt` and 1-128 char `sessionId`).
3.  **Documentation**: I updated `specs/hal-engine-websocket-protocol/spec.md` to include definitions for the `list_sessions` and `session_list` frames, with inline citations pointing to the new validation tests.

### Verification
I added unit tests to `src/transport/ws/validation.test.ts` to verify the new validation logic. The tests initially failed (RED) and passed (GREEN) after the implementation. All 5 tests in that suite are currently passing.

### Traceability
The new tests are linked in `specs/hal-engine-websocket-protocol/spec.md` using the `#Lnn` format.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"message types and validation","tdd_next":"thread sessionStore into createMessageHandler"}}