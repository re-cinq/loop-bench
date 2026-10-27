Added and pushed commit `84228a1`.

- Strategy: `direct`
- Tests: [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/fd7595096cf5/workspace/target/src/transport/conversationList.acceptance.test.ts)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/fd7595096cf5/workspace/target/.lore/dod.md)
- Command run: `npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

Actual failures include:

> `Unknown message type: list_conversations`

> Expected: `"u1"`; Received: `undefined`

> Expected `UNSUPPORTED`; Received `INVALID_MESSAGE`

Branch is pushed and up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}