Committed and pushed `bb8c6a4` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure:

```diff
-   "allocated": false,
+   "allocated": true,
    "events": Array [
      "beforeSession",
-     "onError",
-     "afterSession",
      "caller",
    ],
    "originalError": true,
```

The original rejection survives; error reporting and cleanup are missing.

Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}