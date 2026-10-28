Committed and pushed `8309162` using strategy `direct`. Added five acceptance tests, spec citations, and `.lore/dod.md`. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"error": "Unknown message type: list_conversations"
"code": "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}