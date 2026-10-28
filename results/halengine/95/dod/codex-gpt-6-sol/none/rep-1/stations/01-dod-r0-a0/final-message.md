I committed and pushed the **direct** acceptance test in [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/ee0354985851/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:8), with the linked guarantee in the spec and the remaining work in [.lore/dod.md](/var/tmp/loop-bench/runs/ee0354985851/workspace/target/.lore/dod.md).

I ran only that file. It fails for the reported behavior: `"hookCalls": 0` for the string, plain object, and `undefined` rejections, where the test expects `1`. The caller receives each original rejection. Commit `9d5555f` is pushed; the branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}