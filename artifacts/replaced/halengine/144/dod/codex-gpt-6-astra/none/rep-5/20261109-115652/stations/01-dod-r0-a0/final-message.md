Committed and pushed `d95de4e` using strategy `direct`. Added five acceptance tests, spec citations, and `.lore/dod.md`. No production changes. Branch is current with `main` and fully pushed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failures include:

```text
"code": "INVALID_MESSAGE",
"message": "Unknown message type: list_conversations"

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}