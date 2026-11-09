Committed and pushed `8baf834` using strategy `direct`. Added five acceptance tests, `.lore/dod.md`, and spec citations. No production code changed.

Ran only:

```sh
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual failure output:

```text
"message": "Unknown message type: list_conversations"
Tests:       5 failed, 5 total
```

All five fail on the absent protocol behavior. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}