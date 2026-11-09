Committed and pushed `59e6838` using `direct`. Added one acceptance test, spec clarification, and `.lore/dod.md`. No production code changed. Branch is current with `main` and its upstream.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure excerpt:
```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
    "rejected",
  ],
  "originalRejection": true,
- "released": true,
+ "released": false,
```
```text
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}