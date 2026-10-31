Added and pushed red acceptance coverage in commit `10da3d8`.

- New real-WebSocket acceptance suite: `src/transport/conversationList.acceptance.test.ts`
- Added cited protocol and conversation-list spec statements.
- Recorded direct-strategy DoD in `.lore/dod.md`.

Ran:

```text
npm test -- src/transport/conversationList.acceptance.test.ts
```

Actual failure includes:

```text
Expected: {"valid": true, "data": {"type": "list_conversations"}}
Received: {"valid": false, "error": "Unknown message type: list_conversations"}
```

and the enabled-history socket flow receives:

```text
{"type":"error","code":"INVALID_MESSAGE","message":"Unknown message type: list_conversations"}
```

instead of `conversation_list`; disabled history likewise returns `INVALID_MESSAGE` rather than `UNSUPPORTED`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}