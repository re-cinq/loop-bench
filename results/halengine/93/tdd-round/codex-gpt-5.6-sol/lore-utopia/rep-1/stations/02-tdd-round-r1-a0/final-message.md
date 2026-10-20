Implemented and pushed commit `5857339`.

- Added public `TotalUsageMetadata` whole-turn contract and `TOTAL_USAGE_SCOPE`.
- Fixed prior CI findings: duplicate test setup, missing spec link, and changelog entry.
- Focused test passed; acceptance tests were not run.
- Red tests: 1 new test, 0 regressions.
- Branch is synchronized with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Preserve the unchanged no-tool regression guard, receives collected response text and usage."}}