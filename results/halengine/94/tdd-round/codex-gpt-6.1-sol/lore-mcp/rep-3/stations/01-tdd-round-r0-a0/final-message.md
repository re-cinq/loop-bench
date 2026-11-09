Committed and pushed `3a9cf43`; branch matches upstream and is current with `main`.

One test failed as expected, then passed after the fix and formatting. Updated the cleanup contract, changelog, and facet checklist. Acceptance tests were left to CI; CI status was unavailable.

Red tests: 1 new, 0 observed regressions. Deferred: non-`Error` rejections still bypass `onError`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Clean up failed beforeSession through the existing catch/finally path","tdd_next":"acceptance green"}}