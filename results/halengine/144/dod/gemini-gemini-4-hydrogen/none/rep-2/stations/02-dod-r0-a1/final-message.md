Defined the Definition of Done for `#144` in `.lore/dod.md` (`Strategy: direct`), tightened `src/conversationList.acceptance.test.ts`, wired the protocol statements and trailing `([validated by: ...](../../src/conversationList.acceptance.test.ts#Lnn))` citations into `specs/hal-engine-websocket-protocol/spec.md`, formatted with Prettier, verified spec/doc link checks (`check-spec-links.mjs`, `check-spec-status.mjs`, `check-spec-anchor-names.mjs`, `repoint-spec-anchors.mjs --check origin/main`, `check-doc-paths.mjs specs/hal-engine-websocket-protocol/spec.md`, `check-doc-regions.mjs`), and pushed commit `e8bacbe` to `origin/loop-bench/144` (up to date with `origin/main`).

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › validates list_conversations frames, cursor shapes, and rejects invalid fields naming the field
    "error": "Unknown message type: list_conversations", "valid": false
  ● delivering a user conversation list over WebSocket › delivers conversation_list for the authenticated user, forwards paging options, and resumes a listed id
    "calls": Array [], "firstTypes": Array ["error", "pong"], "listedIds": Array [], "resumedConnected": Object {"resumed": false, ...}
  ● delivering a user conversation list over WebSocket › answers UNSUPPORTED when history is off, the store lacks listFor, or Mongo has no find, and warns without resume
    "historyOff": Object {"code": "INVALID_MESSAGE", ...}, "warnedWithoutResume": false, "withoutFind": Object {"code": "INVALID_MESSAGE", ...}, "withoutListFor": Object {"code": "INVALID_MESSAGE", ...}
  ● delivering a user conversation list over WebSocket › answers SERVER_ERROR without leaking store details when listFor rejects, keeps the socket open, and logs the sessionId without user content
    "code": "INVALID_MESSAGE", "loggedWithSessionId": false
  ● delivering a user conversation list over WebSocket › answers list_conversations before stream_end while a user_message is streaming on the same session
    "answeredBeforeRelease": false, "orderedBeforeStreamEnd": false

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}