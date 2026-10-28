Committed and pushed `56ae4e7` using strategy `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/orchestration/beforeSession.acceptance.test.ts
```

Actual failure:
```diff
- "cleansUpOriginalSession": true,
+ "cleansUpOriginalSession": false,
- "onError",
- "afterSession",
- "reportsOriginalError": true,
- "reportsOriginalSession": true,
- "resourcesRemaining": 0,
+ "reportsOriginalError": false,
+ "reportsOriginalSession": false,
+ "resourcesRemaining": 1,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}