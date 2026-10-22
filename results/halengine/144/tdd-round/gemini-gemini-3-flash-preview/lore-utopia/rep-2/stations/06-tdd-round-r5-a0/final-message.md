In this round, I resolved the ESLint errors blocking the CI and implemented a missing validation constraint for the `list_sessions` message.

### Research and Strategy
- I identified the ESLint failures in `src/transport/conversationList.acceptance.test.ts` (unused import and `prefer-early-return` violation) and `src/transport/ws/validation.ts` (`prefer-polymorphism` and `no-nested-if` violations).
- I noted that the `limit` field in the `list_sessions` message was not being validated against the required 1–200 range specified in the ticket and documentation.
- I planned a TDD round to enforce this limit constraint while refactoring the validation logic to satisfy the linter.

### Execution
- **Red:** Added a new test suite in `src/transport/ws/listSessionsValidation.test.ts` with cases for `limit: 0` and `limit: 201`, which correctly failed against the existing validator.
- **Green:**
    - Refactored `src/transport/ws/validation.ts` to use a lookup table for message type dispatch, resolving the `prefer-polymorphism` error.
    - Extracted `limit` and `before` validation into helper functions, flattening the logic and resolving the `no-nested-if` errors.
    - Implemented the `1–200` integer constraint for the `limit` field.
    - Fixed the acceptance test by removing the unused `eventually` import and flattening the listener logic to satisfy `prefer-early-return`.
- **Refactor:** Re-aligned all spec anchors in the affected files to match new line numbers and updated the status of `specs/hal-engine-websocket-protocol/spec.md` to `Implemented`.

### Finalization
- All changed files were formatted with Prettier.
- The branch was merged with `origin/main` (already up to date) and pushed.
- Verified that the new validation tests pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"limit validation and lint repair","tdd_next":"acceptance green"}}