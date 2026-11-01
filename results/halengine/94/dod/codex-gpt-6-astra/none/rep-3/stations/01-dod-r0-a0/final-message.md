Committed and pushed `4375e73` using `direct`: one acceptance test, spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure excerpt:
```diff
-   "cleanupArgument": true,
-   "errorArguments": true,
+   "cleanupArgument": false,
+   "errorArguments": false,
    "order": Array [
      "beforeSession",
-     "onError",
-     "afterSession",
    ],
    "originalError": true,
-   "resourcesRemaining": 0,
+   "resourcesRemaining": 1,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}