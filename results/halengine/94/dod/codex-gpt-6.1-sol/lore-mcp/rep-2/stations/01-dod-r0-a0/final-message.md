Committed and pushed `1a7518e` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only:

```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure excerpt:

```text
-   "allocated": false,
+   "allocated": true,
      "beforeSession",
-     "onError",
-     "afterSession",

Tests:       1 failed, 1 total
```

The original rejection is preserved; error reporting and cleanup are missing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}