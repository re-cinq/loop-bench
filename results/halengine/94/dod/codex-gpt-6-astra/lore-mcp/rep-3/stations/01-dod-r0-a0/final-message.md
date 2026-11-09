Committed and pushed `e9e4eeb` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and its upstream.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure excerpt:

```text
+   "cleanupArguments": Array [],
+   "errorArguments": Array [],
-     "onError",
-     "afterSession",
    "originalRejection": true,
-   "resourcesRemaining": 0,
+   "resourcesRemaining": 1,

Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}