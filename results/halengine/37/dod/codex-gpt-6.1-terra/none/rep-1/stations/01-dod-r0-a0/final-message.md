Committed and pushed the `direct` acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/14fe7896086d/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with the contract and remaining facets recorded in [dod.md](/var/tmp/loop-bench/runs/14fe7896086d/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The named test file ran with all three tests failing. The relevant output was:

```text
missing: "forecast"
wrongEnum: "forecast"
wrongType: "forecast"

Expected pattern: /broken/i
Received function did not throw

rejection: "ok"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The tests cover registry validation, invalid static schemas, and changing dynamic schemas. The tool-loop retry, log privacy, and compilation caching remain explicit verification facets in the DoD rather than separate acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}