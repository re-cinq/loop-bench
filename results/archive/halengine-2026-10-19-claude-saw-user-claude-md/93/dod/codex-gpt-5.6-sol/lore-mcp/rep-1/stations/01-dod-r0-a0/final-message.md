Implemented and pushed the `direct` Definition of Done in commit `2d58f78`.

- Added one acceptance test: [chatOrchestratorUsage.acceptance.test.ts](/home/bogdan/workspace/loop-bench/runs/5327432ad500/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts:46)
- Added [.lore/dod.md](/home/bogdan/workspace/loop-bench/runs/5327432ad500/workspace/target/.lore/dod.md)
- Linked the intended behavior from the config-hooks spec.
- Branch is current with `origin/main` and fully pushed.

Command run:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts --runInBand
```

Expected failure:

```text
- Expected  - 3
+ Received  + 3

  Object {
-   "inputTokens": 9,
-   "outputTokens": 14,
-   "totalTokens": 23,
+   "inputTokens": 7,
+   "outputTokens": 11,
+   "totalTokens": 18,
  }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

This confirms the hook currently receives only the final provider call’s usage rather than the accumulated turn total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}