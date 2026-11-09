Committed and pushed `55bde15`: invalid static schemas now fail registration with a tool-named error.

One new test went red → green and passed after refactor review. Regressions observed: 0; prior CI verdict unavailable. Acceptance tests were not run. Branch is synchronized with origin and main.

No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration; add Ajv and MINOR version bump","tdd_next":"Retain compiled validators and validate execute-time input"}}