Implemented and pushed provider usage aggregation for the turn. The new focused test passed after first failing on the previous last-call behavior. It accounted for one red test written this round and no known regressions; Lore could not retrieve a prior CI verdict.

The public usage type still needs to make the total explicit. No unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields across provider calls","tdd_next":"Make the public usage type explicitly identify the turn total"}}