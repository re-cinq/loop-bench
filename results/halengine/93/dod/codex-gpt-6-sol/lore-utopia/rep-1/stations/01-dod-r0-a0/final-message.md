**Direct strategy:** I committed and pushed two new acceptance tests in [chatOrchestratorUsage.acceptance.test.ts](/var/tmp/loop-bench/runs/2f2b0ca1749e/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts), with the [Definition of Done](/var/tmp/loop-bench/runs/2f2b0ca1749e/workspace/target/.lore/dod.md) and spec links. Both tests fail because the hook reports the final provider call’s usage:

```text
Expected: inputTokens 51, outputTokens 10, totalTokens 61
Received: inputTokens 23, outputTokens 5, totalTokens 28

Expected: inputTokens 34, outputTokens 7, totalTokens 41
Received: inputTokens 23, outputTokens 5, totalTokens 28

Tests: 2 failed, 2 total
```

I ran only the new acceptance file. Commit `66522e8` is pushed; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}