Committed and pushed `6d0d922` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failures:

```text
- "totalTokens": 86,
+ "totalTokens": 44,

- "totalTokens": 42,
+ "totalTokens": 28,

Tests:       2 failed, 2 total
```

Both expose last-round usage replacing the required sum.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}