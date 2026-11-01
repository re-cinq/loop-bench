Committed and pushed `d830c24` using `direct`: one acceptance test, spec guarantee, and `.lore/dod.md`. No production changes. Branch is current with `main` and upstream.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
    "rejected",
  ],
- "remainingAllocations": 0,
+ "remainingAllocations": 1,
```

```text
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}