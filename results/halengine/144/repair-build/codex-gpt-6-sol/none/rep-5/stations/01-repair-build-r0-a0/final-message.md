Fixed the WebSocket list handler and the reported lint findings. I also corrected the test that expected an empty list when `listFor` is unavailable; the ticket requires `UNSUPPORTED`.

The affected tests pass locally (33/33). The full CI run is pending. Commit `ae1ccc5` is pushed, and the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"WebSocket list requests had no handler; duplicated test helpers and a flagged assertion caused lint failures"}}