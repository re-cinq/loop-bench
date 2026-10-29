Committed and pushed the `direct` acceptance tests and [.lore/dod.md](/var/tmp/loop-bench/runs/7df8725ba8fa/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

I ran only `src/orchestration/tools/registry.acceptance.test.ts`. All four tests failed on the reported behavior:

> Received string: "forecast"  
> Received function did not throw

Invalid input reached the executor, and the invalid schema did not fail at registration. The test output reports `Tests: 4 failed, 4 total`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}