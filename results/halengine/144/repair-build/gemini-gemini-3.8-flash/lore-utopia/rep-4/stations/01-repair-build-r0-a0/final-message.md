Fixed all CI findings reported on 5cd4e67:
- Handled `list_sessions` frames in `src/transport/ws/messageHandler.ts` by threading `sessionStore` from `createServer.ts`, converting summary dates to ISO strings, sending `session_list`, logging failures under category `'ws'`, and sending `SERVER_ERROR`.
- Resolved ESLint violations in `src/transport/conversationList.acceptance.test.ts` (removed duplication with `sessionResume.test.ts` and refactored message listener for `prefer-early-return`) and in `src/transport/ws/validation.test.ts` (removed boolean flag param).
- Formatted changed files with prettier, verified test suites pass, merged latest `origin/main`, and pushed HEAD to origin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"unhandled list_sessions frames in messageHandler and re-lint violations in acceptance/validation tests"}}