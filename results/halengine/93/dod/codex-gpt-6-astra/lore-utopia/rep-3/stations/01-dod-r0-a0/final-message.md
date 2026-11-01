Committed and pushed `4756f75` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`; no production code changed.

Ran only `src/orchestration/usage.acceptance.test.ts`. Both fail for under-counting:

```text
- "totalTokens": 86,
+ "totalTokens": 44,

- "totalTokens": 42,
+ "totalTokens": 28,

Tests:       2 failed, 2 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}