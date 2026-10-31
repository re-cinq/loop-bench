Implemented and pushed `be3b9c2`.

- Added strict `list_sessions` validation and its focused regression test.
- Wired session-store list handling through the WebSocket non-turn path.
- Addressed prior CI lint duplication via shared test helpers.
- Updated traceability, changelog, and DoD facets.
- Ran only `conversationListValidation.test.ts`: passed (3 tests).
- Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate and handle list_sessions frames over the WebSocket","tdd_next":"Document list_sessions and session_list in the WebSocket protocol spec"}}