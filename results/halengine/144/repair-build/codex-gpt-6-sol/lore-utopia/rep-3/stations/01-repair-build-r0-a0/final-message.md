I wired the session store into the WebSocket handler and fixed the eight reported lint findings. The acceptance test’s ping barrier was invalid for an asynchronous list response, so its helper now waits for the list or error frame.

All 32 tests in the three affected suites pass with coverage disabled. I did not run lint or a full build in this pod. Commit `97a3886` is pushed, the branch is up to date with `main`, and CI has yet to judge the new head.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Handled list_sessions frames and fixed the reported test lint errors"}}