Committed and pushed `1d557cf`. The new test failed before the fix and passed after it; no acceptance tests or other suites were run locally. Red tests: 1 written this round, 0 regressions. The branch is current with `main` and its upstream; CI will judge the acceptance test.

The out-of-scope `onError` type gate and tool-round usage accounting remain untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run onError and afterSession when beforeSession throws, with the spec and consumer note updated","tdd_next":"acceptance green"}}