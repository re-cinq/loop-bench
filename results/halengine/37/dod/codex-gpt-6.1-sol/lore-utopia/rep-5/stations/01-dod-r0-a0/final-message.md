Committed and pushed `c03b530` using strategy `direct`. Added three acceptance tests, the normative spec, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures include:

```text
-   "rejectedCalls": 0,
+   "rejectedCalls": 3,

-   "numberError": StringMatching /location.*number|number.*location/i,
+   "numberError": "executor accepted",

Received function did not throw

Tests:       3 failed, 3 total
```

The branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}