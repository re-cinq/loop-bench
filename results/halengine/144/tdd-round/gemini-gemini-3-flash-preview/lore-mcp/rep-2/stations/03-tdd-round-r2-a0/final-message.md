I have resolved all CI failures reported in the previous round, ensuring the build is green and the ticket moves toward completion.

### Summary of Changes

#### 1. Fixed Typecheck Errors
- Resolved a `TS2739` error in `src/transport/ws/messageHandler.test.ts` where a mocked `SessionStore` was missing required properties. I utilized the `delegatingTo` helper from `wsTestSupport.ts` to correctly wrap the `InMemorySessionStore`, ensuring full interface compatibility.

#### 2. Resolved ESLint Violations
- **Polymorphism**: In `src/transport/ws/validation.ts`, I replaced the `switch` statement in `validateMessage` with a polymorphic lookup table to satisfy the `re-lint/prefer-polymorphism` rule.
- **Nested Ifs**: Refactored `validateListSessionsMessage` to eliminate nested `if` statements by using guard clauses, adhering to the `re-lint/no-nested-if` rule.
- **Code Duplication**: Extracted the duplicated `eventually` helper and `afterEach` cleanup logic from `conversationList.acceptance.test.ts` and `sessionResume.test.ts` into a shared `cleanup` utility in `src/transport/wsTestSupport.ts`.
- **Early Return**: Refactored the `askAfterConnect` helper in `conversationList.acceptance.test.ts` to use early-return patterns, satisfying `re-lint/prefer-early-return`.

#### 3. Restored Spec Traceability
- Updated 36 traceability links across `specs/hal-engine-conversation-list/spec.md`, `specs/hal-engine-session-resume/spec.md`, and `specs/hal-engine-websocket-protocol/spec.md`. These links had become "rotten" due to line shifts caused by refactoring and formatting. I verified the final anchors using the `repoint-spec-anchors.mjs --check` script.

#### 4. Formatting and Verification
- Ran `prettier` on all modified files to ensure consistent styling.
- Verified all changes by running the affected test suites (`messageHandler.test.ts`, `conversationList.acceptance.test.ts`, and `sessionResume.test.ts`), all of which passed successfully.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI green","tdd_next":"acceptance green"}}