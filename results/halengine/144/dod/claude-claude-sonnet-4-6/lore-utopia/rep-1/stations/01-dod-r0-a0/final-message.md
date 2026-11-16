Branch is up to date. Here's the actual failure output from the test run:

```
FAIL src/transport/ws/conversationList.acceptance.test.ts
  ● accepts a bare list_conversations frame and rejects each invalid variant…
    Expected: { valid: true }
    Received: { valid: false }   ← validator returns "Unknown message type: list_conversations"

  ● answers list_conversations with ISO-string summaries newest-first
    expect(list).toBeDefined()
    Received: undefined          ← no conversation_list frame sent

  ● calls listFor with the socket userId when the frame carries another user id
    Expected: listForSpy called with "u1"
    Number of calls: 0           ← handler never calls listFor

  ● answers UNSUPPORTED when history is not enabled or store has no listFor
    Expected: { type: "error", code: "UNSUPPORTED" }
    Received: { code: "INVALID_MESSAGE" }   ← validator refuses the type first

  ● answers list_conversations before the running turn's stream_end
    Expected: beforeRelease to contain "conversation_list"
    Received: ["entry_upsert","entry_upsert","entry_delta","error"]   ← INVALID_MESSAGE, not list
```

All 5 fail because the behavior is absent — not because of import errors or fixture problems.

**Strategy: `direct`**. The seam exists: `validateMessage` and `createMessageHandler` are the real entry points. The tests are in `src/transport/ws/conversationList.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}