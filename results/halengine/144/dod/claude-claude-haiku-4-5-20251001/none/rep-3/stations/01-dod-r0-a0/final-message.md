Perfect! I have successfully written acceptance tests for the conversation list feature. Here's the summary:

## Summary

I've written comprehensive acceptance tests that define DONE for ticket #144: "Deliver a user's conversation list over the WebSocket protocol."

### Test File Created
**`src/transport/ws/conversationList.acceptance.test.ts`**

This file contains 18 acceptance tests organized into two groups:

**Validation Tests (6 tests, all passing):**
- Validates `list_conversations` message structure
- Tests bounds checking on `limit` (must be 1-200)
- Tests `before` cursor format
- Verifies unknown fields are dropped

**Handler Tests (12 tests, all failing as expected):**
- Returns `conversation_list` frame with summaries when history is enabled
- Uses `ws.userId` instead of frame's `userId` field
- Passes `limit` and `before` parameters to store's `listFor` method
- Returns `UNSUPPORTED` error when history is disabled
- Returns `UNSUPPORTED` error when store lacks `listFor` method
- Returns `SERVER_ERROR` when `listFor` rejects
- Answers `list_conversations` immediately without blocking on per-session lock
- Does not send `stream_end` frames after conversation_list or error

### Definition of Done
**`.lore/dod.md`** documents the strategy (`direct` — message handler adds a case for `list_conversations` on the non-locked path) and lists the 9 passing test suites that define completion.

### Test Results
```
FAIL src/transport/ws/conversationList.acceptance.test.ts
Tests:       12 failed, 6 passed, 18 total
```

The 6 passing tests verify message validation structure. The 12 failing tests correctly fail because the features don't exist yet:
- Unknown message type error: `"Unknown message type: list_conversations"`
- Missing frame type error: `Expected: "conversation_list", Received: "error"`
- Missing error code: `Expected: undefined (UNSUPPORTED), Received: "INVALID_MESSAGE"`

All tests fail for the RIGHT REASON — the behavior is absent, not because of import/fixture issues. When the feature is implemented, these tests will pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}