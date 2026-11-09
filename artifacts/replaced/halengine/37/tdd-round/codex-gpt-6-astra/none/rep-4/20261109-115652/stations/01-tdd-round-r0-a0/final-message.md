Committed and pushed `e7a6d4d`: invalid static schemas now fail registration naming the tool.

One new test went red → green. No regressions observed; CI and graph tools were unavailable. Acceptance tests were not run. Base is current; working tree is clean. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration","tdd_next":"Validate input before execution and return schema rejection ToolResponses"}}