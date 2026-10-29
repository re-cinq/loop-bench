Committed and pushed the new spec, DoD, and five red acceptance tests as `dd2bd8b`. The branch is current with `origin/main` and its upstream.

I ran only the two new test files:

```text
npm test -- --runInBand --silent --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts
```

All five fail on the ticket’s behavior. The output includes:

```text
Expected pattern: /location.*required|required.*location/i
Received string:  "forecast"

Expected pattern: /broken-weather/
Received function did not throw

Expected pattern: /city.*required|required.*city/i
Received string:  "ok"

Expected pattern: /location.*required|required.*location/i
Received string:  "Sunny in Berlin"

Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}