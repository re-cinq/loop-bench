Added and pushed:

- `.lore/dod.md`
- `src/transport/ws/conversationList.acceptance.test.ts`

Ran only:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

Result: 3 tests failed as intended. Key failures:

```text
Expected: { valid: true, data: { type: "list_conversations" } }
Received: { valid: false, error: "Unknown message type: list_conversations" }

Expected: "conversation_list"
Received: "error"

Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

Commit `d2a606f` is pushed; branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}