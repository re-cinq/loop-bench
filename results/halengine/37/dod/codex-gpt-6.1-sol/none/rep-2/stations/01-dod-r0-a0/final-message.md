Committed and pushed `6d01a21` with three acceptance tests, linked spec statements, and `.lore/dod.md`. Strategy: `direct`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. All three fail because validation is absent:

```text
- "calls": 0,
+ "calls": 1,

- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,

- "rejectedText": StringMatching /(?=.*location)(?=.*number)/s,
+ "rejectedText": "forecast",

Tests:       3 failed, 3 total
```

Branch is current with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}