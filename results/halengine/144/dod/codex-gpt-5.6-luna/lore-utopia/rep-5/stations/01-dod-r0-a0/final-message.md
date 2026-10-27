Added and pushed commit `aa422c5` with:

- Three acceptance tests in `src/transport/conversationList.acceptance.test.ts`
- `.lore/dod.md` using `direct` strategy
- Protocol spec statements and traceability links

Ran only:

```text
npm test -- --runInBand src/transport/conversationList.acceptance.test.ts
```

All three fail for the missing feature:

```text
Expected: "conversation_list"
Received: "error"

Expected: "UNSUPPORTED"
Received: "INVALID_MESSAGE"

error: "Unknown message type: list_conversations"
```

Branch is pushed and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}