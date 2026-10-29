Committed and pushed one round. The new rejection-log test failed as expected, then passed after the log began recording the field path and expected type. I also repaired all eight findings in the prior CI brief and updated the affected spec links. The branch is up to date with `main` and its upstream.

Red tests: 1 mine, now green; 0 regressions. The remaining unit tests and documentation are the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Log the failing field path and expected type without logging the rejected value","tdd_next":"Add remaining unit tests and update tool documentation"}}