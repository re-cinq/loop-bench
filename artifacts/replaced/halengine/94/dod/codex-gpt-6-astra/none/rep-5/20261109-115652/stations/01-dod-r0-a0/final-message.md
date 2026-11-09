Committed and pushed `da0e89d` using `direct`. Added one acceptance test, the DoD, and the spec guarantee. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
-     "onError",
-     "afterSession",
      "rejected",
    ],
    "rejectedWithOriginal": true,
-   "resources": 0,
+   "resources": 1,

Tests:       1 failed, 1 total
```

The rejection is preserved, but error reporting and cleanup are missing. Main is merged; the working tree is clean and nothing is unpushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}