I have defined the Definition of Done for ticket #144 by writing five executable acceptance tests in a new test file, extending the relevant specifications with testable statements, and linking them to the new tests.

The tests observe the behavior of `createMessageHandler` when receiving `list_conversations` frames, verifying that:
1. It returns the conversation list when enabled.
2. It returns an `UNSUPPORTED` error when disabled or when the store lacks listing capabilities.
3. It respects the authenticated user's identity, ignoring any `userId` provided in the frame.
4. It is answered immediately (off-lock) even while a `user_message` is streaming.

I have updated `specs/hal-engine-websocket-protocol/spec.md` with sections for the new frames and error codes, and added a section to `specs/hal-engine-conversation-list/spec.md` regarding WebSocket delivery. All specification links have been verified and re-anchored.

The tests currently fail with `INVALID_MESSAGE` because the `list_conversations` type is not yet recognized by the validator or the message handler, as shown in the output below:

```text
FAIL src/transport/ws/conversationList.acceptance.test.ts
  ● conversation list acceptance › returns a conversation list when history is enabled

    expect(received).toContainEqual(expected) // deep equality

    Expected value: ObjectContaining {"conversations": ArrayContaining [ObjectContaining {"sessionId": "c1"}], "type": "conversation_list"}
    Received array: [{"code": "INVALID_MESSAGE", "message": "Unknown message type: list_conversations", "type": "error"}]

  ● conversation list acceptance › returns UNSUPPORTED error when history is disabled

    expect(received).toContainEqual(expected) // deep equality

    Expected value: ObjectContaining {"code": "UNSUPPORTED", "type": "error"}
    Received array: [{"code": "INVALID_MESSAGE", "message": "Unknown message type: list_conversations", "type": "error"}]

  ● conversation list acceptance › returns UNSUPPORTED error when store cannot list

    expect(received).toContainEqual(expected) // deep equality

    Expected value: ObjectContaining {"code": "UNSUPPORTED", "type": "error"}
    Received array: [{"code": "INVALID_MESSAGE", "message": "Unknown message type: list_conversations", "type": "error"}]

  ● conversation list acceptance › returns list for authenticated user ignoring userId in frame

    expect(received).toBeDefined()

    Received: undefined

  ● conversation list acceptance › is answered immediately even if a user_message is streaming

    expect(received).toContain(expected) // indexOf

    Expected value: "conversation_list"
    Received array: ["error", "entry_upsert"]
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}