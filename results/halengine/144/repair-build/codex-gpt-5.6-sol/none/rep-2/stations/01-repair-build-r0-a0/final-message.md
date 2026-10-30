Implemented and pushed commit `bcfd4a2`.

- Wired `list_sessions` handling to the session store.
- Returned ISO-formatted session summaries.
- Added authenticated-user forwarding and error handling.
- Resolved all reported lint findings.
- Scoped tests pass: 2 suites, 7 tests.
- Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"conversation list frames were validated but ignored because the session store was not wired into the WebSocket message handler"}}