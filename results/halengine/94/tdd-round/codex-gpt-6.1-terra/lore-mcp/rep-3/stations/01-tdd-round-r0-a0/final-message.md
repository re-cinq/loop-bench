Moved `beforeSession` into the orchestrator’s error-handling block and documented what cleanup can assume after it throws. The focused test passed after first failing as expected: **1 red test was mine, 0 were regressions**. CI’s prior verdict was green.

Committed and pushed as `34d557e`; the branch is up to date with `origin/main` and its upstream. The remaining facet is the consumer-facing CHANGELOG entry.

The existing non-`Error` handling gate and tool-round usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle beforeSession failures and document cleanup guarantee","tdd_next":"Document the consumer-facing change in the CHANGELOG"}}