Added and pushed commit `e310cc4`.

- Strategy: `direct`
- Acceptance tests: [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/4e9c0111d591/workspace/target/src/transport/ws/conversationList.acceptance.test.ts)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/4e9c0111d591/workspace/target/.lore/dod.md)
- Branch is synchronized with upstream (`0 0`).

Ran only:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

Actual failures include:

```text
Expected valid list_conversations
Received: { valid: false, error: "Unknown message type: list_conversations" }

Expected conversation_list
Received: error

Expected: "UNSUPPORTED"
Received: "INVALID_MESSAGE"
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}