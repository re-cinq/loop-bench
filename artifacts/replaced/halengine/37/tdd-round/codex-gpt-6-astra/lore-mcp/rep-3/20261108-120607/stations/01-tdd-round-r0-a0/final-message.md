Committed and pushed `2752b68`: invalid static schemas now fail at registration with the tool name.

One new test went red → green. No regressions reported; CI was unavailable. Acceptance tests were not run. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at registration and reject invalid schemas naming the tool","tdd_next":"Retain static validators and cache dynamic validators by schema object"}}