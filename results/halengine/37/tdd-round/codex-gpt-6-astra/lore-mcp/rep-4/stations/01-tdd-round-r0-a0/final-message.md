Committed and pushed `aa2253c`: invalid static schemas now fail registration with the tool name.

One new test failed, then passed after implementation and refactor. No regressions observed; acceptance tests remain CI’s responsibility. Branch is clean and current with main.

Unrelated finding: npm reported dependency vulnerabilities; left unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with the tool name","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}