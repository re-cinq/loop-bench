Committed and pushed `009351e` using strategy `direct`. Added five acceptance tests, spec citations and `.lore/dod.md`. No production code changed.

Ran only:

```sh
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual failure output:

```text
"error": "Unknown message type: list_conversations"
"valid": false

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

All five fail because the protocol lacks conversation-list handling. The branch is current with `origin/main`, fully pushed and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}