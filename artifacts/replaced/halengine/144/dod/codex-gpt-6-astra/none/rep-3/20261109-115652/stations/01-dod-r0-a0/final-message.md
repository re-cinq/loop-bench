Committed and pushed `f8a31f6` using `direct`. Added four acceptance tests, DoD, and spec traceability. Branch is current with `origin/main`; working tree is clean.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Actual failure output:
```text
+ "code": "INVALID_MESSAGE",
+ "message": "Unknown message type: list_conversations",
Tests:       4 failed, 4 total
```

No production implementation changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}