Defined and pushed the ticket’s acceptance contract using the `direct` strategy.

Added:

- Three red WebSocket acceptance tests
- Traceability statements in the WebSocket protocol spec
- `.lore/dod.md` with implementation facets and scope
- Commit `20d76be`

Isolated command run:

```text
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual failure summary:

```text
FAIL src/transport/conversationList.acceptance.test.ts

Expected: valid list_conversations frame
Received: { valid: false, error: "Unknown message type: list_conversations" }

Expected: "conversation_list"
Received: "error"

Expected error code: "UNSUPPORTED"
Received error code: "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The branch is merged with current `origin/main`, pushed, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}