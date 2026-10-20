Committed and pushed `4febf2e`; branch is current with main and upstream.

Completed one red-green-refactor round: wired turn-wide usage accumulation. The new test passed after refactoring. Fixed both reported lint findings; acceptance tests remain CI’s responsibility.

Red tests this round: 1 mine, 0 observed regressions. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire accumulateUsage into the orchestrator round loop","tdd_next":"Expose an explicit total-usage public contract and record the API decision and MINOR release plan"}}