Committed and pushed `4baedd8` using `direct`: one acceptance test, linked spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
  ],
  "originalRejection": true,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}