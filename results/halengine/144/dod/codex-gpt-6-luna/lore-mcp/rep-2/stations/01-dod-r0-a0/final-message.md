Added and pushed the `direct` acceptance test and DoD in commit `69e0259`. The branch is up to date with its upstream, and `origin/main` merged cleanly.

The named acceptance test fails because the current handler rejects the requested frame:

> `Unknown message type: list_conversations`  
> Expected: `"connected-user"`  
> Received: `undefined`

The failure shows `listFor` was never called. The test is in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/e33808b7c621/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), with its protocol traceability statement in the WebSocket spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}