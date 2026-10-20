Committed and pushed one round. The new focused test first failed on last-round usage, then passed after summing usage across provider calls. The spec link and changelog are updated; the branch is current with `main` and fully pushed.

Red tests: 1 written this round, now green; 0 regressions reported. CI has not yet judged the acceptance tests. The next facet is to make the hook’s public type explicitly identify total usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field for provider rounds that report usage","tdd_next":"Make the hook's public usage type explicitly identify the aggregate total"}}