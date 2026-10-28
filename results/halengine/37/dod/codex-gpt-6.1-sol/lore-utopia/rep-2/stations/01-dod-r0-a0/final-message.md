Committed and pushed `fc21c10` using strategy `direct`. Added three acceptance tests, the linked spec, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failure excerpts:

```text
- "result": StringMatching /(?=[\s\S]*location)(?=[\s\S]*required)/i,
+ "result": "forecast",

- "compiledAtRegistration": true,
- "error": StringContaining "weather",
+ "compiledAtRegistration": false,
+ "error": undefined,

- "compiled": true,
+ "compiled": false,

Tests:       3 failed, 3 total
```

`origin/main` was already merged. The branch is clean and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}