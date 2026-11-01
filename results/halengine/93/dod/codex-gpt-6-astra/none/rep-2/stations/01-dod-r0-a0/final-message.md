Committed and pushed `8762902` with two red acceptance tests, spec links, and `.lore/dod.md`. Strategy: `direct`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failures:

```text
- "totalTokens": 98,
+ "totalTokens": 54,

- "totalTokens": 68,
+ "totalTokens": 54,

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Both fail because earlier provider usage is omitted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}