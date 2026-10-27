Added and pushed direct acceptance tests in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/4e9c0111d591/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), plus `.lore/dod.md` and protocol anchors.

Command run:

```text
npm test -- --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

All 3 tests fail for the missing feature, including:

```text
Expected valid list_conversations
Received: "Unknown message type: list_conversations"
```

```text
Expected type "conversation_list"
Received: type "error"
```

```text
Expected code "UNSUPPORTED"
Received: code "INVALID_MESSAGE"
```

Committed and pushed as `806a40d`. Branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}