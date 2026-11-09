Committed and pushed static schema compilation at registration. Invalid static schemas now throw an error naming the tool; the compiled validator is retained for later execution validation.

The new test failed before the change and passed afterward. That was **1 red test from this round and 0 known regressions**; Lore had no CI record for the branch. The branch is up to date with `origin/main` and its upstream.

Dynamic schema caching, input rejection, and the remaining documentation and tests are still open. No unrelated issues were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Validate input during execution and cache dynamic schema validators"}}