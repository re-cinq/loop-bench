Committed and pushed `a7d332f` using `direct`. Added five acceptance tests, spec citations, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual failure output:
```text
"error": "Unknown message type: list_conversations"
"valid": false

Tests:       5 failed, 5 total
```

All failures reflect the missing history protocol. The branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}