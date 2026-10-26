Added and pushed:

- `.lore/dod.md`
- `src/transport/conversationList.acceptance.test.ts`

Ran:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand src/transport/conversationList.acceptance.test.ts
```

It fails for the intended missing behavior:

```text
Unknown message type: list_conversations
Received has value: undefined
Expected code: UNSUPPORTED
Received code: INVALID_MESSAGE
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}