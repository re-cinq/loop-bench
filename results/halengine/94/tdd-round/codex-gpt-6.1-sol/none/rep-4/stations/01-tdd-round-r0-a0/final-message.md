Committed and pushed `150440a`; branch is current with `main`.

Moved `beforeSession` inside `try`, documented cleanup after partial initialization, and updated the changelog and facets.

One new test failed as expected, then passed after the fix and formatting. Red tests: 1 mine; 0 observed regressions. Acceptance tests remain CI’s responsibility.

Unchanged concerns: non-Error rejection handling and usage accounting. Lore graph tools were unavailable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle beforeSession failures through the existing error and cleanup path","tdd_next":"acceptance green"}}