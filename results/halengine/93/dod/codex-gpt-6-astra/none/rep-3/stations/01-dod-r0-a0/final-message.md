Committed and pushed `3d2143c` using `direct`: one acceptance test, updated spec, and `.lore/dod.md`. No production code changed. Base is current; working tree is clean and nothing is unpushed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/usage.acceptance.test.ts --runInBand
```

Actual failure:
```diff
-       "inputTokens": 75,
-       "outputTokens": 23,
-       "totalTokens": 98,
+       "inputTokens": 41,
+       "outputTokens": 13,
+       "totalTokens": 54,
```
```text
Tests:       1 failed, 1 total
```

The hook reports the last call instead of the turn’s sum.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}