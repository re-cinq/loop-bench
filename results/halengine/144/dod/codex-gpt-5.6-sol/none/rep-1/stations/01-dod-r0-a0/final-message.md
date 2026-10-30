Defined and pushed the acceptance contract using the `direct` strategy.

- Added four real WebSocket acceptance tests.
- Added protocol-spec traceability links.
- Added `.lore/dod.md`.
- Commit: `e7244f8`
- Branch is synchronized with `origin/loop-bench/144`.

Test command:

`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

Expected red-bar output:

```text
FAIL src/transport/conversationList.acceptance.test.ts
Tests: 4 failed, 4 total

"Unknown message type: list_conversations"
Expected "conversation_list", received "error"
Expected code "UNSUPPORTED", received "INVALID_MESSAGE"
Expected "conversation_list", received "error"
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}