Implemented and pushed commit `6a1af65`.

- Added WebSocket conversation-list handling with authenticated user scoping.
- Fixed all reported lint findings through shared test helpers and flatter control flow.
- Scoped tests passed: 32 tests across conversation-list, validation, and resume suites.
- Formatted changed files; branch is clean, current with `main`, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"conversation-list frames were validated but never handled, and new tests duplicated socket helpers"} }