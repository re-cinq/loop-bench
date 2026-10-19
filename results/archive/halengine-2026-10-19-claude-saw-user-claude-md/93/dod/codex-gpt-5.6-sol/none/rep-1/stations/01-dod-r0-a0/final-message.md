Implemented and pushed commit `aecee36` with:

- Two direct acceptance tests in [chatOrchestratorUsage.acceptance.test.ts](/home/bogdan/workspace/loop-bench/runs/022c261e24bf/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts)
- Traceability links in the hook spec
- Direct-strategy Definition of Done in [.lore/dod.md](/home/bogdan/workspace/loop-bench/runs/022c261e24bf/workspace/target/.lore/dod.md)

Both tests fail for the expected behavior gap:

```text
Expected: {inputTokens: 60, outputTokens: 9, totalTokens: 69}
Received: {inputTokens: 30, outputTokens: 4, totalTokens: 34}

Expected someUsage: {inputTokens: 21, outputTokens: 3, totalTokens: 24}
Received someUsage: {inputTokens: 13, outputTokens: 2, totalTokens: 15}

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

The branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}