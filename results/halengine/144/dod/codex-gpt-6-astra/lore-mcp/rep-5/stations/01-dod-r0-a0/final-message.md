Committed and pushed `643a79a` using strategy `direct`. Added four acceptance tests, spec citations, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Actual failure output:
```text
"message": "Unknown message type: list_conversations"
Tests:       4 failed, 4 total
```

All four fail on missing protocol behavior. `origin/main` is merged; the branch is clean and synced.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}