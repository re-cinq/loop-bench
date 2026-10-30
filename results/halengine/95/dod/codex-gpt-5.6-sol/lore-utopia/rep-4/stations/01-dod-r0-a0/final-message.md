Added and pushed the direct acceptance contract in commit `c371bfd`.

Test command:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts

Expected hookCallCount: 1
Received hookCallCount: 0

Expected hookReceivedError: true
Received hookReceivedError: false

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The failure covers string, plain-object, and `undefined` rejections while confirming each original rejection still reaches the caller unchanged. The branch is merged with `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}