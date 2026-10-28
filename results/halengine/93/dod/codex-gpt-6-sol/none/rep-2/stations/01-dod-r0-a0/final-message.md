Committed and pushed the `direct` acceptance test for #93 in `6e547c5`. The branch is up to date with `origin/main` and its upstream. The test uses real tool execution and fails because `afterModelResponse` receives only the final provider call’s usage.

From `npm test -- --runInBand --silent --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestratorUsage.acceptance.test.ts
  ● reports total usage from every provider call in a tool turn, including when a round omits usage

    - "inputTokens": 60,
    - "outputTokens": 10,
    - "totalTokens": 70,
    + "inputTokens": 30,
    + "outputTokens": 5,
    + "totalTokens": 35,

Tests: 1 failed, 1 total
```

The contract and remaining work are in [.lore/dod.md](/var/tmp/loop-bench/runs/975455162595/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}