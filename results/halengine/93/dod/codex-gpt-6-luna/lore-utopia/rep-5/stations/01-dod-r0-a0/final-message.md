Added one direct acceptance test in [usageAcrossToolRounds.acceptance.test.ts](/var/tmp/loop-bench/runs/7176f05c2e7f/workspace/target/src/orchestration/usageAcrossToolRounds.acceptance.test.ts:41), updated the spec, and recorded the DoD.

The test failed for the ticket’s stated reason: it expected `{inputTokens: 40, outputTokens: 8, totalTokens: 48}` across provider calls, but received only the last call’s `{inputTokens: 30, outputTokens: 6, totalTokens: 36}`. The no-usage turn reported `undefined`.

Committed as `166b167` and pushed. `origin/main` was already merged; the branch is clean and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}