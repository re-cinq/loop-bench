I have completed the work to fix the red build for ticket #144.

Key changes:
1.  **Refactored Test Helpers:** Moved `eventually`, `connectAndSettle`, and other shared connection logic into `src/transport/wsTestSupport.ts`. This resolved multiple `re-lint/no-duplicate-code` ESLint errors across `conversationList.acceptance.test.ts` and `sessionResume.test.ts`.
2.  **Fixed ESLint Errors:** Corrected `re-lint/prefer-early-return` violations in the acceptance tests and `re-lint/no-flag-params` (boolean literal argument in `.fill(false)`) in the validation tests.
3.  **Aligned Types & Protocol Names:** Renamed `list_sessions` to `list_conversations` and `session_list` to `conversation_list` (along with their corresponding message types) to strictly follow the ticket requirements. Added the `UNSUPPORTED` error code to `ErrorCodes` and exported the `StoreCannotList` error class.
4.  **Implemented Feature Logic:** Updated `createMessageHandler` in `src/transport/ws/messageHandler.ts` to handle `list_conversations`. The feature is now opt-in via `transport.history.enabled`. The handler correctly calls `store.listFor` with the authenticated `userId`, handles `StoreCannotList` and missing `listFor` by returning `UNSUPPORTED`, and ensures all timestamps in the response are ISO strings.
5.  **Updated Validation:** Fixed `isValidOptionalLimit` to enforce the requested 1–200 range and updated validation error messages.
6.  **Documentation & Examples:** Updated `CHANGELOG.md`, `specs/hal-engine-websocket-protocol/spec.md`, and `specs/hal-engine-conversation-list/spec.md`. Added the `history` option to `example/full-config.ts` and regenerated the documentation using `npm run docs:fix`.

All relevant tests (`conversationList.acceptance.test.ts`, `validation.test.ts`, and `sessionResume.test.ts`) pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed ESLint errors, renamed protocol frames to match ticket, and implemented opt-in list_conversations handling."}}