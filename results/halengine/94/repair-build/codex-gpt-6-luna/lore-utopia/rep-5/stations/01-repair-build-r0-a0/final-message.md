Fixed the two CI findings in [chatOrchestrator.beforeSession.acceptance.test.ts](/var/tmp/loop-bench/runs/9c50ecb4103a/workspace/target/src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts): updated the prompt-builder config and combined the three checks into one assertion. Formatted the file, committed as `a19a0de`, and pushed. `origin/main` was already merged; the branch is synced with its upstream.

I did not run lint or typecheck locally, as instructed. CI will need to judge the pushed commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The acceptance test used obsolete prompt config fields and exceeded the one-expect lint rule."}}