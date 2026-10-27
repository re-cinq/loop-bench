Added and pushed three red acceptance tests using the `direct` strategy.

Command run:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversation-list.acceptance.test.ts --runInBand
```

All 3 fail for the missing feature:

- `Unknown message type: list_conversations`
- Expected `conversation_list`, received `error`
- Expected `UNSUPPORTED`, received `INVALID_MESSAGE`

Commit: `f669f8d`

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}