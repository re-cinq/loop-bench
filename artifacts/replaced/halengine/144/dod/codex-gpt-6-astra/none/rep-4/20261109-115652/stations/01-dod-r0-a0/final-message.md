Committed and pushed `d985918` using `direct`: four acceptance tests, spec citations, and `.lore/dod.md`. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED"
+ "code": "INVALID_MESSAGE"
- "code": "SERVER_ERROR"
+ "code": "INVALID_MESSAGE"

Tests:       4 failed, 4 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}