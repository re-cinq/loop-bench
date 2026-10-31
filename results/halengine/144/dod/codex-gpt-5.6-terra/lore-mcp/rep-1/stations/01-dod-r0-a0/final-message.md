Added and pushed the red acceptance contract in commit `7e30977`.

Ran:

```text
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Actual failure:

```text
Expected: type: "conversation_list" and listCalls: [{userId: "u1", ...}]
Received: type: "error", code: "INVALID_MESSAGE",
message: "Unknown message type: list_conversations"
```

The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}