Committed and pushed `e8a2591`; the branch is current with `main` and its upstream.

The new usage-gap test failed against the original final-round behavior and passed with aggregation. I fixed the three findings in the previous CI report: the empty interface, missing spec links, and changelog entry. I ran only the new test; CI will judge the acceptance tests. Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"acceptance green"}}