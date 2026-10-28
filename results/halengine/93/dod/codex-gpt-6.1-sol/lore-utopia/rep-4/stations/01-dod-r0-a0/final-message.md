Committed and pushed `327dfb4` using strategy `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure:

```text
-       "totalTokens": 86,
+       "totalTokens": 44,

Tests:       1 failed, 1 total
```

The hook reports the final call’s usage instead of the turn total. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}