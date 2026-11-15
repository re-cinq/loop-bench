The branch `loop-bench/144` already contains commit `8a915be` (`test(ws): add acceptance tests for conversation list (#144)`), pushed to `origin/loop-bench/144` and up to date with `origin/main`, with `.lore/dod.md`, `specs/hal-engine-websocket-protocol/spec.md`, and `src/wsConversationList.acceptance.test.ts` passing Prettier (`npx prettier --check src/wsConversationList.acceptance.test.ts`) and spec checks (`check-spec-links.mjs`, `check-spec-status.mjs`, `check-spec-anchor-names.mjs`, `repoint-spec-anchors.mjs --check origin/main`).

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/wsConversationList.acceptance.test.ts` fails all 5 acceptance tests because `list_conversations` and `transport.history` are not implemented yet:

```text
FAIL src/wsConversationList.acceptance.test.ts
  ● WebSocket conversation list › refuses list_conversations with UNSUPPORTED when history is off, when the store omits listFor, or when the store throws StoreCannotList
    - Expected "UNSUPPORTED" / + Received "INVALID_MESSAGE" (for off, bareStore, cannotList)

  ● WebSocket conversation list › answers list_conversations with the authenticated user summaries newest first as ISO strings, ignores frame userId, pages with cursor, and lets a listed id resume
    - Expected frameType: "conversation_list" / + Received frameType: "error"

  ● WebSocket conversation list › validates list_conversations limit and before cursor and rejects invalid shapes naming the field
    - Expected valid: true / + Received valid: false, error: "Unknown message type: list_conversations"

  ● WebSocket conversation list › answers list_conversations while a user_message turn is streaming on the same session before stream_end
    - Expected hasList: true, beforeEnd: true / + Received hasList: false, beforeEnd: false

  ● WebSocket conversation list › answers a rejecting listFor with SERVER_ERROR hiding store details, keeps the socket open, and logs sessionId without user content
    - Expected errorCode: "SERVER_ERROR", loggedSessionId: true / + Received errorCode: "INVALID_MESSAGE", loggedSessionId: false

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}