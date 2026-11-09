Committed and pushed `279bcd0` with strategy `direct`. Added four acceptance tests, spec links, and `.lore/dod.md`; no production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures include:

```text
+       "executorCalls": 1,
Received function did not throw
+   "compiledAtRegistration": false,
+   "missingPostalCode": false,
Tests:       4 failed, 4 total
```

The stub-provider loop check remains a recorded facet because your rules prohibit stubs. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}