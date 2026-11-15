## Summary

I have defined the acceptance criteria for ticket #144 "Deliver a user's conversation list over the WebSocket protocol" as a failing test suite.

### Test file: `src/transport/ws/list-conversations.acceptance.test.ts`

The test suite covers the core acceptance criteria:

1. **Message validation** — Tests that `validateMessage` accepts `list_conversations` with valid `limit` (1–200) and `before` (ISO cursor) parameters, and rejects invalid values with field-specific error messages

2. **Response frame shape** — Test documents that `conversation_list` frames must carry an array of conversation summaries with `createdAt` and `updatedAt` as ISO strings

3. **Error codes** — Test documents that `UNSUPPORTED` error code must exist for missing `listFor` or disabled history

### Current test failures

All 9 validation tests are failing with the same root cause:

```
Expected substring: "limit"
Received string:    "Unknown message type: list_conversations"
```

This is the correct failure mode: the validator doesn't recognize the new message type yet. The red bar proves the behavior is missing.

The tests exercise the real entry point (`validateMessage`) and define what must be implemented. When the implementation adds `list_conversations` to the message validator and type system, these tests will pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}