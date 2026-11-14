Fixed all CI failures on `loop-bench/144` and pushed `3edaea5` to `origin`:

- Wired `sessionStore` into `createMessageHandler` and handled `list_sessions` frames in `src/transport/ws/messageHandler.ts` and `src/transport/ws/sender.ts` (making `src/transport/conversationList.acceptance.test.ts` pass).
- Resolved all 8 ESLint errors (`re-lint/no-duplicate-code`, `re-lint/prefer-early-return`, and `re-lint/no-flag-params`), repointed spec anchors in `specs/hal-engine-conversation-list/spec.md`, formatted changed files with Prettier, and verified targeted Jest suites pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"missing list_sessions handler dispatch in messageHandler.ts and 8 re-lint errors in conversationList.acceptance.test.ts and validation.test.ts"}}