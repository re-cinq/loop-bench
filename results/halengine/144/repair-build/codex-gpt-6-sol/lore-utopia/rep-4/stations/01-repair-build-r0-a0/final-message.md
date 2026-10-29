I fixed the WebSocket list handler, its opt-in and error responses, and the reported lint findings. I also corrected a test expectation: the ticket requires `UNSUPPORTED` when a store has no `listFor`, rather than an empty list.

All 32 tests in the three affected suites pass locally. Their scoped coverage run cannot meet the repository-wide coverage floor; CI will judge the full suite. Commit `5265bf2` is pushed, the branch is up to date with `origin/main`, and it is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Conversation list requests had no handler; reported test and lint failures were fixed"}}