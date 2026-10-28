Committed and pushed `04ade7f` using `direct`: five acceptance tests, linked specs, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand --silent
```

Actual failure output:
```text
+ "error": "Unknown message type: list_conversations",
+ "valid": false,
Tests:       5 failed, 5 total
```

Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}