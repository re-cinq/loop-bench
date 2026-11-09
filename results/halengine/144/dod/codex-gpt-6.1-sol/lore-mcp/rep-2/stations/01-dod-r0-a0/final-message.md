Committed and pushed `309777f` using `direct`: four acceptance tests, DoD checklist, and spec citations. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures included:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED",
+ "code": "INVALID_MESSAGE",
- "code": "SERVER_ERROR",
+ "code": "INVALID_MESSAGE",

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}