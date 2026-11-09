Committed and pushed `1cbbc25` using `direct`. Added one acceptance test, the DoD, and the spec’s partial-initialization cleanup contract. No production code changed.

Ran only the new acceptance file. Actual failure:

```text
FAIL src/orchestration/beforeSession.acceptance.test.ts
-     "onError",
-     "afterSession",
-   "resourcesRemaining": 0,
+   "resourcesRemaining": 1,

Tests:       1 failed, 1 total
```

`main` is merged; the working tree is clean and synchronized with upstream. The existing discovery adapter lacks a `spec` field; the test has an explicit anchor and spec citation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}