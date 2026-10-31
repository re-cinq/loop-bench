Added and pushed the standalone red acceptance test and DoD.

Ran:

`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

Actual failure in all three cases:

```text
Expected: "onErrorCalls": 1
Received: "onErrorCalls": 0
```

The test covers string, plain-object, and `undefined` rejections while asserting the caller still receives the original value. Commit: `96a208e`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}