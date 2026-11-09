Committed and pushed `4a6c586` using strategy `direct`. Added one acceptance test, linked spec semantics and `.lore/dod.md`. No production code changed.

Ran only the new acceptance file. Actual failure:

```diff
"twoToolRounds":
- "inputTokens": 71,
- "outputTokens": 15,
- "totalTokens": 86,
+ "inputTokens": 37,
+ "outputTokens": 7,
+ "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Confirmed `main` is merged and the branch is fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}