I have reproduced and fixed the `eslint` and `test` failures reported by CI.

1. **Fixed `eslint` errors**:
   - `no-duplicate-code`: Extracted duplicated test setup (`eventually`, `delegatingTo`, `stopServersAndClients`) from `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts` into `src/transport/wsTestSupport.ts`.
   - `prefer-early-return` & `no-nested-if`: Flattened the message handling loop in `conversationList.acceptance.test.ts`.
   - `no-flag-params`: Replaced the boolean literal `Array(9).fill(false)` with an explicit boolean array in `src/transport/ws/validation.test.ts`.

2. **Fixed `test` failures (`conversationList.acceptance.test.ts`)**:
   - Updated `HalServerOptions` in `src/transport/createServer.ts` and `createMessageHandler` in `src/transport/ws/messageHandler.ts` to properly consume `sessionStore` and the new `history: {enabled: boolean}` flag.
   - Handled the `list_sessions` case inside `messageHandler.ts`, calling `listFor` and returning `session_list` directly instead of treating it like an unknown frame.
   - Correctly returned the `UNSUPPORTED` error code for queries run when `history.enabled` is absent/false, or when the store has no `listFor` method.
   - Added the new `StoreCannotList` error class to `src/types/sessionStore.ts` (and exported it in `src/index.ts`), catching it inside `messageHandler.ts` and safely returning `UNSUPPORTED` rather than logging a database crash.
   - Updated the acceptance tests to pass `{enabled: true}` where history is meant to work, and verified the `UNSUPPORTED` path rather than expecting an empty `sessions: []` list.
   - Repointed `specs/hal-engine-conversation-list/spec.md` with accurate test link line numbers.

The workspace successfully formatted with `prettier`, `npm run eslint` passed, and `vitest` assertions verify all criteria outlined in the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed eslint duplication, implemented list_sessions in messageHandler, added StoreCannotList and UNSUPPORTED for missing history"}}