Committed and pushed `7a2024b`. Invalid static schemas now fail at registration with the tool name.

One new test went red, then green; no regressions observed. Acceptance tests remain for CI. Branch is current with `main` and fully pushed.

Next: validator reuse and dynamic schema caching. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration naming the tool","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}