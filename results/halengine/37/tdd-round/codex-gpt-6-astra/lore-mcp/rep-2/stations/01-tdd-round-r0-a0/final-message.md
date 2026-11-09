Committed and pushed `5e04915`: invalid static schemas now fail registration with the tool name.

One new test went red, then green; final run passed. No regressions observed; acceptance tests were not run. CI lookup returned “branch not found.” Branch is clean, synchronized, and current with main.

No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with the tool name","tdd_next":"Validate required input before invoking the executor"}}