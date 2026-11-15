Updated `src/conversationList.acceptance.test.ts` (eliminating a replay-frame race in `openAndGreet` and `continuePagingAndResume`) and `.lore/dod.md` (adding the GDPR metadata-only / retention-note facet), formatted both with Prettier, verified all `#Lnn` anchors in `specs/hal-engine-websocket-protocol/spec.md` still match lines `L51`, `L91`, `L127`, `L180`, and `L211`, committed (`1de3686`), verified `origin/main` is up to date, and pushed to `origin/loop-bench/144`.

Running `npm test src/conversationList.acceptance.test.ts` produces 5 failures because `list_conversations` is not yet recognized or handled (`Unknown message type: list_conversations`):

```text
FAIL src/conversationList.acceptance.test.ts
  ● delivering a user conversation list over WebSocket › returns the authenticated user's conversations newest first as ISO summaries without stream_end, ignoring any userId on the frame
      "ids": [], "isoValid": false, "recordedCall": undefined, "shapes": [], "streamEnded": false, "types": ["error", "pong"]
      at Object.<anonymous> (src/conversationList.acceptance.test.ts:77:8)

  ● delivering a user conversation list over WebSocket › pages with limit and a composite before cursor, and lets a client resume any listed sessionId
      "page1Ids": undefined, "page1Type": "error", "page2Ids": undefined, "recordedOptions": [], "replayedContent": undefined, "resumedConnected": undefined
      at Object.<anonymous> (src/conversationList.acceptance.test.ts:114:8)

  ● delivering a user conversation list over WebSocket › answers list_conversations without waiting on a streaming turn, and rejects malformed limit or before with INVALID_MESSAGE
      "beforeMessagesMentionField": false, "limitMessagesMentionField": false, "midStreamType": "error"
      at Object.<anonymous> (src/conversationList.acceptance.test.ts:163:8)

  ● delivering a user conversation list over WebSocket › refuses list_conversations with UNSUPPORTED when history is off, listFor is absent, or the store cannot list
      Received "code": "INVALID_MESSAGE" instead of "UNSUPPORTED" across collectionWithoutFind, historyAbsent, methodAbsent
      at Object.<anonymous> (src/conversationList.acceptance.test.ts:195:66)

  ● delivering a user conversation list over WebSocket › answers a rejecting listFor with SERVER_ERROR hiding store details, keeps the socket open, and logs the sessionId
      "errorCode": "INVALID_MESSAGE" (expected "SERVER_ERROR"), "loggedWithSessionId": false (expected true)
      at Object.<anonymous> (src/conversationList.acceptance.test.ts:242:8)

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}