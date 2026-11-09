Fixed the two CI lint findings in the descriptor test by calling the real module directly and using one assertion. The targeted Jest test passed.

Committed and pushed `fded0d5`; the branch is up to date with `origin/main` and its upstream. The prior CI test log was truncated, and the CI API could not retrieve the full failure details. The next CI run must establish the acceptance status.

The prior verdict identified one red test from this ticket and no identified regressions. No unrelated issues were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair descriptor test lint findings","tdd_next":"Make the public hook usage type explicitly identify the turn total"}}