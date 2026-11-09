Committed and pushed `e64bb55` with five acceptance tests, spec links, and `.lore/dod.md`. Strategy: `direct`. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED",
+ "code": "INVALID_MESSAGE",
- "code": "SERVER_ERROR",
+ "code": "INVALID_MESSAGE",

Tests:       5 failed, 5 total
```

Merged `origin/main`: already up to date. Branch is clean and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}