Moved `beforeSession` inside the orchestrator’s `try`, added a focused test, and updated the spec guarantee. The test failed before the code change and passed after it. Formatted the changed TypeScript files, committed, pushed, and confirmed the branch is up to date.

The CI verdict was unavailable because Lore denied access. Red tests: 1 written by me; regressions: none reported (CI status unknown). The remaining DoD facet is the changelog note.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"beforeSession failures now reach onError and afterSession; updated the spec guarantee","tdd_next":"Document the consumer-visible change in CHANGELOG.md"}}