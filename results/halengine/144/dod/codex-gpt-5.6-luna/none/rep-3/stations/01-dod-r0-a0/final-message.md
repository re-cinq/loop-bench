Implemented and pushed direct-strategy acceptance tests plus `.lore/dod.md`.

Acceptance command:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand src/transport/ws/conversationList.acceptance.test.ts
```

Result: 4 tests failed as intended. Key failures include:

- `Unknown message type: list_conversations`
- Expected `listFor` call, received `[]`
- Expected `UNSUPPORTED`, received `INVALID_MESSAGE`

Commit `f2fe90b` is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}