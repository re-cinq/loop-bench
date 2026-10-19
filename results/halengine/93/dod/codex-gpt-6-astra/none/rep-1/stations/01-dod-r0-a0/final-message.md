Committed and pushed `b60805a` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/usage.acceptance.test.ts`. Actual failures:

```text
- "totalTokens": 85,
+ "totalTokens": 44,

- "totalTokens": 57,
+ "totalTokens": 44,

Tests:       2 failed, 2 total
```

Both expose last-round under-counting. Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}