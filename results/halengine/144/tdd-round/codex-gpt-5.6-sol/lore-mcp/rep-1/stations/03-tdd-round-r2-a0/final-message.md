Completed one TDD round and pushed commit `a5fc296`.

- Added one red-then-green handler test.
- Wired `sessionStore` through `createServer` into `createMessageHandler`.
- Implemented authenticated list dispatch with paging and ISO dates.
- Updated traceability and DoD facet.
- Focused test: 55 passed.
- Red tests introduced this round: 1; regressions: 0.
- Branch is synchronized with `origin/main` and upstream.

Next facet: error handling and `ws` logging for failed `listFor`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and wire it in createServer","tdd_next":"Handle list_sessions errors with ws logging and SERVER_ERROR"}}