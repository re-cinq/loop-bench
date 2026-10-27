Implemented and pushed commit `d1c0860`.

- Threaded `sessionStore` into WebSocket handling.
- Added authenticated `list_sessions` dispatch and ISO summary serialization.
- Updated CI-reported spec/changelog/test issues.
- Focused test passed; no lint/typecheck/full suite run.
- Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into the WebSocket message handler","tdd_next":"handle list_sessions errors and protocol response details"}}