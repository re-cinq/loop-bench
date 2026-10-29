**Strategy: `direct`.** I committed and pushed [the acceptance test](/var/tmp/loop-bench/runs/6574b72addd1/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts:55), its [spec link](/var/tmp/loop-bench/runs/6574b72addd1/workspace/target/specs/hal-engine-config-hooks/spec.md:28), and the [Definition of Done](/var/tmp/loop-bench/runs/6574b72addd1/workspace/target/.lore/dod.md). `origin/main` was already up to date, and the branch is not ahead of its upstream.

The named test fails for the reported undercount:

> Expected all-round usage: 71 input, 14 output, 85 total. Received: 37 input, 7 output, 44 total—the final provider call alone.

The test also covers a round that omits usage and a turn where no round reports usage. No production code was changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}