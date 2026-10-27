Moved `beforeSession` inside the orchestrator’s `try` block and updated the spec. The focused test was red before the change and green after it. The implementation and spec facets are closed; the CHANGELOG facet remains for the next round.

Committed and pushed as `7b8656f`. The branch is up to date with its upstream and `origin/main`. Red tests: 1 written this round; 0 regressions. The CI lookup returned 404 for this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block and document its failure guarantee","tdd_next":"Document in the CHANGELOG what changes for an existing consumer"}}