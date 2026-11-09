Committed and pushed `8fa6d30`; branch is current with `main` and upstream.

One round completed: the new test failed, then passed after moving `beforeSession` inside `try`. Updated the spec, changelog, traceability, and facet checklist. Acceptance tests remain for CI.

Red tests: 1 mine; 0 observed regressions. Existing non-Error handling and usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run error handling and cleanup after beforeSession throws","tdd_next":"acceptance green"}}