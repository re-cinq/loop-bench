Added and pushed the direct-strategy acceptance contract in commit `2ea0e12`.

The new acceptance test fails for the intended reason:

```text
Expected everyRound: {inputTokens: 71, outputTokens: 10, totalTokens: 81}
Received everyRound: {inputTokens: 37, outputTokens: 5, totalTokens: 42}

Expected someRounds: {inputTokens: 48, outputTokens: 7, totalTokens: 55}
Received someRounds: {inputTokens: 37, outputTokens: 5, totalTokens: 42}

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Command run:

```text
npm test -- --runTestsByPath src/orchestration/usageAcrossToolRounds.acceptance.test.ts --runInBand
```

The branch is up to date with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}