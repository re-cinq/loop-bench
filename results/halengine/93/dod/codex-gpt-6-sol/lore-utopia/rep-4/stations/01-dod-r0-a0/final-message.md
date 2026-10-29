Committed and pushed the `direct` acceptance tests in [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/2b280d71784f/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts). Both fail for the ticket’s reported behavior: the hook receives the final provider call’s usage instead of the turn total.

> Expected: `inputTokens: 51, outputTokens: 15, totalTokens: 66`  
> Received: `inputTokens: 23, outputTokens: 7, totalTokens: 30`

The missing-usage case likewise expected `34/10/44` and received `23/7/30`. The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}