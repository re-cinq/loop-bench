Committed and pushed `3e10da5`. The orchestrator now accumulates usage across provider rounds. Fixed all four reported lint findings.

One new test went red, then green after implementation and refactoring. No regressions identified; acceptance tests were left to CI. Branch is current with main and fully pushed.

Next: make the public aggregate-usage contract explicit. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire the tested turn-usage accumulator into the orchestrator round loop","tdd_next":"Make the public total-usage contract explicit"}}