Committed and pushed `fa10b61` with one acceptance test covering both entry points, spec traceability, and `.lore/dod.md`. Strategy: `direct`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure for both modes:

```diff
- "cleanupArgument": true,
- "errorArguments": true,
+ "cleanupArgument": false,
+ "errorArguments": false,
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
    "caller rejection",
  ],
```

```text
Tests:       1 failed, 1 total
```

Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}