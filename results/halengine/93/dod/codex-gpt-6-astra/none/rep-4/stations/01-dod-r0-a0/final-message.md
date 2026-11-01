Committed and pushed `01c08b5` using `direct`. Two acceptance tests fail for the reported under-counting; no production code changed.

Actual failure excerpts:
```text
- "totalTokens": 86,
+ "totalTokens": 44,

- "totalTokens": 58,
+ "totalTokens": 44,

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Added `.lore/dod.md` and spec validation links. Existing tests remain untouched. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}