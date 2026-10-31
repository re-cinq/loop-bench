Added and pushed commit `ebcf8a1` with the red acceptance contract and DoD.

- New test: [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/e84f1f288e96/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:40)
- Updated linked spec statement and [DoD](/var/tmp/loop-bench/runs/e84f1f288e96/workspace/target/.lore/dod.md:1)
- Ran only: `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`

Actual failure:

> Expected `inputTokens: 9, outputTokens: 14, totalTokens: 23`; received `inputTokens: 7, outputTokens: 11, totalTokens: 18`.

Branch is pushed and synchronized with `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}