Created and pushed the direct-strategy acceptance contract in commit `05260a8`.

The focused test fails for the expected reason:

```text
- Expected: {inputTokens: 71, outputTokens: 12, totalTokens: 83}
+ Received: {inputTokens: 37, outputTokens: 6, totalTokens: 43}

- Expected: {inputTokens: 48, outputTokens: 8, totalTokens: 56}
+ Received: {inputTokens: 37, outputTokens: 6, totalTokens: 43}
```

Command run:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts --runInBand
```

The branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}