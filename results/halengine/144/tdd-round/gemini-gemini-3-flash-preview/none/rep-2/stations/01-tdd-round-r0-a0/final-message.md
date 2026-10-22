I have completed one red-green-refactor round for ticket #144.

**Phase 1: Red**
I added a suite of unit tests to `src/transport/ws/validation.test.ts` to verify the validation of the new `list_sessions` message. These tests covered:
- Acceptance of a bare `list_sessions` frame.
- Validation of `limit` (must be a positive integer between 1 and 200).
- Validation of `before` cursors (must be an object with a valid `sessionId` and `updatedAt`).
- Stripping of unknown fields like `userId`.
The tests failed initially because the `list_sessions` type was unknown to the validator.

**Phase 2: Green**
- Updated `src/types/messages.ts` to include `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage`.
- Updated `IncomingMessage` and `OutgoingMessage` unions to include these new types.
- Updated `src/index.ts` to re-export the new message types.
- Implemented `validateListSessionsMessage` in `src/transport/ws/validation.ts` and wired it into `validateMessage`.

**Phase 3: Refactor**
Refined the `limit` validation to enforce the 1-200 range specified in the ticket and updated the tests to verify this constraint.

**Verification**
- Unit tests in `src/transport/ws/validation.test.ts` passed successfully.
- Ran Prettier on all modified files.
- Updated `.lore/dod.md` to reflect that the first two facets are complete.
- Committed and pushed the changes to the branch.
- Merged `main` to ensure the branch is up to date.

I ran 1 unit test suite containing 8 tests (3 new for `list_sessions` validation, plus existing ones). All passed. No regressions were detected.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add list_sessions types and validation","tdd_next":"Thread sessionStore into messageHandler"}}