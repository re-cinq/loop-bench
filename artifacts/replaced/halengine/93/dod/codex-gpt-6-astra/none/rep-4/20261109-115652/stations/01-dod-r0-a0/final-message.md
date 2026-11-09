Committed and pushed `5eb4bd9` using `direct`. Added one acceptance test, DoD, and spec traceability. No production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure:

```diff
- "inputTokens": 75,
- "outputTokens": 23,
- "totalTokens": 98,
+ "inputTokens": 41,
+ "outputTokens": 13,
+ "totalTokens": 54,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The hook reports the final call instead of the turn total. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}