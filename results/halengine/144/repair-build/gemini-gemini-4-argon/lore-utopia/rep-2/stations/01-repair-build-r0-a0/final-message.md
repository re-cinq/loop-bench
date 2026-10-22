Fixed all ESLint and Jest failures reported by CI:
- Refactored `src/transport/conversationList.acceptance.test.ts` to use shared helpers from `wsTestSupport.ts`, `sessionStoreTestSupport.ts`, and `logCaptureTestSupport.ts` (resolving `re-lint/no-duplicate-code` with `src/transport/sessionResume.test.ts` and `re-lint/prefer-early-return`).
- Replaced `Array(9).fill(false)` in `src/transport/ws/validation.test.ts` to satisfy `re-lint/no-flag-params`.
- Threaded `sessionStore` into `createMessageHandler` in `src/transport/ws/messageHandler.ts` and `src/transport/createServer.ts` to handle `list_sessions` frames and return `session_list` or `SERVER_ERROR` on store failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed re-lint findings in conversationList.acceptance.test.ts and validation.test.ts and wired list_sessions handling in messageHandler.ts and createServer.ts"}}