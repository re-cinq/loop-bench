Defined and pushed the `direct` acceptance-test contract in commit `3f4c4e0`.

Added:

- `src/transport/conversationList.acceptance.test.ts`
- `.lore/dod.md`
- Traceability statements in the WebSocket protocol spec

Ran only the acceptance file. All three tests failed for the intended missing behavior:

```text
Expected valid: true
Received error: "Unknown message type: list_conversations"

Expected: "conversation_list"
Received: "error"

Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The branch is merged with `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}