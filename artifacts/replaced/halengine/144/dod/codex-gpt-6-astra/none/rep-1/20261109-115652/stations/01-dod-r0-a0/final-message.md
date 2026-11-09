Committed and pushed `9b9e3d6` using strategy `direct`. Added five acceptance tests, spec links, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Actual failure output:
```text
"message": "Unknown message type: list_conversations"
"code": "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

Merged `origin/main`: already up to date. Branch is clean and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}