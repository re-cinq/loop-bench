Committed and pushed dynamic schema compilation and caching, along with fixes for the reported AJV import and acceptance-test lint findings. The branch is up to date with `origin/main` and its upstream.

The focused registry test passed: **2 tests passed**. The red phase had **1 test written this round and 0 identified regressions**. The previous CI log also showed a Vertex provider test failure, but its excerpt did not include the error message; it remains unresolved.

The next facet is to use the cached validators to reject invalid input before calling the executor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Store static validators and cache dynamic schema compilation","tdd_next":"Validate input with cached validators and return rejection responses"}}