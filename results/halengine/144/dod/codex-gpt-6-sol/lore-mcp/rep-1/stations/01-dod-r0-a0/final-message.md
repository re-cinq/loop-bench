**Strategy: `direct`.** I committed and pushed five red acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/09d8b4b027d0/workspace/target/src/transport/conversationList.acceptance.test.ts), with the definition of done in [.lore/dod.md](/var/tmp/loop-bench/runs/09d8b4b027d0/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

I ran only that test file. The failure output confirms the missing behavior:

```text
"error": "Unknown message type: list_conversations"
Expected length: 1
Received length: 0
Expected "code": "UNSUPPORTED"
Received "code": "INVALID_MESSAGE"
Expected "code": "SERVER_ERROR"
Received "code": "INVALID_MESSAGE"
Expected value: "conversation_list"
Received array: ["connected", "entry_upsert", "entry_upsert", "entry_delta", "error"]
Tests: 5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}