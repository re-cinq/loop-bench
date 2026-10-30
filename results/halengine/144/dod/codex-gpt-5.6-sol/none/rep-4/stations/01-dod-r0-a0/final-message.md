Defined and pushed the `direct` acceptance-test contract in commit `86bb66e`.

New tests: `src/transport/conversationList.acceptance.test.ts`

Command run:

`npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

Actual result: 3 tests failed as intended:

- `Unknown message type: list_conversations`
- Expected `conversation_list`, received `error`
- Expected `UNSUPPORTED`, received `INVALID_MESSAGE`

The protocol spec now links each statement to its acceptance test, and `.lore/dod.md` records the strategy and implementation facets. Branch is up to date with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}