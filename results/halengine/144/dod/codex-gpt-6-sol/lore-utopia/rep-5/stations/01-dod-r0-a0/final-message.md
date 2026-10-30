Committed and pushed the `direct` DoD and four WebSocket acceptance tests in [conversationHistory.acceptance.test.ts](/var/tmp/loop-bench/runs/681895859a6f/workspace/target/src/transport/conversationHistory.acceptance.test.ts). The branch is up to date with `origin/main` and its upstream.

I ran only that test file. All four tests fail on the missing behavior; the output includes:

> `"error": "Unknown message type: list_conversations"`  
> `Expected value: "conversation_list"`  
> `Received array: ["connected", "entry_upsert", "error", "pong"]`  
> `Tests: 4 failed, 4 total`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}