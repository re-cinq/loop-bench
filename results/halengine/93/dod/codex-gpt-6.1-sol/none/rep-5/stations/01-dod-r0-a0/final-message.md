Committed and pushed the red acceptance test, spec contract, and `.lore/dod.md` using strategy `direct`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure:
```diff
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

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}