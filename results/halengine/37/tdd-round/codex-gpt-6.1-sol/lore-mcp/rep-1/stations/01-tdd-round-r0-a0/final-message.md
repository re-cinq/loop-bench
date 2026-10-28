Committed and pushed `2fe19a7`: static registration rejects invalid schemas and names the tool.

One new test went red, then green, and passed after refactoring. No regressions reported; acceptance tests were not run. Branch is current with main and upstream. No unrelated smells noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration","tdd_next":"Retain static validators and cache dynamic schema validators"}}