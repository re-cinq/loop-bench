Fixed the `test` and `eslint` failures on `loop-bench/144` (`bd3ee46`):

- Added `sendSessionList` in `src/transport/ws/sender.ts`, threaded optional `sessionStore` from `src/transport/createServer.ts` into `createMessageHandler`, and implemented `handleListSessions` in `src/transport/ws/messageHandler.ts`.
- Removed duplicate teardown/store helpers in `src/transport/conversationList.acceptance.test.ts` (reusing `src/transport/wsTestSupport.ts` with socket draining in `stopEngines`), fixed `prefer-early-return`, and replaced `.fill(false)` in `src/transport/ws/validation.test.ts`.
- Documented `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md`, repointed anchors in `specs/hal-engine-conversation-list/spec.md`, and verified all 8 transport test suites (103 tests) plus spec/doc/changelog/prettier checks pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Wired list_sessions handling in messageHandler/createServer and resolved duplicate-code, early-return, and flag-param lint errors"}}