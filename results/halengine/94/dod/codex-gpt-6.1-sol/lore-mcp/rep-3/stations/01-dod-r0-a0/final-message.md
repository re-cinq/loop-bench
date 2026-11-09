Committed and pushed `b9b0683` with strategy `direct`: one acceptance test covering both entry points, the DoD, and the spec guarantee. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure excerpt:

```text
-       "onError",
-       "afterSession",
        "caller rejected",

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Both paths preserve the original rejection but skip error reporting and cleanup.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}