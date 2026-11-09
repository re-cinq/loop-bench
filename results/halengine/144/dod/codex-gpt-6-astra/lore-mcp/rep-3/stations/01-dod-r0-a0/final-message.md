Committed and pushed `8d77c8b` using strategy `direct`: five acceptance tests, DoD, and spec traceability. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failure output:

```text
"error": "Unknown message type: list_conversations"
Tests:       5 failed, 5 total
```

All failures reflect the missing WebSocket behavior. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}