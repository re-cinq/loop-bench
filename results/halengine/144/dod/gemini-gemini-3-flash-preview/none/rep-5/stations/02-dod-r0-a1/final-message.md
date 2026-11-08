I have defined the **Definition of Done** for ticket #144 by consolidating and refining the acceptance tests into a new, comprehensive file: `src/transport/ws/ConversationList.acceptance.test.ts`.

The tests cover the following requirements:
- **Protocol Stability:** Ensures existing message types still compile and new types are correctly defined.
- **Protocol Validation:** Validates `list_conversations` frames, including `limit` and `before` cursor constraints.
- **Delivery and Authorization:** Verifies that the conversation list is delivered newest activity first, uses the connection's authenticated `userId` (ignoring any `userId` in the frame), and returns summaries with ISO-formatted timestamps.
- **Feature Gating and Error Handling:** Handles cases where history is disabled, the store does not support listing, or the store encounters errors (including `StoreCannotList`).
- **Concurrency:** Confirms that `list_conversations` is answered immediately even while a `user_message` is streaming.
- **End-to-end Reconnection:** Exercises the #45 path to ensure a `sessionId` from a list can be used to resume a conversation.

I have also updated `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` with the new file path and accurate line number anchors.

### Strategy: `direct`
A seam exists in `createMessageHandler` which takes a session store and an orchestrator. The acceptance tests mock the store's `listFor` and verify the WebSocket frames delivered over the transport.

### Acceptance Test Failure Output
```text
FAIL src/transport/ws/ConversationList.acceptance.test.ts (5.335 s)
  ● Conversation List Acceptance › Protocol Validation › accepts valid list_conversations frame
    expect(received).toEqual(expected) // deep equality
    - Expected  - 4
    + Received  + 2
      Object {
    -   "data": Object {
    -     "type": "list_conversations",
    -   },
    -   "valid": true,
    +   "error": "Unknown message type: list_conversations",
    +   "valid": false,
      }

  ● Conversation List Acceptance › Delivery and Authorization › delivers conversation list newest first when history is enabled
    expect(received).toEqual(expected) // deep equality
    - Expected  - 15
    + Received  +  3
      Object {
    -   "conversations": Array [ ... ],
    -   "type": "conversation_list",
    +   "code": "INVALID_MESSAGE",
    +   "message": "Unknown message type: list_conversations",
    +   "type": "error",
      }

  ● Conversation List Acceptance › Concurrency › answers list_conversations immediately even while user_message is streaming
    expect(received).toContain(expected) // indexOf
    Expected value: "conversation_list"
    Received array: ["error", "entry_upsert"]

  ● Conversation List Acceptance › End-to-end Reconnection › allows reconnecting with a sessionId from a conversation_list
    thrown: "Exceeded timeout of 5000 ms for a test."
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}