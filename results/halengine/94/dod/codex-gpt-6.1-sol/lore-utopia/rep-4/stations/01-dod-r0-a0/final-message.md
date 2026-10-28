Committed and pushed `db9629f` using strategy `direct`. Added one acceptance test, the DoD, and the linked spec guarantee. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only the new acceptance file. The original rejection is preserved; missing error and cleanup hooks cause the failure:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
    -     "onError",
    -     "afterSession",
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}