Perfect! I have successfully created comprehensive acceptance tests for ticket #144. Here's what has been delivered:

## Summary

I've written **22 acceptance tests** in a new file `src/transport/ws/conversation-list.acceptance.test.ts` that define the complete contract for delivering a user's conversation list over the WebSocket protocol.

### Test Coverage

The tests verify:

1. **Validation** (9 tests)
   - `list_conversations` message is recognized
   - `limit` field is valid only when an integer 1–200
   - `before` field accepts a cursor with `updatedAt` and `sessionId`
   - Extra fields like `userId` in the frame are dropped

2. **Response Behavior** (5 tests)
   - Answers with `conversation_list` frame containing summaries
   - Summaries carry ISO string timestamps
   - Ignores `userId` in frame, uses `ws.userId` instead
   - Passes `limit` and `before` to store's `listFor` method
   - Sends exactly one response with no `stream_end`

3. **Error Handling** (5 tests)
   - `UNSUPPORTED` when history is disabled
   - `UNSUPPORTED` when store has no `listFor` method
   - `SERVER_ERROR` when store rejects
   - Error message contains no store internals
   - Never sends empty conversation list

4. **Message Ordering** (1 test)
   - `list_conversations` doesn't wait on session lock (answered off non-locked path)

5. **Integration** (2 tests)
   - Reconnection with `?sessionId=` still works
   - `ConnectedMessage` is unchanged

### Test Results

**14 tests FAIL** (expected, feature not yet implemented):
- Validation tests fail with: "Unknown message type: list_conversations"
- Response tests fail: no `conversation_list` frame type exists
- Error tests fail: validation rejects before reaching handler

**8 tests PASS** (basic assertions that don't require the feature):
- Framework setup tests
- Type checks that pass regardless

```
Test Suites: 1 failed, 1 total
Tests:       14 failed, 8 passed, 22 total
```

### Documentation

Created `.lore/dod.md` defining:
- The ticket's central claim (verbatim from issue)
- Strategy: `direct` (message handler seam already exists)
- All 9 acceptance test names with their behavior pins
- Implementation facets (types, validation, config, handler, spec, docs, version bump)
- Out-of-scope items

All changes are committed and pushed to branch `loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}