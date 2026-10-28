Committed and pushed `c41c7dd` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
-     "onError",
-     "afterSession",
      "originalRejection": true,
-   "remainingResources": 0,
+   "remainingResources": 1,

Tests:       1 failed, 1 total
```

The original rejection survives; error reporting and cleanup are absent.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}