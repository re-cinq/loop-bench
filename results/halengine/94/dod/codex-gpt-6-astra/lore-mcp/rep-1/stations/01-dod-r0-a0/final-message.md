Committed and pushed `b782bce` using `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure:

```text
-     "onError",
-     "afterSession",
-   "remainingResources": 0,
+   "remainingResources": 1,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original rejection is preserved; error reporting and cleanup are absent.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}