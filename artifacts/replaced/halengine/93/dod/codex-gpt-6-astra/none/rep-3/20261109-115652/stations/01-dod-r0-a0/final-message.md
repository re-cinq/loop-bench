Committed and pushed `c554665` using `direct`: two acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `main`, clean, and fully pushed.

Ran only `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`. Actual failure output:

```text
-       "totalTokens": 86,
+       "totalTokens": 44,
```

Missing-usage cases also under-count:

```text
-       "totalTokens": 42,
+       "totalTokens": 28,

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}