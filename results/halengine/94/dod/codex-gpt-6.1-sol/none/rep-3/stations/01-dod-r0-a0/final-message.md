Committed and pushed `9445c12` using strategy `direct`. Added one acceptance test, linked the spec guarantee, and recorded `.lore/dod.md`. No production code changed.

Ran only the new acceptance file. Actual failure output:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
-       "onError",
-       "afterSession",
        "originalError": true,
Tests:       1 failed, 1 total
```

The rejection is preserved; both required hooks are absent. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}