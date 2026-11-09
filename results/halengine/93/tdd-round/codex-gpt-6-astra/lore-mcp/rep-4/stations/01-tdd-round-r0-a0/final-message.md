Committed and pushed `3e396b6`: pure usage accumulation with missing-report handling.

One new test went red, then green; zero regressions observed. Acceptance tests were not run. Branch is current with main and fully pushed.

Next: wire the accumulator into the orchestrator. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields while preserving undefined for absent usage","tdd_next":"Wire sumTurnUsage into the orchestrator round loop"}}