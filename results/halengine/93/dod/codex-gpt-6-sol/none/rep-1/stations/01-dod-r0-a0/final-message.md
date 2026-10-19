**Strategy: `direct`.** I committed and pushed the new [acceptance test](/home/bogdan/workspace/loop-bench/runs/a91b8ac6b559/workspace/target/src/orchestration/turnUsage.acceptance.test.ts:63), its [spec link](/home/bogdan/workspace/loop-bench/runs/a91b8ac6b559/workspace/target/specs/hal-engine-config-hooks/spec.md:28), and the [Definition of Done](/home/bogdan/workspace/loop-bench/runs/a91b8ac6b559/workspace/target/.lore/dod.md). Commit `ae63bd7` is pushed; the branch is up to date with `origin/main` and its upstream.

I ran only `npm test -- --runInBand --runTestsByPath src/orchestration/turnUsage.acceptance.test.ts`. It fails on the reported undercount:

```text
- "everyRound": { "inputTokens": 51, "outputTokens": 10, "totalTokens": 61 }
+ "everyRound": { "inputTokens": 23, "outputTokens": 5, "totalTokens": 28 }
- "missingMiddle": { "inputTokens": 34, "outputTokens": 7, "totalTokens": 41 }
+ "missingMiddle": { "inputTokens": 23, "outputTokens": 5, "totalTokens": 28 }
Tests: 1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}