I have defined the acceptance tests for delivering a user's conversation list over the WebSocket protocol. The strategy is `direct`, exercising the protocol frames through a mock WebSocket and a `ChatSession` backed by an `InMemorySessionStore`.

I extended `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` to include the protocol details and implementation constraints (such as the `transport.history` opt-in and the `UNSUPPORTED` error code). All five acceptance tests fail as expected because the `list_conversations` frame is currently unrecognized and rejected with `INVALID_MESSAGE`.

### Acceptance Test Failure Output

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● Conversation list acceptance tests › answers the user's conversations newest first (specs/hal-engine-websocket-protocol/spec.md#5.9)
    - Expected  - 1
    + Received  + 1
      Array [
    -   "conversation_list 3 summaries",
    +   "error INVALID_MESSAGE",
      ]

  ● Conversation list acceptance tests › answers the connecting user's own conversations even when the frame names another user (specs/hal-engine-websocket-protocol/spec.md#4.3)
    - Expected  - 1
    + Received  + 1
      Array [
    -   "conversation_list 1 summaries",
    +   "error INVALID_MESSAGE",
      ]

  ● Conversation list acceptance tests › refuses the frame when history is disabled (specs/hal-engine-conversation-list/spec.md)
    - Expected  - 1
    + Received  + 1
      Array [
    -   "error UNSUPPORTED",
    +   "error INVALID_MESSAGE",
      ]

  ● Conversation list acceptance tests › answers UNSUPPORTED when the store cannot list (specs/hal-engine-conversation-list/spec.md)
    - Expected  - 1
    + Received  + 1
      Array [
    -   "error UNSUPPORTED",
    +   "error INVALID_MESSAGE",
      ]

  ● Conversation list acceptance tests › answers a list in the middle of a streaming turn, before that turn ends (specs/hal-engine-websocket-protocol/spec.md#5.9)
    Expected value: "conversation_list 0 summaries"
    Received array: ["error INVALID_MESSAGE", "entry_upsert"]
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}