I have defined the **Definition of Done** for ticket #144 by writing 8 acceptance tests that fail on absent behavior today. These tests verify the new `list_conversations` frame, its validation, the `conversation_list` response, and the non-locked handling path.

### Triage: `direct`
A seam exists in the WebSocket message handler and server configuration. The acceptance tests call the real entry point (WebSocket server) and fail because the `list_conversations` message type is unknown and the feature is not yet implemented.

### Acceptance tests
The tests in `src/transport/ws/conversationList.acceptance.test.ts` fail as expected:

```text
FAIL src/transport/ws/conversationList.acceptance.test.ts
  ● conversation list acceptance tests › accepts a valid list_conversations frame
    expect(received).toEqual(expected)
    - Expected  - 9
    + Received  + 3
      Object {
    -   "conversations": Array [ ... ],
    -   "type": "conversation_list",
    +   "code": "INVALID_MESSAGE",
    +   "message": "Unknown message type: list_conversations",
    +   "type": "error",
      }

  ● conversation list acceptance tests › accepts list_conversations with valid limit and before
    Expected: "u1", {"before": { ... }, "limit": 10}
    Number of calls: 0

  ● conversation list acceptance tests › answers with UNSUPPORTED when history is disabled
    Expected: "UNSUPPORTED"
    Received: "INVALID_MESSAGE"

  ● conversation list acceptance tests › answers list_conversations immediately even if a user_message is running
    thrown: "Exceeded timeout of 5000 ms for a test."
```

I have also updated `specs/hal-engine-websocket-protocol/spec.md` with traceability links to the specific lines in the new test file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}