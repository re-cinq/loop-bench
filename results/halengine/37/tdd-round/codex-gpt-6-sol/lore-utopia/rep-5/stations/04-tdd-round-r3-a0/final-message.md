Committed and pushed one red-green-refactor round (`6db7557`). The new test for an explicitly forbidden extra property failed, then passed after the rejection began naming its path. I also corrected the spec link and added a fallback for the property-path error shape reported by CI.

The single test file passed: 4 tests. I did not run the acceptance suite; CI will judge the push. This round had 1 new red test and 0 regressions. The branch is up to date with `main` and its upstream. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name explicitly forbidden extra properties in rejection paths and repair the reported CI findings","tdd_next":"Remaining unit tests, spec links, and documentation updates"}}