Added and pushed red acceptance coverage in commit `38d0e47`.

- New tests: [usageAcrossToolRounds.acceptance.test.ts](/var/tmp/loop-bench/runs/1e44ee1f0fbd/workspace/target/src/orchestration/usageAcrossToolRounds.acceptance.test.ts)
- DoD: [dod.md](/var/tmp/loop-bench/runs/1e44ee1f0fbd/workspace/target/.lore/dod.md)
- Updated the hook spec with the acceptance-test link.

Ran only the new acceptance file. It fails as intended:

```text
Expected: {"inputTokens": 30, "outputTokens": 35, "totalTokens": 65}
Received: {"inputTokens": 17, "outputTokens": 19, "totalTokens": 36}
```

The partial-usage case likewise receives only the final round rather than the sum. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}