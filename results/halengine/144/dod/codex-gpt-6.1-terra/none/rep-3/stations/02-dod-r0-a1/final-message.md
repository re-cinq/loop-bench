The direct acceptance tests are committed and pushed in commit `25cfdc8`; the branch is up to date with its upstream. **The DoD is incomplete:** the tests do not yet cover listing during a streaming turn, store failures, or reconnecting from a listed conversation. Green tests would therefore not establish that the ticket is finished.

The three tests were run with:

```text
npm test -- --runInBand --runTestsByPath src/transport/conversationList.acceptance.test.ts
```

All three failed on the missing protocol behavior:

```text
Expected: valid: true
Received: error: "Unknown message type: list_conversations", valid: false

Expected: "conversation_list"
Received: "error"

Expected: "UNSUPPORTED"
Received: "INVALID_MESSAGE"
```

LORE_NODE_RESULT: {"outcome":"failed"}