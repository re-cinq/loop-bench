Moved `beforeSession` into the orchestrator’s error-handling path and documented the cleanup behavior and consumer-facing change. The focused test failed before the fix and passed afterward.

Committed and pushed as `3a6e740`; the branch is up to date with `origin/main` and its upstream. Lore could not retrieve the previous CI verdict, so the number of prior regressions is unknown. This round’s test produced one expected red test and no observed regressions.

The existing non-`Error` rejection gate and tool-round usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle beforeSession errors through onError and afterSession","tdd_next":"acceptance green"}}