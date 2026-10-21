Added three direct acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/b92aeb4f35c1/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), documented their protocol statements, and recorded the triage in [.lore/dod.md](/var/tmp/loop-bench/runs/b92aeb4f35c1/workspace/target/.lore/dod.md).

All three tests fail for the missing list protocol. For example:

> `Expected: "conversation_list"`  
> `Received: "error"`

The validator also reports `Unknown message type: list_conversations`; disabled history returns `INVALID_MESSAGE` instead of `UNSUPPORTED`.

Committed as `39626d2` (`Add conversation list acceptance tests`), pushed, and merged with `origin/main` (already up to date). The branch is synced with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}