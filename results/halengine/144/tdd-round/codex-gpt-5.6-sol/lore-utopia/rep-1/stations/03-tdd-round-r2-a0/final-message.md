Implemented and pushed commit `3bb714b`.

- Added session-store wiring and authenticated-user list dispatch.
- Added one focused test; observed red, then green after implementation/refactor.
- Repaired prior validator/type-test lint findings without modifying acceptance tests.
- Updated traceability and `.lore/dod.md`.
- Red tests: 1 written this round, 0 regressions.
- Branch is synchronized with `origin/loop-bench/144` and current with `origin/main`.

Next facet: complete list handling, including WebSocket error logging and `SERVER_ERROR`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and wire it in createServer","tdd_next":"Handle list_sessions success and error responses in messageHandler"}}