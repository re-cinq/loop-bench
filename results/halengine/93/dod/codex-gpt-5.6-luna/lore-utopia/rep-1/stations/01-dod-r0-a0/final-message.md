Added and pushed the direct acceptance test and `.lore/dod.md`.

Test run:

```text
FAIL src/orchestration/usageReporting.acceptance.test.ts
Expected twoToolRounds: { inputTokens: 40, outputTokens: 6, totalTokens: 46 }
Received:             { inputTokens: 30, outputTokens: 4, totalTokens: 34 }
```

Commit `8e4f994`; branch is clean and up to date with origin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}