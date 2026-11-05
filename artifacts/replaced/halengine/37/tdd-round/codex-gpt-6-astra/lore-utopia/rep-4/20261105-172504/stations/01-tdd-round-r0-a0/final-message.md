Committed and pushed `6a53d7c`: invalid static schemas now fail registration with the tool name.

One test went red, then green after implementation and refactoring. No regressions reported; acceptance tests remain CI’s responsibility. Branch is clean, pushed, and current with `main`.

Next: retain validators and validate execution input. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with the tool name","tdd_next":"Retain compiled validators and reject invalid execution input"}}