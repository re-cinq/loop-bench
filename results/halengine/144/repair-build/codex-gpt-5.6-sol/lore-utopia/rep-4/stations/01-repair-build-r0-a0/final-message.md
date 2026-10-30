Implemented and pushed commit `13ea8cc`.

- Added WebSocket session-list handling with authenticated user scoping, paging options, ISO dates, and error handling.
- Resolved all reported lint findings by consolidating shared test utilities and removing the flag parameter.
- Targeted tests: 32 passed across 3 suites.
- Formatted changed files and confirmed the branch is synchronized with upstream and `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"WebSocket list_sessions frames were validated but ignored; the handler now queries the session store and returns serialized session_list responses"}}
