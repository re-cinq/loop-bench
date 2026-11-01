Committed and pushed `62add45` using `direct`. Added five acceptance tests, DoD, and spec traceability. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED"
+ "code": "INVALID_MESSAGE"
- "code": "SERVER_ERROR"
+ "code": "INVALID_MESSAGE"

Tests:       5 failed, 5 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}