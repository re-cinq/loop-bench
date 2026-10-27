Implemented and pushed `ec57ece`.

- Threaded `sessionStore` into the WebSocket handler.
- Added `list_sessions` dispatch with ISO date serialization and error logging.
- Fixed validation nullability failure.
- Updated changelog, spec traceability, and DoD.
- Focused test: 55 passed.
- No acceptance, lint, or typecheck runs performed.

Red tests: 0 yours, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into createMessageHandler and dispatch list_sessions","tdd_next":"document list_sessions and session_list in both specs"}}