Completed and pushed commit `7c575a2`.

- Added session-list protocol types and exports.
- Wired `SessionStore` into WebSocket handling.
- Implemented authenticated session listing, ISO date serialization, empty fallback, and safe error responses/logging.
- Fixed all reported lint and trace-link findings.
- Added one focused test: red once, then green after implementation.
- Tests run: 1 focused test; 1 passed. Acceptance tests were not run.
- Red tests: 1 ours, 0 regressions.
- Branch is merged with `origin/main`, pushed, and synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Answer list_sessions through the authenticated WebSocket session store","tdd_next":"Document list_sessions and session_list in both protocol specs"}}