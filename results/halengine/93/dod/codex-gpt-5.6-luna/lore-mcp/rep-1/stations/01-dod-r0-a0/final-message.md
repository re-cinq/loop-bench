Added and committed acceptance tests in [usage.acceptance.test.ts](/var/tmp/loop-bench/runs/6c3c52f5c95a/workspace/target/src/orchestration/usage.acceptance.test.ts) with direct strategy, DoD, and spec traceability.

Ran only the acceptance file. Both fail for the intended reason:

- Expected `{inputTokens: 60, outputTokens: 21, totalTokens: 81}`, received final-round `{30, 9, 39}`.
- Expected `{12, 5, 17}`, received `{8, 3, 11}`.

Committed and pushed as `b27f51f`; branch is up to date with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}