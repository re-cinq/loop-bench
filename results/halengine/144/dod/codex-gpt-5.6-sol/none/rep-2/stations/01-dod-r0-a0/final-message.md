Defined and pushed the `direct` acceptance-test contract in commit `b1a5b58`.

Added:

- Three red WebSocket acceptance tests
- `.lore/dod.md`
- Protocol-spec traceability links

Ran only:

`npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

Actual failures:

- `Unknown message type: list_conversations`
- Expected `conversation_list`; received none, and `listFor` was never called
- Expected exported `StoreCannotList`; received `undefined`

All 3 tests failed for the ticket’s missing behavior. The branch is merged with `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}