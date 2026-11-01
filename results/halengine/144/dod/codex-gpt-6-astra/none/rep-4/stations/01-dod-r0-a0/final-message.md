Committed and pushed `b83901e` using strategy `direct`. Added four acceptance tests, spec citations, and `.lore/dod.md`. No production code changed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failure output:

```text
"error": "Unknown message type: list_conversations"
- "code": "UNSUPPORTED",
+ "code": "INVALID_MESSAGE",

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

`origin/main` is already merged; the working tree is clean and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}