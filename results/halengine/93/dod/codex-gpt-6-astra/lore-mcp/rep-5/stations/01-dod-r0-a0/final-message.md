Committed and pushed `d62686c` using strategy `direct`. Added two acceptance tests, DoD, and spec links; no production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure output:

```text
-         "totalTokens": 86,
+         "totalTokens": 44,

Tests:       2 failed, 2 total
```

Both failures demonstrate usage under-counting. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}