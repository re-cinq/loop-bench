Committed and pushed `6b0c8e8`. The hook now sums token fields across reported provider rounds and leaves usage undefined when none is reported.

The new test failed on the previous final-round-only behavior, then passed after the change: **1 red test was mine; 0 known regressions**. CI’s prior verdict was unavailable because Lore could not find the branch. The branch is up to date with `origin/main` and its upstream.

The public type still does not make the total-usage contract explicit; that is the next facet. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum token usage across reported provider rounds","tdd_next":"Make the public total-usage contract explicit"}}