Committed and pushed four red acceptance tests with a new spec and [Definition of Done](/var/tmp/loop-bench/runs/759b10746efe/workspace/target/.lore/dod.md). Strategy: `direct`. No production code changed. The branch is up to date with `origin/main` and its upstream.

I ran only the two new acceptance test files:

```text
npm test -- --runInBand --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts
Tests: 4 failed, 4 total
```

The failures show the reported behavior is absent:

```text
"missing": "forecast"          expected a location-required error
"badSchemaError": ""             expected an error naming broken-weather
"second": "ok"                  expected a station-required error
"toolResultsSeen": ["Sunny", "Sunny"]  expected the rejection on the next round
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}