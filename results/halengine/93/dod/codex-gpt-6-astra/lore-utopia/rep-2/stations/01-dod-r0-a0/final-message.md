Committed and pushed `7c77c22` using `direct`. Two acceptance tests fail for under-counting; no production code changed. Branch is current with `main` and upstream.

Actual failures:

```text
- "totalTokens": 86,
+ "totalTokens": 44,

- "totalTokens": 58,
+ "totalTokens": 44,

Tests:       2 failed, 2 total
```

Added the DoD, spec links and test descriptor anchors. Existing tests remain unedited.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}