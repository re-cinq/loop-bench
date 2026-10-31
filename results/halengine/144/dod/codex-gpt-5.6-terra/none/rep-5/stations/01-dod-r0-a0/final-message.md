Added and pushed red acceptance coverage in commit `1b1121b`.

- New test: `src/transport/conversationList.acceptance.test.ts`
- DoD: `.lore/dod.md`
- Protocol spec statements and test anchors added.

Ran only:

```text
npm test -- src/transport/conversationList.acceptance.test.ts
```

Actual red failure:

```text
Expected: valid list_conversations frame
Received: {"valid": false, "error": "Unknown message type: list_conversations"}
```

The WebSocket checks also show no list/store call and return `INVALID_MESSAGE` where `UNSUPPORTED` is required. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}