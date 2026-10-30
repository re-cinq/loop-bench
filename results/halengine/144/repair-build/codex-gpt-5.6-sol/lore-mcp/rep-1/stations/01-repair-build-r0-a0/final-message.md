Implemented and pushed commit `6adc041`.

- Added WebSocket session-list handling outside the session lock.
- Forwarded authenticated user and paging options to the store.
- Serialized dates and handled store failures.
- Resolved all reported lint findings through shared test helpers.
- Scoped tests passed: 2 suites, 7 tests.
- Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Session-list frames were validated but never handled, and tests contained reported lint violations"}}
