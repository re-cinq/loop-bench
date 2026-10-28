Committed and pushed `4237e8a` using strategy `direct`. Added five acceptance tests, spec links, and `.lore/dod.md`. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failure output:

```text
"error": "Unknown message type: list_conversations"
Tests:       5 failed, 5 total
```

All five fail on missing protocol support. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}