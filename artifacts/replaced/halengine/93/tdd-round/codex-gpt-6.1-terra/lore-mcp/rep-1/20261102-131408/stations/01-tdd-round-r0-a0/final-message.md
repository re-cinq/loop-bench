Implemented and pushed the provider-round usage accumulator in commit `3cfd9c8`. The new focused test failed on the previous behavior and passed after the change. The branch is up to date with `origin/main` and its upstream.

The public aggregate-usage contract and changelog remain for a later round. Lore denied access to the prior CI verdict and coverage graph, so I could not determine the number of prior regressions. The one locally observed red test was the test written this round; no regression tests were run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum token fields across reported provider rounds","tdd_next":"Make the public hook usage contract explicitly describe the total"}}