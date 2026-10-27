Added and pushed acceptance tests in:

- [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/d308d428197f/workspace/target/src/transport/ws/conversationList.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/d308d428197f/workspace/target/.lore/dod.md)

Strategy: `direct`. Tests were run with:

```text
npm test -- --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

All three fail for the missing feature, including:

```text
Unknown message type: list_conversations
Expected: "conversation_list"
Received: "error"
Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

Commit `bfc8992` is pushed; branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}