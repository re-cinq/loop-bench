Committed and pushed `66664c4` using strategy `direct`: four acceptance tests, linked spec, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures included:

```text
+ "calls": 1,
+ "result": "forecast",

+ "calls": 2,
+ "wrongEnum": "forecast",
+ "wrongType": "forecast",

Received function did not throw

Tests:       4 failed, 4 total
```

The dynamic-schema test also returned `"forecast"` instead of rejecting the string input.

`origin/main` was already merged. Working tree is clean; branch is up to date with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}