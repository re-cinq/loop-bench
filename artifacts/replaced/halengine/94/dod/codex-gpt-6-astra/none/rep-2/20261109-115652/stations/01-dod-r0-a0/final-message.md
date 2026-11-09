Committed and pushed `b77cf83` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and its upstream.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure:
```diff
-   "cleanupSession": true,
-   "errorSession": true,
+   "cleanupSession": false,
+   "errorSession": false,
-     "onError",
-     "afterSession",
-   "remainingAllocations": 0,
+   "remainingAllocations": 1,
```
```text
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}