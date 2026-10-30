Added, committed, and pushed five direct acceptance tests defining the WebSocket conversation-list contract.

Test command:

`npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

Actual red-bar output:

```text
FAIL src/transport/conversationList.acceptance.test.ts
Tests:       5 failed, 5 total

Expected: "conversation_list"
Received: "error"

Expected code: "UNSUPPORTED" / "SERVER_ERROR"
Received code: "INVALID_MESSAGE"

error: "Unknown message type: list_conversations"
```

Commit: `7237745 test(transport): define websocket conversation list acceptance`

The branch is merged with `origin/main`, pushed, clean, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}