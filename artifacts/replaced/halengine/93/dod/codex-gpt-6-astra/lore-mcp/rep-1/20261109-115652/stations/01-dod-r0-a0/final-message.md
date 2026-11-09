Committed and pushed `30f9fe6` using `direct`. Added two acceptance tests, DoD, and spec traceability; no production code changed.

Both tests fail on under-counting:

```diff
- "totalTokens": 98,
+ "totalTokens": 54,
```

Missing-usage case:

```diff
- "totalTokens": 84,
+ "totalTokens": 54,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Ran only `src/orchestration/turnUsage.acceptance.test.ts`. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}