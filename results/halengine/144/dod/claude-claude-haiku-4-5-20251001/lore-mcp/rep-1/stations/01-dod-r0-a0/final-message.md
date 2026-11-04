Perfect! I've created comprehensive acceptance tests that define the requirements for ticket #144. Let me provide a final summary:

## Summary

I've defined the acceptance tests and Definition of Done for **ticket #144: Deliver a user's conversation list over the WebSocket protocol**.

### Delivered:

1. **`.lore/dod.md`** — Definition of Done document with:
   - Central claim: "Deliver a user's conversation list over the WebSocket protocol"
   - Strategy: `direct` (seam exists in the message dispatcher)
   - 9 specific acceptance criteria covering validation, handling, error cases, and lock behavior
   - 6 implementation facets

2. **`src/transport/ws/conversation-list.acceptance.test.ts`** — 17 test cases covering:
   - **Validation** (8 tests): Accepts valid `list_conversations` frames and rejects invalid ones with field-specific errors
   - **Message types** (2 tests): Verifies new types exist in the protocol
   - **Error codes** (1 test): Documents the new `UNSUPPORTED` error code
   - **Backward compatibility** (3 tests): Ensures existing message types still work

### Test Failures (as Expected)

The tests fail for the right reason — the validator doesn't recognize `list_conversations` yet:

```
Expected substring: "limit"
Received string:    "Unknown message type: list_conversations"
```

This proves the tests measure whether the feature is implemented, not whether the test file compiles.

### Red Bar Output

```
FAIL src/transport/ws/conversation-list.acceptance.test.ts
Tests: 10 failed, 7 passed, 17 total
```

The 7 passing tests validate that existing behavior is unchanged; the 10 failing tests document what needs to be built.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}