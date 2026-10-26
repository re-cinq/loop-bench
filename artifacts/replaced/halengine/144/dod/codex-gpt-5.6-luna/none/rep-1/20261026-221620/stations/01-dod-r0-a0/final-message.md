Added and pushed:

- [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/1a6abc247b37/workspace/target/src/transport/ws/conversationList.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/1a6abc247b37/workspace/target/.lore/dod.md)

Strategy: `direct`. Acceptance run:

```text
Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

Key failures include:

```text
Expected valid: true
Received error: "Unknown message type: list_conversations"

Expected: "u1"
Received: undefined

Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

Committed as `159d51f`, pushed, merged with `origin/main`, and confirmed branch is synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}