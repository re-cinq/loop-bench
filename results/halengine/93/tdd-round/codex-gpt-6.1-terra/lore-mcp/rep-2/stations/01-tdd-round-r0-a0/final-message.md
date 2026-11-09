The hook now sums usage across provider calls, preserving `undefined` when no call reports usage. The focused test passed after first failing on the previous behavior. The change was committed and pushed; the branch is up to date with its upstream and `origin/main`.

The local red phase had one red test written in this round and zero identified regressions. Lore could not find a CI verdict for the branch. The public type contract and changelog remain for later rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field across reported provider rounds","tdd_next":"Make the public hook usage type explicitly describe the turn total"}}