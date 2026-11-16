Defined the Definition of Done for `#144` using strategy `direct`, committed and pushed on `loop-bench/144` (`b37a27d`):

- `src/conversationList.acceptance.test.ts` — 4 acceptance tests exercising `validateMessage`, `createHalEngine`, `InMemorySessionStore`, and `MongoSessionStore` over real WebSockets.
- `specs/hal-engine-websocket-protocol/spec.md` — protocol sections `4.3 list_conversations`, `5.6 error` (`UNSUPPORTED`), and `5.9 conversation_list` linked to the 4 acceptance tests.
- `.lore/dod.md` — strategy, acceptance criteria, implementation facets, and out-of-scope boundaries.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a conversation list over WebSocket › validates list_conversations with optional limit and cursor before, and rejects malformed bounds or half cursors
    - Expected: empty { valid: true, data: { type: "list_conversations" } }, malformedLimits/malformedCursors matching /limit/i and /before/i
    + Received: { error: "Unknown message type: list_conversations", valid: false }

  ● delivering a conversation list over WebSocket › lists only the authenticated user conversations newest first with ISO stamps, pages by cursor, never pushes unsolicited, and resumes a listed id
    - Expected: fullIds [currentId, "c3", "c2", "c1"], freshEntryCount: 0, pageOneIds [currentId, "c3"], pageTwoIds ["c2", "c1"], recordedCalls (3 calls with userId "u1"), resumed: true, replayedContent: "remembered from c2"
    + Received: fullIds: [], freshEntryCount: undefined, pageOneIds: [], pageTwoIds: [], recordedCalls: [], resumed: false, replayedContent: undefined

  ● delivering a conversation list over WebSocket › answers list_conversations while a user_message turn is streaming on the same session without waiting for stream_end
    - Expected: { answeredWhileStreaming: true, streamEndedEarly: false, lastFrame: "stream_end" }
    + Received: { answeredWhileStreaming: false, streamEndedEarly: false, lastFrame: "stream_end" }

  ● delivering a conversation list over WebSocket › answers UNSUPPORTED when history is off, listFor is absent, or a Mongo collection lacks find, and SERVER_ERROR without leaking details when listFor rejects
    - Expected: historyOff/storeLackingListFor/collectionLackingFind code: "UNSUPPORTED", rejectionCode: "SERVER_ERROR", loggedWithSessionId: true
    + Received: historyOff/storeLackingListFor/collectionLackingFind code: "INVALID_MESSAGE", rejectionCode: "INVALID_MESSAGE", loggedWithSessionId: false

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}