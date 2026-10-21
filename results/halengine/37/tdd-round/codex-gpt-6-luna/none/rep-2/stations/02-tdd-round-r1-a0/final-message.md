Delivered one round for **expected types in wrong-type rejection messages**, without echoing the supplied value. The focused test was red, then passed after the change. One test failure was ours; no regressions were observed in the test run.

Committed and pushed as `f8f37f3`; the branch is clean and up to date with its upstream. The previous CI verdict also reported ESLint findings in the acceptance test, which I left unchanged, and an unrelated provider test failure. I did not run acceptance tests or other CI checks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Include the expected JSON Schema type in wrong-type rejection messages without echoing the offending input value.","tdd_next":"Bump the package version MINOR."}}