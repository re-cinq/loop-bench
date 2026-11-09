Committed and pushed the `direct` acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/da4fa1c12cce/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with the contract and remaining facets recorded in [dod.md](/var/tmp/loop-bench/runs/da4fa1c12cce/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The named Jest file ran with **3 failures**, each tied to the missing validation behavior:

```text
Expected pattern: /location/i
Received string:  "forecast"

Expected pattern: /date/i
Received string:  "executed"

Expected pattern: /broken-weather/i
Received function did not throw
```

The DoD also records the static compilation count, rejection logging, and orchestrator retry as remaining facets; those are not directly asserted by these three tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}