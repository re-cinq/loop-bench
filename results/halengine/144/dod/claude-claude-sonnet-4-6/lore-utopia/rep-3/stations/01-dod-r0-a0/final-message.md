Branch is current. Here's the actual failure output from running the 4 acceptance tests:

```
FAIL src/transport/ws/conversationList.acceptance.test.ts

  ● validateMessage accepts list_conversations with no extra fields ...
    expect(received).toMatchObject({valid: true})
    - Expected: "valid": true
    + Received: "valid": false
    (Unknown message type: list_conversations)

  ● answers list_conversations with the connecting user's conversations ...
    expect(received).toHaveLength(1)
    Expected length: 1, Received length: 0 (no conversation_list frames sent)

  ● answers list_conversations with UNSUPPORTED when history is not enabled ...
    Expected: "UNSUPPORTED"
    Received: "INVALID_MESSAGE"

  ● answers list_conversations immediately while streaming ...
    expect(received).toContain("conversation_list")
    Received: ["entry_upsert","entry_upsert","entry_delta","error"]

Tests: 4 failed, 4 total
```

**Strategy: `direct`** — the entry points (`validateMessage` and `createMessageHandler`) exist today; the tests call them and fail because `list_conversations` is entirely unimplemented.

**What the 4 tests pin:**
1. `validateMessage` accepts the bare frame and rejects out-of-range `limit` and non-cursor `before`, naming the field
2. With `history:{enabled:true}`, the handler returns a `conversation_list` frame with the connecting user's sessions (ISO strings, not Dates), ignoring any `userId` field in the frame itself
3. Without history enabled — or with a store that has no `listFor` — the answer is `error UNSUPPORTED`, never `conversation_list`
4. `list_conversations` is answered immediately, before a concurrent turn's `stream_end` (off the per-session lock)

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}