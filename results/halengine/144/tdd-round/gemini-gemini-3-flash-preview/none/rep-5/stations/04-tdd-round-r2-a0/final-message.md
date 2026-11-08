I have addressed all CI failures reported in the previous round brief, ensuring the implementation of the conversation list over WebSocket is fully compliant with the project's engineering standards.

### Changes Made:
- **Fixed Typecheck Failures:** Added the missing `eventually` import in `src/transport/sessionResume.test.ts`, resolving the `TS2304` errors that were also causing `ts-jest` to fail the test suite.
- **Resolved ESLint Violations:**
    - In `src/transport/ws/messageHandler.test.ts`, removed unused type imports (`SessionCursor`, `SessionListOptions`), flattened a deep member chain in the `wire` helper, and introduced a `mockStore` factory to eliminate several duplicated blocks of mock `SessionStore` definitions.
    - In `src/transport/ws/validation.ts`, renamed the vague `data` variable to `validated` and refactored `validateListSessionsMessage` to flatten nested `if` statements using guard clauses.
- **Fixed Traceability & Spec Links:** Updated `specs/hal-engine-websocket-protocol/spec.md` to point the spec link for malformed frames to the correct line in `src/transport/ws/validation.test.ts` and matched the parameterized test name (`rejects malformed $field`), satisfying the `re-lint/require-spec-link` rule.
- **Updated Spec Status:** Promoted the status of `specs/hal-engine-websocket-protocol/spec.md` from `In Progress` to `Implemented`.

### Verification:
I verified the fixes by running the affected test suites locally using the project's Jest configuration:
- `src/transport/sessionResume.test.ts`
- `src/transport/ws/messageHandler.test.ts`
- `src/transport/ws/validation.test.ts`
- `src/transport/conversationList.acceptance.test.ts`
All 95 tests in these suites passed. Prettier was also run over the modified files.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI regressions (typecheck, eslint, tests)","tdd_next":"acceptance green"}}