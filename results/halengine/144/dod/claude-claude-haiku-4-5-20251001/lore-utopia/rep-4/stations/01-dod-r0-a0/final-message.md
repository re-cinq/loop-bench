Perfect! I have successfully created the acceptance tests for the conversation list feature. Let me show you the final test results:

## Summary

I've written **20 acceptance tests** for ticket #144 "Deliver a user's conversation list over the WebSocket protocol" in a new test file: `src/transport/ws/conversation-list.acceptance.test.ts`

### Test Coverage

The tests define DONE through observable behavior across 8 acceptance criteria:

1. **Message validation** — 8 tests verify `validateMessage` correctly accepts/rejects `list_conversations` frames with valid/invalid `limit` and `before` cursor parameters
2. **Handler delivery** — 10 tests verify the message handler:
   - Returns `conversation_list` frames with summaries as ISO strings, newest-first
   - Uses connection's `ws.userId`, ignoring any `userId` in the frame
   - Passes `limit` and `before` options to the store's `listFor` method
   - Returns `UNSUPPORTED` error when history is disabled
   - Returns `UNSUPPORTED` error when store has no `listFor` method
   - Returns `SERVER_ERROR` when store rejects, with no store details leaked
   - Answers `list_conversations` off the per-session lock (non-blocking)
3. **Message type immutability** — 2 tests verify `ConnectedMessage` is unchanged

### Test Results

**18 tests FAIL** (as required — the feature is not yet implemented):

```
FAIL src/transport/ws/conversation-list.acceptance.test.ts
Tests:       18 failed, 2 passed, 20 total
```

**Failures are for the right reasons:**
- `validateMessage({type: 'list_conversations'})` returns `{valid: false, error: 'Unknown message type: list_conversations'}` — message type not yet recognized
- Handler tests cannot find `conversation_list` frames because the message type doesn't exist
- Store's `listFor` is never called because the handler doesn't dispatch `list_conversations`
- No error frames with `UNSUPPORTED` code because `UNSUPPORTED` error code is not yet defined

### Deliverables

✅ Acceptance tests written in new file: `src/transport/ws/conversation-list.acceptance.test.ts`  
✅ Definition of Done recorded in: `.lore/dod.md` with strategy `direct`, 8 test citations, and facets for implementation  
✅ Both files formatted with prettier  
✅ Committed and pushed to `loop-bench/144`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}