Added the direct acceptance test in [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/ee2356778886/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:14). It checks that a `beforeSession` error reaches the caller unchanged, reaches `onError` with the same session and error, and still triggers `afterSession`. Updated the spec statement and [.lore/dod.md](/var/tmp/loop-bench/runs/ee2356778886/workspace/target/.lore/dod.md).

The targeted test failed on the missing hooks, as expected:

> Expected `calls`: `["beforeSession", "onError", "afterSession"]`; received `["beforeSession"]`.  
> `receivedSession` and `receivedError` were `undefined`; the caller still received `[Error: before session failed]`.

Committed as `dc505df` and pushed. `origin/main` was already merged, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}