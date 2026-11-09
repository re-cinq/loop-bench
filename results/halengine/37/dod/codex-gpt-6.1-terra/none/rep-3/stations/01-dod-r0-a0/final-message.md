Committed and pushed the `direct` acceptance tests and definition of done. The branch is up to date with `origin/main` and its upstream.

The named Jest file ran with four failures, all on the missing validation behavior:

```text
Expected pattern: /location/i
Received string:  "executed"

Expected pattern: /location/i
Received string:  "ok"

Expected pattern: /weather/i
Received function did not throw

Expected pattern: /city/i
Received string:  "ok"

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

The acceptance tests are in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/7fd675d28a29/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with the remaining implementation and documentation work recorded in [dod.md](/var/tmp/loop-bench/runs/7fd675d28a29/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}