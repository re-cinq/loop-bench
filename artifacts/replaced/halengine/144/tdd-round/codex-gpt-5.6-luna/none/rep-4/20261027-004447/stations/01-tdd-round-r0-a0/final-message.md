Implemented and pushed one TDD round:

- Added session-list message types and exports.
- Added `list_sessions` validation with cursor checks and unknown-field stripping.
- Added focused validator test.
- Test passed; formatted changed files.
- Commit: `23b7daa`
- Branch is synced with upstream.
- Acceptance tests remain for the next facets; no regressions observed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"session-list message types and list_sessions validation","tdd_next":"thread sessionStore into the WebSocket message handler"}}