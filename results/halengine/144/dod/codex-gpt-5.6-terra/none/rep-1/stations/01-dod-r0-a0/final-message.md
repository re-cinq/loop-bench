Added and pushed red acceptance coverage in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/9a90d8882b27/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), with DoD in [dod.md](/var/tmp/loop-bench/runs/9a90d8882b27/workspace/target/.lore/dod.md). Protocol and conversation-list spec statements now cite the tests.

Ran only:

```text
npm test -- src/transport/ws/conversationList.acceptance.test.ts
```

Actual red-bar excerpts:

```text
Expected valid: true
Received error: "Unknown message type: list_conversations"
```

```text
Expected: "conversation_list"
Received: "error"
```

```text
Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

Committed `54da9b9` (`test(transport): define conversation list acceptance`), pushed, merged against `origin/main` (already current), and confirmed the branch is not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}