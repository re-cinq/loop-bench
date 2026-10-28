Committed and pushed `21aa938` using strategy `direct`. Added one acceptance test covering both public entry points, the linked spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure output:

```text
FAIL src/orchestration/beforeSession.acceptance.test.ts
-     "allocated": false,
+     "allocated": true,
-       "onError",
-       "afterSession",
Tests:       1 failed, 1 total
```

Both paths preserve the original rejection but skip error reporting and cleanup. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}