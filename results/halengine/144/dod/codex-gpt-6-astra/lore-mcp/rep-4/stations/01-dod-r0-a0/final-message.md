Committed and pushed `04a262d` using strategy `direct`.

Added five acceptance tests, spec citations, and `.lore/dod.md`. No production code changed. `origin/main` is merged; the working tree is clean and fully pushed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Actual failure excerpts:
```text
+ "error": "Unknown message type: list_conversations",
+ "valid": false,

- "code": "UNSUPPORTED",
+ "code": "INVALID_MESSAGE",

- "code": "SERVER_ERROR",
+ "code": "INVALID_MESSAGE",

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}