All facets in dod.md are already ticked. This round fixed the lint failures from the previous push. 0 regressions caused — the lint errors were introduced by the previous round's code, not by tests I wrote. All changes were deduplication and spec link corrections.

**Summary of unrelated smells noticed but not acted on:** None.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed all 7 eslint errors: deduplicated scriptedProvider via orchestratorTestSupport.ts, eliminated acceptance test internal duplicates via runScriptedOrchestrator helper, added spec statement for accumulateUsage test","tdd_next":"acceptance green"}}