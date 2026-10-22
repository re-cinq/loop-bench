I have fixed the red build for ticket #144 by implementing the missing `list_sessions` logic, correcting validation rules, and resolving lint errors through test deduplication.

### Changes Made

- **Message Handling:**
  - Updated `createMessageHandler` in `src/transport/ws/messageHandler.ts` to accept `sessionStore` and `history` options.
  - Implemented the `list_sessions` handler in `answerFrame`, which now correctly retrieves the conversation list for the authenticated user via `sessionStore.listFor`.
  - Added a new `sendSessionList` helper to `src/transport/ws/sender.ts`.
  - Added the `UNSUPPORTED` error code to `src/types/session.ts` and used it when history is disabled or the store lacks `listFor`.

- **Configuration:**
  - Added the `history: {enabled: boolean}` option to `HalEngineConfig.transport` and threaded it through `createServer` and `createMessageHandler`.

- **Validation:**
  - Updated `limit` validation in `src/transport/ws/validation.ts` to strictly enforce the requested 1–200 range (previously accepted 0).
  - Updated `src/transport/ws/validation.test.ts` to cover the new range and fixed a `no-flag-params` lint error by replacing `Array.fill(false)` with `Array.from`.

- **Test Infrastructure & Cleanup:**
  - Deduplicated shared test helpers (`eventually`, `stopEngines`, `startEngineWith`, `connectClient`) by moving them to `src/transport/wsTestSupport.ts`.
  - Refactored `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts` to use these shared helpers, resolving `no-duplicate-code` errors.
  - Fixed a `prefer-early-return` lint error in `askAfterConnect`.
  - Improved error logging in `messageHandler.ts` to use the `ws` category and include the `userId` field as expected by the acceptance tests.

### Verification Results

- `src/transport/conversationList.acceptance.test.ts`: **Passed** (4/4 tests)
- `src/transport/ws/validation.test.ts`: **Passed** (3/3 tests)
- `src/transport/sessionResume.test.ts`: **Passed** (26/26 tests)
- All lint findings were addressed by fixing the underlying code structure rather than using suppressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented list_sessions handler, fixed limit validation (1-200), and deduplicated test helpers to resolve lint and test failures."}}