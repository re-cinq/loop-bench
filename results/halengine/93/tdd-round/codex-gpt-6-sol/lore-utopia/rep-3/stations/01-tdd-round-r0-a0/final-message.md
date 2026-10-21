Committed and pushed the round. The new test first failed because the hook reported only the last provider call, then passed after the hook began summing usage across three calls. The public hook type now names that value `TurnTotalUsage`; the spec, changelog, and facet checklist are updated.

One red test was mine; zero regressions were reported. I ran only the new test file. CI will judge the acceptance tests. The next facet is missing usage on some or all rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}