Committed and pushed `dbbe45a` using strategy `direct`. One acceptance test covers both entry points. No production code changed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure for both paths:

```text
-       "onError(session, error)",
-       "afterSession(session)",
...
-     "released": true,
+     "released": false,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The DoD and spec record the cleanup guarantee. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}