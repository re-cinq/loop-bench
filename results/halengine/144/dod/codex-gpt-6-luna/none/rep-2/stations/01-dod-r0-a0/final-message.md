Added and pushed commit `9ea8694` with three red acceptance tests and the DoD. The protocol spec now links to those tests. The branch is up to date with `origin/main`.

Ran only the acceptance file:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --runTestsByPath src/transport/ws/conversationList.acceptance.test.ts
```

All three tests fail on the missing behavior. The run reports:

> `Unknown message type: list_conversations`

and expects `UNSUPPORTED` but receives `INVALID_MESSAGE`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}