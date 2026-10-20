Committed and pushed one red–green–refactor round. The new test first failed because the hook received only the final call’s usage; it now passes with a turn total. The public hook type names that total. One red test was mine; zero regressions were reported. Acceptance tests were left to CI.

Next facet: verify rounds with missing usage and turns with no reported usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do"}}