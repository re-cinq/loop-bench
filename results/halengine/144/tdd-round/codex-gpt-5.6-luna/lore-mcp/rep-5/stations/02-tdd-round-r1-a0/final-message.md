Implemented and pushed commit `a2dba53`.

- Threaded `sessionStore` into WebSocket message handling.
- Added `list_sessions` dispatch with ISO date serialization and error logging.
- Fixed CI-reported type, lint, traceability, and changelog issues.
- Updated DoD facets.
- Focused test: 1 passed.
- Red tests: 1 authored, 0 regressions.
- Branch is up to date with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sessionStore threading and list_sessions dispatch","tdd_next":"document list_sessions and session_list in the WebSocket and conversation-list specs"}}