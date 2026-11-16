Branch is clean and pushed. Here's the summary of what was done and the actual failure output:

---

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are real entry points that can be called today. Five acceptance tests fail because the behavior (`list_conversations` handling) doesn't exist yet.

**File created:** `src/transport/ws/conversationList.acceptance.test.ts`

**Actual failure output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js --testPathPatterns="src/transport/ws/conversationList.acceptance.test.ts" --no-coverage`):

```
Tests:  5 failed, 5 total

● accepts list_conversations with no extra fields
  Expected {"valid": true}  Received {"valid": false}

● rejects list_conversations with limit 0, naming the field in the error
  Expected error: StringContaining "limit"  Received "Unknown message type: list_conversations"

● with history enabled answers list_conversations with a conversation_list of three ISO-string summaries, calling listFor with ws.userId not the frame field
  Expected: {calledWith: ['u1'], sent: [{type: 'conversation_list', conversations: [...]}]}
  Received: {calledWith: [],     sent: [{type: 'error', code: 'INVALID_MESSAGE', ...}]}

● with history absent answers list_conversations with an UNSUPPORTED error frame
  Expected: [{code: 'UNSUPPORTED', ...}]  Received: [{code: 'INVALID_MESSAGE', ...}]

● answers list_conversations before the in-flight stream_end when a user_message is streaming
  Expected array: ["conversation_list"] to contain "conversation_list"
  Received array: ["entry_upsert", "entry_upsert", "entry_delta", "error"]
```

Each failure is for the stated reason: the `list_conversations` message type is not handled. The spec sections 4.3 and 5.9 were added to `specs/hal-engine-websocket-protocol/spec.md` with a whole-file citation so the `require-spec-link` ESLint gate is satisfied.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}