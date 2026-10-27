Added and pushed the direct acceptance-test DoD in commit `64fbd75`. The branch is up to date with `origin/main`.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. All three tests fail on the missing validation behavior:

> Expected pattern: `/location.*required/i`  
> Received string: `"{}"`

> Expected pattern: `/first.*required/i`  
> Received string: `"ok"`

> Expected pattern: `/weather/i`  
> Received function did not throw

The tests and their spec links are in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/ad3156ed03dd/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), [the validation spec](/var/tmp/loop-bench/runs/ad3156ed03dd/workspace/target/specs/hal-engine-tool-input-validation/spec.md), and the DoD is in [.lore/dod.md](/var/tmp/loop-bench/runs/ad3156ed03dd/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}