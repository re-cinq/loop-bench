Committed and pushed `26e4004`; branch is current with `main` and upstream.

One red-green-refactor round completed: static tools reject invalid input before execution. The new test went red, then both tests in its file passed: 1 new red, 0 regressions locally. Reported CI findings were repaired; acceptance tests remain for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static tool input before execution","tdd_next":"Validate and cache function-valued tool schemas"}}