I have completed one TDD round for ticket #144.

**Summary of work:**
1.  **Research:** Identified the first two facets of the Definition of Done: adding new message types to `src/types/messages.ts` and implementing validation for the `list_sessions` frame in `src/transport/ws/validation.ts`.
2.  **Red:** Added a failing unit test in `src/transport/ws/validation.test.ts` that expected `list_sessions` to be a valid message type and correctly validated its optional `limit` and `before` fields.
3.  **Green:**
    *   Defined `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` in `src/types/messages.ts`.
    *   Updated `IncomingMessage` and `OutgoingMessage` unions to include the new frames.
    *   Re-exported the new types from `src/index.ts`.
    *   Implemented the `validateListSessionsMessage` function and added it to the `validateMessage` switch in `src/transport/ws/validation.ts`.
4.  **Refactor & Traceability:**
    *   Verified the unit tests pass using the project's Jest runner.
    *   Added documentation for `list_sessions` and `session_list` to `specs/hal-engine-websocket-protocol/spec.md`.
    *   Added traceability citations for the new unit tests in both `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
    *   Updated the spec anchors to ensure all line-number citations are accurate.
    *   Formatted all modified files with Prettier.
    *   Updated `.lore/dod.md` to reflect the completed facets.

The changes have been committed and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions validation","tdd_next":"Thread sessionStore into createMessageHandler"}}