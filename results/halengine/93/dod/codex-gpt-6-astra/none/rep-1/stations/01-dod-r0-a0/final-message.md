Committed and pushed one red acceptance test, `.lore/dod.md`, and the spec contract using strategy `direct`. No production code changed.

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

Branch includes `origin/main`, is fully pushed, and has a clean working tree.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}