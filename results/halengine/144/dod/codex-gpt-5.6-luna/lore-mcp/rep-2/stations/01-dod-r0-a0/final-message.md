Added and pushed commit `7a7041e`.

Acceptance tests: `src/transport/ws/conversationList.acceptance.test.ts`

Command run:

```text
npm test -- --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

All 3 tests fail for the intended missing behavior:

- `Unknown message type: list_conversations`
- Expected `conversation_list`, received `undefined`
- Expected `UNSUPPORTED`, received `INVALID_MESSAGE`

Updated `.lore/dod.md` and protocol spec citations. Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}