Committed and pushed `05dcca6`. The hook now exposes a named turn-total usage type, and aggregation preserves counts when a provider reuses its usage object. The reported CI lint and changelog findings were also addressed.

The new focused test passed after the fix. Its red run had **1 test written this round and 0 regressions**; acceptance tests remain for CI. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the public hook usage type explicitly describe the turn total","tdd_next":"Preserve the unchanged no-tool regression guard"}}