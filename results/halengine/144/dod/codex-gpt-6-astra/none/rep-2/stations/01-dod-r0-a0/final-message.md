Committed and pushed `2e80846` using `direct`: five acceptance tests, spec citations, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/transport/conversationList.acceptance.test.ts`. Actual failure output:

```text
"message": "Unknown message type: list_conversations",
"code": "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

Lore’s existing descriptor adapter lacks a `spec` field; that limitation is recorded in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}