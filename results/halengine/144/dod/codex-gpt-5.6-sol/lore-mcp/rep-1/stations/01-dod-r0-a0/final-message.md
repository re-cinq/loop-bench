Defined and pushed the ticket’s executable DoD using the `direct` strategy.

Added:

- 3 red acceptance tests in `src/transport/conversationList.acceptance.test.ts`
- `.lore/dod.md`
- Traceability links in the WebSocket protocol spec

The focused test command was:

```text
npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand
```

Actual failures:

```text
Expected: valid: true
Received: valid: false
error: "Unknown message type: list_conversations"
```

```text
Expected: "conversation_list"
Received: "error"
```

```text
Expected code: "UNSUPPORTED"
Received code: "INVALID_MESSAGE"
```

All 3 tests failed for the ticket’s stated missing behavior. Commit `4abb81f` is pushed, merged with current `origin/main`, and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}