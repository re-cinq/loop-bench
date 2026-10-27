Implemented and pushed one TDD round:

- Added WebSocket `list_sessions` handling with authenticated user scoping.
- Added ISO date serialization and `session_list` frames.
- Threaded `sessionStore` through server setup.
- Added focused regression test; red first, green after implementation.
- Updated DoD, spec traceability, and changelog.
- Commit: `826fc45`
- Branch is pushed and synchronized with `origin/main`.

No acceptance or full-suite tests were run. 1 intentional red test, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread and dispatch list_sessions over WebSocket","tdd_next":"Document protocol frames and pass acceptance CI"}}