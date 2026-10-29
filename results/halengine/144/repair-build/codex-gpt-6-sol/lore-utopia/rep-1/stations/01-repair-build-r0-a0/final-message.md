I added the missing authenticated list handler, its history opt-in, and the lint fixes. The test’s empty-list expectation was wrong: the ticket requires `UNSUPPORTED` when the store cannot list conversations, so I corrected it.

The three affected suites pass locally (33 tests). Full CI remains the judge. Commit `351302b` is pushed, merged with current `main`, and the working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added the missing conversation-list handler and corrected the reported lint and test failures"}}