Implemented and pushed the named `TotalUsageMetadata` hook contract, updated the spec and changelog, and fixed the reported lint issues. Commit: `802f17e`. The branch is up to date with its upstream and `origin/main`.

The targeted Jest file passed. No acceptance tests, lint, or typecheck were run. The type-only test import did not fail before implementation because Jest transpiles without checking types, so this round’s test did not provide a meaningful red phase. The required lore trace command was unavailable.

This round closed **“Replace final-round retention with a deliberately named total-usage contract.”** Next: preserve the unchanged no-tool regression guard. The CI brief reported **0 regressions**; this round wrote **0 new tests**.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"Preserve the unchanged no-tool regression guard, then update hooks spec and CHANGELOG"}}