Implemented and pushed `ebc63a0`.

- Added and exported list-session wire types.
- Added `list_sessions` validation with cursor checks and forged-field stripping.
- Added one red-green unit test; it passes.
- Updated traceability and marked two DoD facets complete.
- Regression tests: 0; tests authored this round: 1.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add and validate list_sessions protocol frames","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}