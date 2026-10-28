Committed and pushed `571a080` using `direct`. Added three acceptance tests, linked spec statements, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures:

```text
Expected substring: "location"
Received string:    "forecast"

Expected pattern: /weather/
Received function did not throw

Expected pattern: /location/
Received string:  "forecast"

Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}