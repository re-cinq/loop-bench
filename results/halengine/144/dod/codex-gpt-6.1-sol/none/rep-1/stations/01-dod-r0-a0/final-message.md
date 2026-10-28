Committed and pushed `ac468e8` using strategy `direct`. Added four acceptance tests, `.lore/dod.md`, and spec citations. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual output:

```text
"error": "Unknown message type: list_conversations"
"valid": false

Tests:       4 failed, 4 total
```

All fail because the requested frame is unsupported today. Merged latest `origin/main`; the branch is clean and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}