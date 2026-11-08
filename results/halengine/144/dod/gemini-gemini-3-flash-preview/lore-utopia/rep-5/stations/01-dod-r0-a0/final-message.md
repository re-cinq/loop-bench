I have defined the **Definition of Done** for ticket #144 by writing seven executable acceptance tests that establish a verified "Red" bar. These tests cover the protocol changes, frame validation rules, and handler logic required to deliver a user's conversation list over WebSocket.

### Triage
- **Strategy:** `direct`
- **Seams:** The tests utilize the existing `validateMessage` and `createMessageHandler` entry points, calling them with real values to observe missing behavior.

### Acceptance tests
All tests were run and failed as expected, confirming the absence of the feature:
- `src/types/messages.acceptance.test.ts` (Failed: Type definitions for `list_conversations` and `conversation_list` are missing).
- `src/transport/ws/validation.acceptance.test.ts` (Failed: `list_conversations` is an unknown message type).
- `src/transport/ws/messageHandler.acceptance.test.ts` (Failed: Handler does not process the new message, lacks `UNSUPPORTED` error, and does not bypass the session lock).

### Failure Output (from `validation.acceptance.test.ts`)
```text
FAIL src/transport/ws/validation.acceptance.test.ts
  ● conversation list frame validation › accepts a minimal list_conversations message
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

The tests have been formatted, committed, and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}