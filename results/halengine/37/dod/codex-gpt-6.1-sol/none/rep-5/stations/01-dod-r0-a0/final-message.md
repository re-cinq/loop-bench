Committed and pushed `918dab6` using strategy `direct`. Added three acceptance tests, linked spec statements, and `.lore/dod.md`. No production code changed.

Ran only `registry.acceptance.test.ts`. Actual failures included:

```text
+ "missing": "forecast",
+ "compiledAtRegistration": false,
+ "registrationError": "",
+ "compiledBoth": false,

Tests:       3 failed, 3 total
```

Malformed input reaches executors; schemas are never compiled. The branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}