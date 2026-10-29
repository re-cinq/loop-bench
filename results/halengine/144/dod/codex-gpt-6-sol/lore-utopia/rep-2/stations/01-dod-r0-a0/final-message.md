Added and pushed three `direct` acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/0f271b9c7510/workspace/target/src/transport/conversationList.acceptance.test.ts). The [Definition of Done](/var/tmp/loop-bench/runs/0f271b9c7510/workspace/target/.lore/dod.md) records the remaining work. The branch is up to date with `origin/main` and its upstream.

I ran only `npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts`. All three tests failed on the missing behavior:

> `Tests: 3 failed, 3 total`  
> `error: "Unknown message type: list_conversations"`  
> `Received: "code": "INVALID_MESSAGE"` where `UNSUPPORTED` was expected.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}