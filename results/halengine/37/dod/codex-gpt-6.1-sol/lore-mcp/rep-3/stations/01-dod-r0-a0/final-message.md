Committed and pushed `6780f43` with strategy `direct`: three acceptance tests, linked spec, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures:

```text
- "calls": 0,
- "result": StringMatching /(?=.*location)(?=.*required)/is,
+ "calls": 1,
+ "result": "forecast",

Expected pattern: /weather/
Received function did not throw

- "calls": 1,
- "result": StringMatching /(?=.*location)(?=.*number)/is,
+ "calls": 2,
+ "result": "forecast",

Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}