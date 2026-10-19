I committed and pushed the `direct` DoD in `ac8e11c`. Two new acceptance tests exercise the real tool loop; both fail because the hook receives the final provider call’s usage instead of the turn total. The branch is up to date with `origin/main` and its upstream.

From `npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand --silent`:

```text
Expected: inputTokens 41, outputTokens 10, totalTokens 51
Received: inputTokens 7, outputTokens 3, totalTokens 10

Expected partial: inputTokens 18, outputTokens 5, totalTokens 23
Received partial: inputTokens 7, outputTokens 3, totalTokens 10

Tests: 2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}