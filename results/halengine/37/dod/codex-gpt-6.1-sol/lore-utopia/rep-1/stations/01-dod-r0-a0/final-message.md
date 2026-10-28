Committed and pushed `b76fa06` using strategy `direct`. Added three acceptance tests, the linked spec, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. All three fail for missing validation. Actual failure excerpts:

```text
- "calls": 0,
+ "calls": 1,
- "result": StringMatching /(?=.*location)(?=.*required)/is,
+ "result": "forecast",

Expected pattern: /broken-weather/
Received function did not throw

Tests:       3 failed, 3 total
```

Merged `origin/main`—already current. Branch is fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}