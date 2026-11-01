Committed and pushed `1b992ca` using `direct`: one acceptance test, linked spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and its upstream.

Ran only the new acceptance file. Actual failure:

```text
-     "onError",
-     "afterSession",
      "rejected",
-   "remainingAllocations": 0,
+   "remainingAllocations": 1,

Tests:       1 failed, 1 total
```

The original rejection is preserved; error notification and cleanup are missing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}