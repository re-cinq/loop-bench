Committed and pushed `493c96a` using `direct`. Added four acceptance tests, linked spec statements, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual failures included:
```text
+ "result": "forecast",
+ "result": "executor ran",
Expected: > 0
Received:   0
+ "result": "accepted",

Tests:       4 failed, 4 total
```

All failures reflect absent validation or compilation. The DoD records the scripted-provider test limitation under the no-stubs rule.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}