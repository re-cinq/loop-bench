Added and pushed commit `6facd89` with:

- Three acceptance tests in `src/transport/conversationList.acceptance.test.ts`
- Traceability updates to the WebSocket spec
- `.lore/dod.md` using strategy `direct`

Ran only:

```text
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

All three fail for the missing feature:

```text
Unknown message type: list_conversations
Expected conversation_list, received error
Expected code UNSUPPORTED, received INVALID_MESSAGE
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}