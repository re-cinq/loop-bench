Committed and pushed `aa29c3c`. Static schemas now compile at registration, rejecting invalid schemas with the tool name.

One new test went red, then green. No regressions reported; acceptance tests were not run. Branch is synchronized with `main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static input schemas at registration","tdd_next":"Validate execute input and return safe rejection ToolResponses"}}