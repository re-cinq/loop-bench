Committed and pushed one red-green-refactor round (`f88e7ae`). A new focused test first failed because the hook received only the final call’s usage; it now passes with summed usage. The hook’s public type, spec, and changelog describe the total.

The branch is synced with its upstream. This round had **1 red test of mine and 0 known regressions**; CI has not yet reported on the push. The next facet is missing-usage behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}