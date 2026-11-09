Committed and pushed `c88a6e5` using `direct`. Added one acceptance test covering both message entry points, spec traceability, and `.lore/dod.md`. No production code changed.

Ran only the acceptance file. Actual failure output:

```text
FAIL src/orchestration/beforeSession.acceptance.test.ts
-     "allocated": false,
+     "allocated": true,
      "calls": Array [
        "beforeSession",
-       "onError",
-       "afterSession",
      ],
Tests:       1 failed, 1 total
```

Both paths preserve the original rejection but skip error reporting and cleanup.

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}