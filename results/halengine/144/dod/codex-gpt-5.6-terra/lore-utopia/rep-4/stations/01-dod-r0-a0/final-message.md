Added and pushed commit `c30e70c` with the direct acceptance contract and DoD.

- New acceptance suite: [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/ca11094c8e0d/workspace/target/src/transport/conversationList.acceptance.test.ts)
- Traceability added to the WebSocket and conversation-list specs.
- DoD recorded in [.lore/dod.md](/var/tmp/loop-bench/runs/ca11094c8e0d/workspace/target/.lore/dod.md).

Ran only:

```text
npm test -- src/transport/conversationList.acceptance.test.ts
```

Actual red bar: `validateMessage` returns `"Unknown message type: list_conversations"`; WebSocket requests receive `INVALID_MESSAGE` instead of `conversation_list`, `UNSUPPORTED`, or `SERVER_ERROR`. All 4 acceptance cases fail for the missing feature.

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}