Committed and pushed `33e6b88` using strategy `direct`. Added one acceptance test, the DoD, and spec traceability. No production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure:

```diff
- "inputTokens": 71,
- "outputTokens": 14,
- "totalTokens": 85,
+ "inputTokens": 37,
+ "outputTokens": 7,
+ "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The hook reports the last call instead of the turn total. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}