Defined and pushed the `direct` acceptance contract in commit `32a338d`.

Added:

- Three red acceptance tests in `src/transport/conversationList.acceptance.test.ts`
- Traceability links in the WebSocket protocol spec
- `.lore/dod.md` with implementation facets and scope

Executed only the acceptance file. All three tests fail for the expected missing behavior:

```text
Expected valid: true
Received error: "Unknown message type: list_conversations"

Expected: ["conversation_list", "pong"]
Received: ["error", "pong"]

Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"

Tests: 3 failed, 3 total
```

The branch is merged with current `origin/main`, pushed, and matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}