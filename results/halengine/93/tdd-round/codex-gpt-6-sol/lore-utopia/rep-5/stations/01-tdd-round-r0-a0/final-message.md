Committed and pushed `6479e30`. The new focused test failed on last-round usage, then passed after the hook began summing provider usage across rounds. I linked it to the spec and named the public hook argument `totalUsage`.

One red test was mine; zero regressions were reported. Acceptance and CI results remain unverified in this round. The next facet is to cover rounds with missing usage and a turn with no reported usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}