Implemented and pushed commit `c05cfc4`.

- Closed: thread `sessionStore` through `createMessageHandler` and `createServer`.
- Added one focused test; observed 1 intended red test and 0 regressions. It now passes.
- Repaired visible prior-round unit/production lint findings.
- Did not run acceptance tests, lint, typecheck, or full suite.
- Branch is synchronized with `origin/main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and wire it in createServer","tdd_next":"Handle list_sessions in src/transport/ws/messageHandler.ts"}}