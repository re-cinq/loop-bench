Committed and pushed `0c4275a` using `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure for string, object, and `undefined`:
```diff
-     "notificationCount": 1,
+     "notificationCount": 0,
```

The test exercises the shared catch through a rejecting lifecycle hook, not a provider failure. Caller rejections remain unchanged.

Branch is current with `main`, pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}