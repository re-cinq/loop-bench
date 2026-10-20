Completed and pushed commit `f254146` (`test: cover sparse round usage`).

- Added sparse/missing usage coverage; verified red against prior behavior and green with aggregation.
- Fixed both CI traceability findings and added the required changelog entry.
- Updated the DoD facet.
- Ran only the new focused test: passed.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Preserve the unchanged no-tool regression guard in src/orchestration/chatOrchestrator.test.ts."}}