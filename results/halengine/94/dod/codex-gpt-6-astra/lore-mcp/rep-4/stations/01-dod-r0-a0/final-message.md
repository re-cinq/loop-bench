Committed and pushed `791f944` using `direct`: one acceptance test, linked spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only the new acceptance file. Actual failure:

```text
+   "cleaned": Array [],
+   "errors": Array [],
-     "onError",
-     "afterSession",
-   "resourcesRemaining": 0,
+   "resourcesRemaining": 1,
    "sameRejection": true,

Tests:       1 failed, 1 total
```

The rejection survives unchanged; reporting and cleanup are missing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}