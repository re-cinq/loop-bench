Added one direct acceptance test in [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/c9ab51c8f519/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts), updated the spec guarantee, and recorded the DoD in [.lore/dod.md](/var/tmp/loop-bench/runs/c9ab51c8f519/workspace/target/.lore/dod.md).

The test fails for the ticket’s stated behavior. Its output shows the caller receives the original rejection, while `calls` contains only `beforeSession` and `receivedError` is `undefined`. It was the only test run.

Committed and pushed as `d5e6648`; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}