Committed and pushed the `direct` Definition of Done and four red acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/1304c9cf572b/workspace/target/src/transport/ws/conversationList.acceptance.test.ts). The branch is up to date with `origin/main` and its upstream.

I ran only `npm test -- --runInBand --runTestsByPath src/transport/ws/conversationList.acceptance.test.ts`. All four tests failed on the missing list behavior. The output includes `"Unknown message type: list_conversations"`, `Expected: "conversation_list" / Received: "error"`, and `Expected: "UNSUPPORTED" / Received: "INVALID_MESSAGE"`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}