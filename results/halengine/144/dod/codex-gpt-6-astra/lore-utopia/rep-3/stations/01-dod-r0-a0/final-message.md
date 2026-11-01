Committed and pushed `7a408c3` using `direct`: three acceptance tests, DoD, and spec citations. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED"
+ "code": "INVALID_MESSAGE"
- "code": "SERVER_ERROR"
+ "code": "INVALID_MESSAGE"

Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}