Implemented and pushed one red-green-refactor round.

- Threaded `sessionStore` into WebSocket handling.
- Added `list_sessions` dispatch with authenticated user, ISO summaries, errors, and logging.
- Fixed validator typecheck failure.
- Updated DoD, spec anchors, changelog, and CI lint findings.
- Focused test passed: 1 test, 54 skipped.
- No acceptance suite, lint, or typecheck run.

Commit: `55a779a`

Red tests: 1 yours, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore and dispatch list_sessions","tdd_next":"document list_sessions and session_list in the protocol specs"}}