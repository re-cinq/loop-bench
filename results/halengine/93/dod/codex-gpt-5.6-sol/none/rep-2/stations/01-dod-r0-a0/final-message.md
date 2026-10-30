Added and pushed commit `052ceff` with:

- A direct acceptance test covering summed usage, omitted-round usage, and all-missing usage.
- Spec traceability.
- `.lore/dod.md` defining remaining facets.

Ran only:

`npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts --runInBand`

It fails for the intended reason:

```text
Expected everyRound: { inputTokens: 51, outputTokens: 10, totalTokens: 61 }
Received everyRound: { inputTokens: 23, outputTokens: 5, totalTokens: 28 }

Expected someRounds: { inputTokens: 34, outputTokens: 7, totalTokens: 41 }
Received someRounds: { inputTokens: 23, outputTokens: 5, totalTokens: 28 }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The branch is merged with current `origin/main`, pushed, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}