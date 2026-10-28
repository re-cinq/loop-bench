Committed and pushed `6da3e64` with three acceptance tests, spec links, and `.lore/dod.md`. Strategy: `direct`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures:

```text
Expected pattern: /location/i
Received string:  "forecast"

Expected pattern: /weather/
Received function did not throw

Expected pattern: /string/i
Received string:  "forecast"

Tests:       3 failed, 3 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}