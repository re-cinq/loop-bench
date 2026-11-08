I have defined "DONE" for ticket #144 by writing a suite of 10 acceptance tests that verify the new WebSocket protocol frames for conversation listing, their validation, and their handling (including opt-in configuration, user ID isolation, and out-of-band execution). I have also updated the protocol specification with the new frame definitions and test citations.

### Strategy: `direct`
The tests exercise the `validateMessage` and `createMessageHandler` entry points directly. They verify that the transport layer correctly interacts with the `SessionStore.listFor` method and respects the `transport.history.enabled` configuration.

### Acceptance tests
All tests failed as expected with the message `"Unknown message type: list_conversations"`, confirming that the behavior is currently absent.

```text
FAIL src/transport/ws/conversationList.acceptance.test.ts
  ● Conversation List Acceptance Tests › Validation › accepts list_conversations and returns the typed frame
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
```

### Changes
- **New Test File**: `src/transport/ws/conversationList.acceptance.test.ts` containing 10 tests.
- **Spec Update**: `specs/hal-engine-websocket-protocol/spec.md` updated with sections 4.3 (`list_conversations`) and 5.9 (`conversation_list`), new error code `UNSUPPORTED`, and requirement citations.
- **Definition of Done**: Created `.lore/dod.md` mapping the criteria to the new tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}