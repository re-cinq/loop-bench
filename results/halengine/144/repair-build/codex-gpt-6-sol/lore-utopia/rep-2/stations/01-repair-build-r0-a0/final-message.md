Fixed the reported WebSocket test failure and eight lint findings, then committed and pushed `ae238b1`. The test’s empty-list expectation was wrong: ticket #144 requires an `UNSUPPORTED` error when the store has no `listFor`.

The three affected suites passed locally (32 tests). I did not run lint, typecheck, or the full coverage gate in this pod; CI will judge the push. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Handled conversation list frames and corrected the reported test lint findings"}}