Committed and pushed `c04ba25` using strategy `direct`. Added one acceptance test, the DoD, and the spec’s cleanup guarantee. No production code changed. Branch is synchronized with origin and current main.

Ran only the new acceptance file. Actual failure output:

```text
-     "onError",
-     "afterSession",
      "caller",
    ],
    "originalRejection": true,
-   "remainingAllocations": 0,
+   "remainingAllocations": 1,

Tests:       1 failed, 1 total
```

The failure confirms both hooks are skipped while the original rejection propagates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}