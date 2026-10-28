**Strategy: `direct`.** I committed and pushed five red acceptance tests in [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/c229f4760279/workspace/target/src/orchestration/tools/registry.acceptance.test.ts), with the new [spec](/var/tmp/loop-bench/runs/c229f4760279/workspace/target/specs/hal-engine-tool-input-validation/spec.md) and [Definition of Done](/var/tmp/loop-bench/runs/c229f4760279/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

I ran only the named acceptance file. Jest reported `Tests: 5 failed, 5 total`. The failures match the ticket’s claim:

> Expected pattern: /location.*required|required.*location/i  
> Received string: "forecast"
>
> Expected pattern: /location.*string|string.*location/i  
> Received string: "forecast"
>
> Expected pattern: /broken-weather/  
> Received function did not throw
>
> Expected pattern: /city.*required|required.*city/i  
> Received string: "forecast"
>
> Expected pattern: /location.*required|required.*location/i  
> Received string: "sunny"

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}