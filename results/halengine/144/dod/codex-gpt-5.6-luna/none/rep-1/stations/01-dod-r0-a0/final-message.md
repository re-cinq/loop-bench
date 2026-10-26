Added and pushed commit `ef2df4c`.

- Strategy: `direct`
- Acceptance tests: [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/1a6abc247b37/workspace/target/src/transport/ws/conversationList.acceptance.test.ts)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/1a6abc247b37/workspace/target/.lore/dod.md)
- Updated protocol spec citations.
- Ran formatter and only the acceptance test file.
- Branch is synchronized with upstream.

Failure evidence:

```text
Expected valid: true
Received: valid: false, error: "Unknown message type: list_conversations"

Expected: "conversation_list"
Received: "error"
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}