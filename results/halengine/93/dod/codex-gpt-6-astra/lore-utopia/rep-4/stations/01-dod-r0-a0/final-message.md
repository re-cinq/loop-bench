Committed and pushed `8221a0c` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`. No production code changed.

Both tests failed for under-counting. Actual failure excerpts:

```text
- "totalTokens": 85,
+ "totalTokens": 44,
```

Missing-usage case:

```text
- "totalTokens": 41,
+ "totalTokens": 28,

Tests:       2 failed, 2 total
```

Branch is current with `main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}