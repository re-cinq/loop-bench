Committed and pushed `6725f5d`: invalid static schemas now fail registration with the tool name. Added Ajv and bumped to `0.4.0`.

One new test went red, then passed after implementation and refactoring. No regressions reported; acceptance tests were not run. Branch is synchronized with upstream and main.

Next: validator caching and runtime validation. No unrelated smells noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static input schemas at registration","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}