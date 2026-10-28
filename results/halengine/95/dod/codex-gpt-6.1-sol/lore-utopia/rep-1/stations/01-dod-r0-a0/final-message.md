Committed and pushed `c9ccb5e` using `direct`. Added one acceptance test, the linked spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,
-     "reportedError": true,
+     "reportedError": false,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Non-Error rejections reach callers unchanged but bypass `onError`. The test exercises lifecycle failures through the shared catch block without provider doubles.

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}