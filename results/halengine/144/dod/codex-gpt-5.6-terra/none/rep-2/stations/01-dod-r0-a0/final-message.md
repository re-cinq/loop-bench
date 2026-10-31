Added and pushed the red acceptance contract.

- New suite: `src/transport/conversationList.acceptance.test.ts`
- DoD: `.lore/dod.md`
- Protocol spec statements and test citations added.
- Commit: `0e5635a test(transport): define conversation list acceptance`

Ran only:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

Actual failure: `Unknown message type: list_conversations`; enabled-history requests currently return `error` with `INVALID_MESSAGE` instead of `conversation_list` / `UNSUPPORTED`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}