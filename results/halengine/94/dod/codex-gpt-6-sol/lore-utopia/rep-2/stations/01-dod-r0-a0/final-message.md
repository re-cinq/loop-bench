Committed and pushed the **direct** acceptance test in [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/2b6ed50dc2d4/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:8), with the spec guarantee and [.lore/dod.md](/var/tmp/loop-bench/runs/2b6ed50dc2d4/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The targeted test fails for the reported behavior:

> `"calls": ["beforeSession"]`  
> Expected: `["beforeSession", "onError", "afterSession"]`  
> `"sameRejection": true`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}