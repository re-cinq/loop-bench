Committed and pushed `e48c758` using `direct`. Added three acceptance tests, spec links, and `.lore/dod.md`. No production code changed.

Ran only `registry.acceptance.test.ts`. Actual failures:

```text
- "invalidCalls": 0,
+ "invalidCalls": 4,

Received function did not throw

- "result": StringMatching /location.*string|string.*location/i,
+ "result": "forecast",

Tests: 3 failed, 3 total
```

Retry-loop integration remains documented work because the available provider cannot issue tool calls without a stub.

Branch is synchronized with its upstream and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}