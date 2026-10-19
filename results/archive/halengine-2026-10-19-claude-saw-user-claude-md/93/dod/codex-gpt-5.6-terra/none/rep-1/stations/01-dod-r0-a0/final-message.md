Added and pushed red acceptance coverage in [chatOrchestratorUsage.acceptance.test.ts](/home/bogdan/workspace/loop-bench/runs/28cacb25eef5/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts), plus the traced spec statement and [.lore/dod.md](/home/bogdan/workspace/loop-bench/runs/28cacb25eef5/workspace/target/.lore/dod.md). No production code changed.

Ran only:

```sh
npm test -- src/orchestration/chatOrchestratorUsage.acceptance.test.ts --runInBand
```

Actual red-bar failure:

```text
Expected: {"inputTokens": 23, "outputTokens": 33, "totalTokens": 56}
Received: {"inputTokens": 13, "outputTokens": 17, "totalTokens": 30}

Expected partiallyReported: {"inputTokens": 9, "outputTokens": 14, "totalTokens": 23}
Received partiallyReported: {"inputTokens": 7, "outputTokens": 11, "totalTokens": 18}
```

Committed as `269f1c4 test(orchestrator): define usage aggregation`, pushed, and confirmed the branch is synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}