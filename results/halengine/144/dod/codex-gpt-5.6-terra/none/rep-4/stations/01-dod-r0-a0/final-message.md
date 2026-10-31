Added and pushed red acceptance coverage plus DoD: [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/661393cbbfa7/workspace/target/src/transport/conversationList.acceptance.test.ts:44) and [.lore/dod.md](/var/tmp/loop-bench/runs/661393cbbfa7/workspace/target/.lore/dod.md:1). No production code changed.

Ran:

```text
npm test -- src/transport/conversationList.acceptance.test.ts
```

Actual failures include:

```text
Expected: valid: true
Received: error: "Unknown message type: list_conversations", valid: false
```

```text
Expected: {"type":"error","code":"UNSUPPORTED"}
Received: {"type":"error","code":"INVALID_MESSAGE","message":"Unknown message type: list_conversations"}
```

Committed as `44d601b` and pushed; branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}