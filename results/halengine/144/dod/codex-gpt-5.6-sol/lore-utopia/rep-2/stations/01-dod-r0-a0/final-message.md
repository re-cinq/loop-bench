Implemented and pushed executable acceptance criteria using the `direct` strategy.

- Added five red acceptance tests in `src/transport/conversationList.acceptance.test.ts`.
- Added traceability statements to the WebSocket protocol spec.
- Added `.lore/dod.md`.
- Commit: `c2b0310`
- Branch is synchronized with `origin/loop-bench/144` and `origin/main`.

Test command:

```text
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual result:

```text
FAIL src/transport/conversationList.acceptance.test.ts
Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

The central failure is consistently the missing behavior:

```text
Expected: "conversation_list"
Received: "error"

Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"

"Unknown message type: list_conversations"
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}