Committed and pushed `4b638e1` using `direct`. Added one acceptance test, spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
-   "cleanupSession": true,
-   "errorSession": true,
+   "cleanupSession": false,
+   "errorSession": false,
    "events": Array [
      "beforeSession",
-     "onError",
-     "afterSession",
    ],
    "originalRejection": true,
-   "originalReportedError": true,
-   "remainingResources": 0,
+   "originalReportedError": false,
+   "remainingResources": 1,
```

```text
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}