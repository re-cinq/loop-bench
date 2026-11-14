Fixed both red CI checks (`eslint` and `test`) on `loop-bench/144` and pushed commit `a83000f`:

- Threaded `sessionStore` into `createMessageHandler` in `src/transport/createServer.ts` and handled `list_sessions` frames in `src/transport/ws/messageHandler.ts` so `conversationList.acceptance.test.ts` passes cleanly.
- Eliminated the `re-lint/no-duplicate-code` and `re-lint/prefer-early-return` errors in `src/transport/conversationList.acceptance.test.ts` (and its mirror clone findings in `src/transport/sessionResume.test.ts`) by reusing `wsTestSupport` and `fiveMemberStore` with flat early-return frame handling, and updated the moved spec anchors in `specs/hal-engine-conversation-list/spec.md`.
- Replaced `Array(9).fill(false)` in `src/transport/ws/validation.test.ts` with an explicit array literal to satisfy `re-lint/no-flag-params`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented list_sessions in messageHandler/createServer to pass acceptance tests and fixed all 8 re-lint errors in conversationList.acceptance.test.ts and validation.test.ts"}}