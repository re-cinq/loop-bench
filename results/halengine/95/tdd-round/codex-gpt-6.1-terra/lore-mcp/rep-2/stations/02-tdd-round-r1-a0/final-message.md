Committed and pushed `c2e0c55`. The test descriptor now exposes a single stamped spec anchor, and the CI-reported timestamp fixture is deterministic.

The focused test passed after first failing as expected: **1 red test was mine; 0 were regressions**. CI will confirm the lint fix and existing Error-instance tests. The branch is up to date with `origin/main` and its upstream.

A remaining limitation is associating individual tests with their own anchors when a file contains multiple stamps; it is recorded as the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Expose a single stamped spec anchor in test descriptors and fix the CI-reported timestamp","tdd_next":"Associate individual tests with their own anchors when a test file contains multiple spec stamps"}}