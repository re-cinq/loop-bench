Committed and pushed `85b97e0` using strategy `direct`. Added five acceptance tests, DoD, and spec traceability. No production implementation changed.

Ran only:
```sh
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual failure output:
```text
+ "code": "INVALID_MESSAGE",
+ "message": "Unknown message type: list_conversations",
Tests:       5 failed, 5 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}