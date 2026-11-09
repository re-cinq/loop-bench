Committed and pushed the **direct** acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/f22e6485c3fa/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with the contract in [dod.md](/var/tmp/loop-bench/runs/f22e6485c3fa/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The targeted Jest run produced the intended red bar:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  rejects invalid input without exposing values and passes valid input unchanged
    Expected pattern: /location/i
    Received string:  "forecast"

  rejects an uncompilable static schema at registration with the tool name
    Expected pattern: /weather/i
    Received function did not throw

  validates each dynamic definition against its current schema
    Expected pattern: /location/i
    Received string:  "ok"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}