I have completed one red-green-refactor round, focusing on fixing the CI failures and implementing the correct error handling for `list_sessions`.

### Changes Made:
- **CI Fixes (ESLint):**
  - Flipped the `if` statement in `src/transport/ws/messageHandler.ts` to satisfy `re-lint/prefer-early-return`.
  - Refactored `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts` to use a shared `stopEngines` helper in `src/transport/wsTestSupport.ts`, eliminating code duplication reported by `re-lint/no-duplicate-code`.
  - Used `it.each` in `src/transport/ws/validation.test.ts` to satisfy `re-lint/max-expects`.
  - Replaced a type assertion with `Reflect.get` in `src/transport/ws/validation.ts` to fix a potential lint error and improve type safety.
- **Feature Implementation:**
  - Added `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
  - Added the `StoreCannotList` error class to `src/types/sessionStore.ts`.
  - Threaded `sessionStore` through `createMessageHandler` and its internal handlers (`answerInTurn`, `answerUserMessage`) to `answerFrame`.
  - Updated `handleListSessions` to return `UNSUPPORTED` when `listFor` is missing or when the store throws `StoreCannotList`, as per the ticket amendment.
- **Traceability & Documentation:**
  - Updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` to reflect the new `UNSUPPORTED` behavior.
  - Ran `node scripts/repoint-spec-anchors.mjs` to update all shifted line number citations in the spec files.
  - Updated `CHANGELOG.md` to match the implemented behavior.
  - Updated and ticked all facets in `.lore/dod.md`.

### Verification:
- Ran `src/transport/ws/validation.test.ts` (8/8 passed).
- Ran `src/transport/ws/messageHandler.test.ts` (59/59 passed, including 3 updated/added cases for `UNSUPPORTED` and `StoreCannotList`).
- Ran `src/transport/conversationList.acceptance.test.ts` (3/3 passed, including the updated `UNSUPPORTED` check).
- Verified `node scripts/check-spec-anchor-names.mjs` reports 0 findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"return UNSUPPORTED when listFor is missing or throws StoreCannotList","tdd_next":"acceptance green"}}