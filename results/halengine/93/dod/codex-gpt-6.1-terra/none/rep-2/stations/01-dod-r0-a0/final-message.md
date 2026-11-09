Committed and pushed the `direct` acceptance test and definition of done. The branch is up to date with `origin/main` and its upstream.

The test failed for the reported reason: the hook received the final provider call’s usage instead of the turn total.

```text
Expected: inputTokens 71, outputTokens 14, totalTokens 85
Received: inputTokens 37, outputTokens  7, totalTokens 44

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}