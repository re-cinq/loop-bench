Committed and pushed `22b3188` using strategy `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and not ahead of upstream.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failures:

```text
- "totalTokens": 85,
+ "totalTokens": 44,
```

Missing-usage cases:

```text
- "totalTokens": 57,
+ "totalTokens": 44,

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Both fail because earlier provider rounds are omitted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}