Committed and pushed `207bc52` (`Test schema rejection retry loop`). The branch is synced with its upstream and `main`.

The new orchestrator retry test passed on its first run against the existing implementation, so it never went red. I also fixed the three CI findings from the brief, refreshed affected spec links, and updated the DoD. I did not run acceptance tests, lint, or typecheck.

Red tests authored: 0. Regressions: 0. Next facet: remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"orchestrator tool-loop rejection and corrected retry test","tdd_next":"remaining unit tests and documentation updates"}}