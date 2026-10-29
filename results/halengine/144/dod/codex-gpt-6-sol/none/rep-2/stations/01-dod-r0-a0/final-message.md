Committed and pushed the `direct` Definition of Done, a new [acceptance test file](/var/tmp/loop-bench/runs/54afae1b9ef9/workspace/target/src/transport/conversationList.acceptance.test.ts), and its [WebSocket spec links](/var/tmp/loop-bench/runs/54afae1b9ef9/workspace/target/specs/hal-engine-websocket-protocol/spec.md). No production code changed. The branch is up to date with `origin/main` and its upstream.

I ran only `npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts`. All four tests fail on the missing behavior. The output includes:

```text
"error": "Unknown message type: list_conversations"
Expected: "conversation_list"
Received: "error"
Expected: "UNSUPPORTED"
Received: "INVALID_MESSAGE"
Tests: 4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}