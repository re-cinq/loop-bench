Committed and pushed `0b6b52b` using strategy `direct`. Added one acceptance test, the DoD, and its spec link. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure excerpt:

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

The failure confirms the hook reports the last call instead of the turn total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}