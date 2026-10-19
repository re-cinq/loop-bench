Implemented and pushed one TDD round:

- Added a failing behavioral test for usage accumulation.
- Added pure field-wise accumulation across provider rounds.
- Updated spec traceability and checked the completed DoD facet.
- New test passes; acceptance tests were not run.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with upstream and `origin/main`.

Next facet: clarify in the hook’s public signature that usage is the turn total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate per-round usage into a running turn total and pass it to afterModelResponse","tdd_next":"Make the hook signature say usage is a turn total, with no any"}}