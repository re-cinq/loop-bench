Defined and pushed the `direct` acceptance contract in commit `2ff1e80`.

Added:

- [usageAcrossToolRounds.acceptance.test.ts](/var/tmp/loop-bench/runs/7a7b4b4deecc/workspace/target/src/orchestration/usageAcrossToolRounds.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/7a7b4b4deecc/workspace/target/.lore/dod.md)
- Updated spec traceability anchors

Ran only the new acceptance file. Both tests fail for the intended reason:

```text
Expected: {inputTokens: 60, outputTokens: 9, totalTokens: 69}
Received: {inputTokens: 30, outputTokens: 4, totalTokens: 34}

Expected partial: {inputTokens: 18, outputTokens: 5, totalTokens: 23}
Received partial: {inputTokens: 11, outputTokens: 3, totalTokens: 14}

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

The branch is merged with current `origin/main`, pushed, clean, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}