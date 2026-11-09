Committed and pushed `b1261bd`: invalid static schemas now fail registration with the tool name.

One new test went red, then green; it passes after refactor. No regressions observed; acceptance tests were not run. No unrelated smells identified. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with the tool name","tdd_next":"Reuse compiled validators to reject malformed tool input before execution"}}