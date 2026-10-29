I fixed the missing WebSocket list handler and the eight reported lint findings, then pushed commit `b611f09`. The acceptance test’s empty-list expectation was wrong: the ticket requires `UNSUPPORTED` when the store has no `listFor`.

CI’s exact `npm run test:coverage` command passes locally: 696 tests across 69 suites. I did not run lint, as instructed; CI will judge that check on the push. The branch is up to date with `main` and is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Conversation list frames had no handler; reported test lint findings were also fixed"}}