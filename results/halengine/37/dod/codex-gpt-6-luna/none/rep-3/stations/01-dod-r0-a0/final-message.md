Committed and pushed as `49506e3` (`Add tool input validation acceptance test`). The branch is up to date with `origin/main` and its upstream.

The named acceptance test fails for the ticket’s stated reason:

> `Expected pattern: /location.*required/i`  
> `Received string: "forecast"`

`ToolRegistry.execute` invokes the executor for `{}` without enforcing the required `location` field. The test, linked spec statement, and DoD are in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/ca73ffc4f2e2/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), [spec.md](/var/tmp/loop-bench/runs/ca73ffc4f2e2/workspace/target/specs/hal-engine-tool-input-validation/spec.md), and [.lore/dod.md](/var/tmp/loop-bench/runs/ca73ffc4f2e2/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}