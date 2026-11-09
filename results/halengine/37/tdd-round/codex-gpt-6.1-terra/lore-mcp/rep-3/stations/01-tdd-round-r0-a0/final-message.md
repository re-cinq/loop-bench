Committed and pushed `5b3ea2a`. Static tool schemas now compile at registration, and invalid schemas throw an error naming the tool. The branch is up to date with `origin/main` and its upstream.

The focused test passed. It was the only test run: **1 red test was mine; 0 regressions were reported**. CI had no prior verdict available for this branch.

The repository’s test-listing script did not expose spec anchors in descriptors; this round added that support. Execution-time validation and dynamic-schema caching remain open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static tool schemas at registration","tdd_next":"cache validators for function-valued tool schemas"}}