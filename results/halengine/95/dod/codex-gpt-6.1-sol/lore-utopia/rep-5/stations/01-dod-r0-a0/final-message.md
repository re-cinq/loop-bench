Committed and pushed `da029ea` using strategy `direct`. Added one acceptance test covering three rejection values through both public methods, plus the DoD and spec link. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure output:

```text
-     "calls": 1,
+     "calls": 0,
-     "originalCause": true,
+     "originalCause": false,

Tests:       1 failed, 1 total
```

All six cases preserve the original caller rejection but miss `onError`. Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}