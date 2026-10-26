Added and pushed commit `634b26d` with:

- Three acceptance tests in `src/transport/ws/conversation-list.acceptance.test.ts`
- `.lore/dod.md`
- WebSocket spec traceability links

Strategy: `direct`.

Tests run:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/ws/conversation-list.acceptance.test.ts --runInBand
```

All 3 tests fail for the missing feature:

```text
Expected valid list_conversations, received:
{ valid: false, error: "Unknown message type: list_conversations" }

expected conversation_list, received error INVALID_MESSAGE

Expected code "UNSUPPORTED", received "INVALID_MESSAGE"
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}