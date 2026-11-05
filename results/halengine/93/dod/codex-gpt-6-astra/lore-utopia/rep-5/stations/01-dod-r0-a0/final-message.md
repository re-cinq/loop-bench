Committed and pushed `1cb1248` using `direct`. Added two acceptance tests, spec links, and `.lore/dod.md`; no production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failures include:

```diff
-       "totalTokens": 86,
+       "totalTokens": 44,
```

Missing-usage case:

```diff
-       "totalTokens": 42,
+       "totalTokens": 28,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

Both failures demonstrate earlier rounds being discarded. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}