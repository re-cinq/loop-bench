Committed and pushed the `direct` DoD in [dod.md](/var/tmp/loop-bench/runs/335009326b42/workspace/target/.lore/dod.md), with two red tests in [chatOrchestratorUsage.acceptance.test.ts](/var/tmp/loop-bench/runs/335009326b42/workspace/target/src/orchestration/chatOrchestratorUsage.acceptance.test.ts). The unchanged single-call test passes. The branch is up to date with `origin/main` and its upstream.

The acceptance failures show the reported undercount:

> Expected 31/10/41 tokens; received 13/2/15.  
> Expected 18/8/26 tokens; received 7/5/12.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}