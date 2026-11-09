Committed and pushed the **direct** acceptance test and definition of done. The branch is up to date with `origin/main` and its upstream.

The test failed for the reported reason: the hook returned the final provider call’s usage instead of the turn total.

```text
- Expected: inputTokens: 60, outputTokens: 10, totalTokens: 70
+ Received: inputTokens: 30, outputTokens: 5, totalTokens: 35

- Expected: inputTokens: 40, outputTokens: 7, totalTokens: 47
+ Received: inputTokens: 30, outputTokens: 5, totalTokens: 35

Tests: 1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}