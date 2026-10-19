Committed and pushed `3530e42` using `direct`: two acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `main` and its upstream.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Both tests fail on under-counted usage:

```text
-       "totalTokens": 86,
+       "totalTokens": 44,
```

Missing-usage scenarios also under-count:

```text
-       "totalTokens": 58,
+       "totalTokens": 44,
```

```text
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}