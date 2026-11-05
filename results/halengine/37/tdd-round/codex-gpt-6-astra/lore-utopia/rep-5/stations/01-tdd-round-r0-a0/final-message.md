Committed and pushed `98129bd`. Invalid static schemas now fail registration with the tool name.

One new test: red, then green after refactor. No regressions observed; prior CI verdict unavailable. Acceptance tests were not run. Branch is current with main and fully pushed.

Unrelated smells: none identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration","tdd_next":"Validate execute input and return a rejection ToolResponse"}}