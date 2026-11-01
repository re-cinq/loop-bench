Committed and pushed `95494eb` using strategy `direct`. One acceptance test pins error propagation, `onError`, and cleanup. No production code changed.

Ran only `src/orchestration/beforeSessionFailure.acceptance.test.ts`. Actual failure:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
  ],
- "outstandingAllocations": 0,
+ "outstandingAllocations": 1,
  "rejectedWithOriginalError": true,
```

```text
Tests:       1 failed, 1 total
```

Added the DoD, spec guarantee, and traceability metadata. Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}