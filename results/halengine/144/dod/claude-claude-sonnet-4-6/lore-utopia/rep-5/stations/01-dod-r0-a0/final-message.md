Branch is pushed and up to date. Here is the actual failure output from the 5 red tests:

```
FAIL src/transport/ws/conversationList.acceptance.test.ts

  ● validateMessage accepts {type: list_conversations} and rejects invalid limit/before values naming the field
    expect(received).toMatchObject(expected)
    - Expected - "valid": true,
    + Received + "valid": false,
    → validateMessage returns {valid: false, error: 'Unknown message type: list_conversations'}

  ● answers list_conversations with a conversation_list whose times are ISO strings, and no stream_end
    expect(received).toBeDefined()
    Received: undefined
    → no conversation_list frame is produced

  ● uses ws.userId for the list, ignoring any userId in the frame
    expect(spy.lastUserId).toBe('connecting-user')
    Received: undefined
    → listFor is never called

  ● answers UNSUPPORTED when history is not enabled in config
    expect(errorFrame!.code).toBe('UNSUPPORTED')
    Expected: 'UNSUPPORTED', Received: 'INVALID_MESSAGE'
    → list_conversations is an unknown type, not an implemented opt-out

  ● answers UNSUPPORTED when history is enabled but the store implements no listFor
    expect(errorFrame!.code).toBe('UNSUPPORTED')
    Expected: 'UNSUPPORTED', Received: 'INVALID_MESSAGE'

Tests: 5 failed, 5 total
```

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are real entry points today. The 5 tests pin: (1) the new frame type being validated, (2) the happy-path `conversation_list` delivery with ISO-string times and no `stream_end`, (3) the security invariant that the connection's `userId` is used even when the frame carries a foreign one, (4) the `UNSUPPORTED` error when `history` is off, and (5) the same `UNSUPPORTED` when the store has no `listFor`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}