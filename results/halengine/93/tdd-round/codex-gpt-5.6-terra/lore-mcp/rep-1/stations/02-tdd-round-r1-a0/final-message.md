Implemented and pushed `6861860` (`feat(orchestrator): name turn usage totals`).

- Added public `TurnUsageMetadata` for the aggregate hook contract.
- Updated docs, changelog, spec anchors, and CI-reported duplicate test setup.
- Targeted tool-round unit test passed via the repo test wrapper.
- Red tests: 0; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit; update the hooks spec and CHANGELOG","tdd_next":"Preserve the unchanged no-tool regression guard"}}