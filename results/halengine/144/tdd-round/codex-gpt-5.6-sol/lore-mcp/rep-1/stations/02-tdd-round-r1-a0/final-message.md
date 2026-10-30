Completed and pushed one TDD round for `list_sessions` validation.

- Added one focused validator test, observed red, implemented validation, then restored green: 4/4 tests passed.
- Added spec traceability and corrected the acceptance-test line anchor.
- Updated `.lore/dod.md`.
- Commit: `f086a76`
- Branch is synchronized with its upstream and `origin/main`.
- Red tests this round: 1 ours, 0 regressions.
- Next facet: thread `sessionStore` into `createMessageHandler` and `createServer`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts"}}