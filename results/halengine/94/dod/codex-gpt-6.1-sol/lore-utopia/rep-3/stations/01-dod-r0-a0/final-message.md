Committed and pushed `997f7d7` using `direct`: one acceptance test, linked spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Failure confirms missing hooks and leaked allocation:

```text
-       "onError",
-       "afterSession",
        "originalError": true,
-   "resourcesLeft": 0,
+   "resourcesLeft": 1,

Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}