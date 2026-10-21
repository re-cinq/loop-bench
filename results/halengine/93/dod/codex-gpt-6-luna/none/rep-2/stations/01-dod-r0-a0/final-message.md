Added two acceptance tests in [usageAcrossRounds.acceptance.test.ts](/var/tmp/loop-bench/runs/31e215232fd5/workspace/target/src/orchestration/usageAcrossRounds.acceptance.test.ts) and linked them from the updated spec. The tests cover usage summed across provider rounds, missing usage on an intermediate round, and `undefined` when no round reports usage. The existing no-tool test remains unchanged.

Both tests fail for the reported reason. For example:

```text
Expected: {"inputTokens": 33, "outputTokens": 14, "totalTokens": 47}
Received: {"inputTokens": 3, "outputTokens": 2, "totalTokens": 5}
```

Committed and pushed as `d428899`. The branch is up to date with `origin/main` and has no unpushed commits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}