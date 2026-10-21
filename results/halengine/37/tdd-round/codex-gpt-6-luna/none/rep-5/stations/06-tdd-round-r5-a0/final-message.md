Added enum rejection messages that name the allowed values, and cleaned up the reported lint issues in `registry.test.ts`. The new enum test failed before the implementation change and passed afterward; I reran only that test after formatting.

Pushed commit `88571d3`; the branch is up to date with `origin/main` and not ahead of its upstream. The previous CI verdict still reports one existing acceptance test failing; its diff is truncated in the round brief, so I couldn’t identify the mismatch without running a prohibited acceptance test.

Red tests this round: 1 written test during the red phase, now green. Existing CI failures: 1 acceptance test. Next: remaining unit and orchestrator coverage, documentation, and changelog updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Enum rejection names allowed values without invoking the executor","tdd_next":"Remaining unit and orchestrator tests, documentation, and changelog work"}}