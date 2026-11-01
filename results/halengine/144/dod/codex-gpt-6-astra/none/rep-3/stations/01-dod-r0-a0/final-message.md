Committed and pushed `4873770` using `direct`. Added three acceptance tests, spec links, and `.lore/dod.md`; no production code changed.

Ran only `src/transport/conversationHistory.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED",
+ "code": "INVALID_MESSAGE",
- "code": "SERVER_ERROR",
+ "code": "INVALID_MESSAGE",

Tests:       3 failed, 3 total
```

`origin/main` is already merged. Working tree is clean and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}