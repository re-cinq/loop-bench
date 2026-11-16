Branch is up to date. Here's what was delivered:

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are callable functions; tests exercise them directly.

**New file**: `src/transport/ws/conversationList.acceptance.test.ts`

**10 red tests across 2 describes** (all failing for the right reason — the behaviour is absent):

**validateMessage** (6 tests):
- `accepts list_conversations with no optional fields` → fails: `{valid: false, error: 'Unknown message type: list_conversations'}` instead of `{valid: true, ...}`
- 5 × invalid-field tests → fail: error says `"Unknown message type: ..."` instead of naming `limit`/`before`

**handler** (4 tests):
- `answers with conversation_list…` → `listFrame` is `undefined` (gets `error INVALID_MESSAGE` instead)
- `calls listFor with the connection userId…` → `listFor` was never called (0 calls)
- `answers with error code UNSUPPORTED…` → code is `"INVALID_MESSAGE"`, not `"UNSUPPORTED"`
- `answers list_conversations before stream_end…` → frames before gate release are `["entry_upsert", "entry_upsert", "entry_delta", "error"]`, no `"conversation_list"`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}