Committed and pushed `c7ad19f` using strategy `direct`. Added three acceptance tests, the missing spec, and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures included:

```text
Received function did not throw
```

```text
- "result": StringMatching /(?=.*location)(?=.*string)/is,
+ "result": "{\"location\":12}",
```

```text
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}