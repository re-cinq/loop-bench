Committed and pushed `f367526`. Invalid static schemas now fail at registration with the tool name.

One new test went red, then green after implementation and refactoring. No regressions reported; acceptance tests left to CI. Branch is current with main and upstream.

Next: retain validators and validate execution input. Unrelated smells: none noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with the tool name","tdd_next":"Retain compiled validators and validate execution input"}}