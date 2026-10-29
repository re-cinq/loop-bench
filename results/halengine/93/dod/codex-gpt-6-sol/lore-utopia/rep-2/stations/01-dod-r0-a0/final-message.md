**Strategy: `direct`.** I committed and pushed the acceptance test and [Definition of Done](/var/tmp/loop-bench/runs/04b7fede5679/workspace/target/.lore/dod.md) in `eb1807d`. The test exercises two tool rounds through the orchestrator and fails for the reported undercount:

```text
Expected: {inputTokens: 23, outputTokens: 18, totalTokens: 41}
Received: {inputTokens: 5, outputTokens: 13, totalTokens: 18}
Tests: 1 failed, 1 total
```

I ran only `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`. The branch is up to date with `origin/main` and has no unpushed changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}