I committed and pushed three red acceptance tests with the `direct` strategy. The branch is up to date with `origin/main` and its upstream.

I ran only `src/transport/ws/conversationList.acceptance.test.ts`. All three tests fail because the server still rejects the requested frame:

> `Unknown message type: list_conversations`  
> Expected `conversation_list`; received `error` with code `INVALID_MESSAGE`.  
> Expected `UNSUPPORTED` when history is unavailable; received `INVALID_MESSAGE`.

The tests and next steps are recorded in [.lore/dod.md](/var/tmp/loop-bench/runs/1618afd2c365/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}