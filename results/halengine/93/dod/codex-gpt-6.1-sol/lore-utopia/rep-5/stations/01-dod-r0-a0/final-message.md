Committed and pushed `36025c1` using `direct`. One acceptance test covers summed usage, missing usage, and no-tool turns. No production code changed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure:

```text
- "totalTokens": 85,
+ "totalTokens": 44,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The hook reports the last call instead of the turn total. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}