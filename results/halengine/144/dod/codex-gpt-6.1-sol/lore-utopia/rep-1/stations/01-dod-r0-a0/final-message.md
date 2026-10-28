Committed and pushed `b2eee38` using strategy `direct`. Added four acceptance tests, spec citations, and `.lore/dod.md`. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures included:

```text
"error": "Unknown message type: list_conversations"
-   "conversation_list",
+   "error",
-     "code": "UNSUPPORTED",
+     "code": "INVALID_MESSAGE",
-     "code": "SERVER_ERROR",
+     "code": "INVALID_MESSAGE",

Tests:       4 failed, 4 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}