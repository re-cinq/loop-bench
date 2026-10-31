Added and pushed red acceptance coverage in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/9fc0f08f43fc/workspace/target/src/transport/conversationList.acceptance.test.ts) with DoD in [.lore/dod.md](/var/tmp/loop-bench/runs/9fc0f08f43fc/workspace/target/.lore/dod.md). Protocol statements are cited in the WebSocket spec.

Ran only:

`npm test -- src/transport/conversationList.acceptance.test.ts`

Actual red failures include:

```text
Expected: "valid": true
Received: "valid": false
```

```text
Expected: "conversation_list"
Received: "error"
```

```text
Expected: "UNSUPPORTED"
Received: "INVALID_MESSAGE"
```

Committed as `188cdbb` and `ffe2016`, pushed, and confirmed the branch is synchronized with its upstream after merging `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}