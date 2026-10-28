Committed and pushed `3885c0c` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. It fails because both hooks are skipped:

```text
-       "onError",
-       "afterSession",
-   "resourcesRemaining": 0,
+   "resourcesRemaining": 1,
    "sameError": true,

Tests:       1 failed, 1 total
```

Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}