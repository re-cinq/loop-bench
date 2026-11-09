Committed and pushed `9dcca0c`: three direct acceptance tests, linked spec statements, and `.lore/dod.md`. No production changes. Branch is current with `main` and fully pushed.

Actual failure output:

```text
-   "rejectedCalls": 0,
+   "rejectedCalls": 3,
-   "compiledAtRegistration": true,
+   "compiledAtRegistration": false,

Tests:       3 failed, 3 total
```

The DoD records the remaining stub-provider integration-test obligation and its conflict with the no-stubs rule.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}