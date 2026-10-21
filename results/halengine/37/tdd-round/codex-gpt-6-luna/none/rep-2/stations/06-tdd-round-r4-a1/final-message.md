Added safe rejection logging with the failing path and constraint, and fixed the two acceptance-test lint findings reported by CI. The new focused test failed before the change and passed afterward. Formatter completed; I did not run acceptance tests or other checks.

Committed and pushed `7eac78c`; the branch is up to date with `origin/main` and its upstream. One test I wrote was red during the round; I identified zero regressions. The CI brief’s wrong-type acceptance failure was not rerun locally, so CI will need to confirm its status.

The package version bump, broader test coverage, and documentation updates remain for later rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Log schema rejections with the failing field path and constraint while omitting input values","tdd_next":"Finish remaining input-validation tests and CI findings"}}