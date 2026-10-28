Added three acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/cfca8a77dc95/workspace/target/src/transport/ws/conversationList.acceptance.test.ts) and recorded the direct strategy in [.lore/dod.md](/var/tmp/loop-bench/runs/cfca8a77dc95/workspace/target/.lore/dod.md).

Ran only the acceptance-test file. All three tests fail on the missing list-frame support:

> Expected: `"conversation_list"`  
> Received: `"error"`

> Expected: `valid: true`  
> Received: `valid: false`

> Expected: `"UNSUPPORTED"`  
> Received: `"INVALID_MESSAGE"`

Committed and pushed as `74fe999`. `origin/main` was already merged, and the branch is synced with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}