Added and pushed red acceptance coverage in [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/dfa3bc04135a/workspace/target/src/transport/conversationList.acceptance.test.ts), with DoD in [.lore/dod.md](/var/tmp/loop-bench/runs/dfa3bc04135a/workspace/target/.lore/dod.md).

Ran the three tests individually. They fail for the missing behavior:

```text
Expected: type: "conversation_list"
Received: type: "error", code: "INVALID_MESSAGE",
message: "Unknown message type: list_conversations"
```

```text
Expected: valid list_conversations frame
Received: "Unknown message type: list_conversations"
```

```text
Expected: code "UNSUPPORTED"
Received: code "INVALID_MESSAGE"
```

Committed `09c4f50` and pushed. Branch is merged with `origin/main` and not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}