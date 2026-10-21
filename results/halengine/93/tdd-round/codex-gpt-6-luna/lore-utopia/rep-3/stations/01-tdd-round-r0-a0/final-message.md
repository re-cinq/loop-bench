Implemented and pushed commit `396ac71` (`fix(orchestrator): sum usage across rounds`). The new test failed before the change and passed afterward; the branch is up to date with its upstream and `origin/main` was already merged.

This round’s facet: sum token counts from rounds that report usage. Next: make the public usage contract explicit. The test’s spec citation is in place; this repo’s `.lore/test-commands.yml` does not expose a `spec` descriptor field.

Lore trace and CI checks were denied with HTTP 403, so prior coverage and CI status could not be verified. Red tests: one written by this round; regressions: none identified. No unrelated smells found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}