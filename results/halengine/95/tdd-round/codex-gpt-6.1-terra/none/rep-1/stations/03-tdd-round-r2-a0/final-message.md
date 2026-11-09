Fixed the three lint findings reported by CI and pushed commit `74e444f`. The changelog check had timed out after confirming the entry was updated, so its result remains for CI to determine.

No tests ran locally: this visit repaired CI findings without writing a new test. The previous CI verdict reported **0 red tests and 0 test regressions**; it reported three lint errors. The branch is up to date with both `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI lint findings in rejection normalization","tdd_next":"Confirm existing Error-instance behavior and acceptance tests"}}