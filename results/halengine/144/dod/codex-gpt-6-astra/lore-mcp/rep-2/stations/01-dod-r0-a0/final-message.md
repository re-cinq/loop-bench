Committed and pushed `bef58b5` using `direct`: four acceptance tests, DoD, and spec traceability. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"message": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED"
+ "code": "INVALID_MESSAGE"

Tests:       4 failed, 4 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}