Added and pushed:

- `.lore/dod.md`
- `src/transport/ws/conversationList.acceptance.test.ts`
- Strategy: `direct`
- Commit: `6e2f656`

Ran only the acceptance file. It fails as intended:

- `Expected: valid: true; Received: valid: false`
- `Expected: "conversation_list"; Received: "error"`
- `Expected code: "UNSUPPORTED"; Received: "INVALID_MESSAGE"`

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}