Implemented and pushed commit `9f55d62`.

- Added session-list dispatch, serialization, error handling, and server wiring.
- Fixed validation type errors and prior lint/changelog/spec citation findings.
- Added and ran one focused test: passed.
- Red tests this round: 1; regressions: 0.
- Branch is synchronized with upstream.

Next facet: document the protocol behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into the handler/server and dispatch list_sessions responses","tdd_next":"document list_sessions and session_list in the protocol specs"}}