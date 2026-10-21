Fixed both CI findings in [chatOrchestrator.beforeSession.acceptance.test.ts](/var/tmp/loop-bench/runs/99d8bc25c676/workspace/target/src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts): the `PromptBuilder` now uses valid config fields, and the test checks the caller rejection and both hooks with one expectation.

Formatted the changed file and pushed commit `ab56212`. Merging `origin/main` was unnecessary; the branch is clean and up to date with its upstream. I did not run typecheck or ESLint, per the pod instructions, so CI still needs to judge this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected the acceptance test config and consolidated its assertions to satisfy the reported typecheck and lint findings"}}