Committed and pushed `efe9780` using `direct`. Added one acceptance test, spec linkage, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure:
```diff
- "calls": 1,
+ "calls": 0,
```
```text
Tests:       1 failed, 1 total
```

The test exercises the shared catch through a lifecycle hook, covering string, object, and `undefined` rejections across both APIs. Branch is synchronized with upstream and current with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}