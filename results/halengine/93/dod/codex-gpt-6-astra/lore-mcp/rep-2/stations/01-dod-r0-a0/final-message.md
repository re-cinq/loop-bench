Committed and pushed `25f975f` using `direct`. Added two acceptance tests, DoD, and spec traceability; no production changes. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure output:

```text
-       "totalTokens": 86,
+       "totalTokens": 44,
```

Missing-usage cases also under-count:

```text
-       "totalTokens": 72,
+       "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}