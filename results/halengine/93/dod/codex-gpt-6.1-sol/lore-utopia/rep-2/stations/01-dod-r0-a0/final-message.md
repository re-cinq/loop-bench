Committed and pushed `df78ad9` using `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand --silent
```

Actual failure:
```diff
- "inputTokens": 71,
- "outputTokens": 14,
- "totalTokens": 85,
+ "inputTokens": 37,
+ "outputTokens": 7,
+ "totalTokens": 44,
```
```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The failure confirms the hook receives the last call’s usage instead of the turn total. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}