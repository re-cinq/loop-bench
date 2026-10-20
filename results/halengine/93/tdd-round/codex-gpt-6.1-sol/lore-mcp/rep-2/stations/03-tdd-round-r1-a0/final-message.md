Committed and pushed `792c10e`. Usage now accumulates across provider rounds. One new test went red, then green after implementation and refactoring; zero regressions identified. Both CI lint findings were repaired.

Branch is current with main and fully pushed. Next: make the public usage contract explicit. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire accumulateUsage into the round loop and pass its total to afterModelResponse","tdd_next":"Make the public total-usage contract explicit"}}