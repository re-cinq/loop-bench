Committed and pushed `ab823b2` using strategy `direct`. Added three acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures:

```text
"missing": "forecast",
"rejectedCalls": 3,
"wrongEnum": "forecast",
"wrongType": "forecast"

Expected pattern: /weather/
Received function did not throw

Expected pattern: /(?=.*location)(?=.*number)/i
Received string: "forecast"

Tests: 3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}