Added, committed, and pushed `8431a44`.

Red test run:

```text
Expected hookCalls: 1
Received hookCalls: 0
callerRejection: "provider string failure"
```

The failure demonstrates the reported gate: the original rejection reaches the caller, but `onError` is skipped. The spec now links the new guarantee to [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/52ec4a23eac0/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:25), and `.lore/dod.md` records the direct strategy.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}