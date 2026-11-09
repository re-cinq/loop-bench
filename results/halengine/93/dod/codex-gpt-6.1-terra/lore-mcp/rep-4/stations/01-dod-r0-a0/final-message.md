Committed and pushed the **direct** acceptance test and definition of done in commit `98af88e`. The branch is up to date with `origin/main` and its upstream.

The test ran and failed for the reported reason: the hook returned the final provider call’s usage instead of the turn total. The relevant failure output was:

```text
- Expected
+ Received

- "inputTokens": 60,
- "outputTokens": 9,
- "totalTokens": 69,
+ "inputTokens": 30,
+ "outputTokens": 4,
+ "totalTokens": 34,

- "inputTokens": 40,
- "outputTokens": 6,
- "totalTokens": 46,
+ "inputTokens": 30,
+ "outputTokens": 4,
+ "totalTokens": 34,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}