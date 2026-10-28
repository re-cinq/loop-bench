Committed and pushed `f2a7d06` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
    "caller",
  ],
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original rejection is preserved; error reporting and cleanup are absent.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}