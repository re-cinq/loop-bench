Committed and pushed `ba158cc` using `direct`. Added four acceptance tests, spec links, and `.lore/dod.md`; no production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED"
+ "code": "INVALID_MESSAGE"

Tests:       4 failed, 4 total
```

Branch is synchronized with upstream and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}