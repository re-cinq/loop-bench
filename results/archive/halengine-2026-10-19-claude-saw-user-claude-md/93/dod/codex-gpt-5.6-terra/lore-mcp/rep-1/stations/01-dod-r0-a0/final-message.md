Added and pushed red acceptance tests in commit `2958e58`.

Ran:

`npm test -- src/orchestration/toolRoundUsage.acceptance.test.ts`

Actual failure: expected summed usage `{inputTokens: 51, outputTokens: 14, totalTokens: 65}`, but the hook received final-round-only `{inputTokens: 23, outputTokens: 7, totalTokens: 30}`. Missing-usage aggregation test also fails for the same reason.

Added [toolRoundUsage.acceptance.test.ts](/home/bogdan/workspace/loop-bench/runs/dd1757ea4656/workspace/target/src/orchestration/toolRoundUsage.acceptance.test.ts), updated the linked spec statement, and recorded the direct strategy in [.lore/dod.md](/home/bogdan/workspace/loop-bench/runs/dd1757ea4656/workspace/target/.lore/dod.md). Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}