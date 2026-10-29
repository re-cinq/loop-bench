Committed and pushed the `direct` Definition of Done and three red acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/588d191a1633/workspace/target/src/transport/conversationList.acceptance.test.ts). The branch is up to date with `origin/main` and its upstream.

The targeted run, `npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts`, reported **3 failed, 3 total**. Its failures show the missing behavior:

> `"error": "Unknown message type: list_conversations"`  
> Expected `"conversation_list"`; received `"error"`  
> Expected `"UNSUPPORTED"`; received `"INVALID_MESSAGE"`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}