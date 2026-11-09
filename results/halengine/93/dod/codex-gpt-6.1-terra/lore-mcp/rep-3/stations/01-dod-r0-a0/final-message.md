Committed and pushed the **direct** acceptance test and DoD in commit `4a9dfd6`. The branch is up to date with `origin/main` and its upstream.

The targeted test fails on the ticket’s reported undercount. Jest reported:

```text
Expected: inputTokens 31, outputTokens 10, totalTokens 41
Received: inputTokens 13, outputTokens 2, totalTokens 15

Expected: inputTokens 24, outputTokens 5, totalTokens 29
Received: inputTokens 13, outputTokens 2, totalTokens 15

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The first result covers three calls with usage; the second omits usage from the middle call. The test also checks that usage remains absent when no call reports it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}