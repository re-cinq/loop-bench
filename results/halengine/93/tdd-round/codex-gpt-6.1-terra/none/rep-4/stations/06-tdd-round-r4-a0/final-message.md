Fixed the reported CI findings by sharing usage-test setup, removing the `else` branch, and correcting the spec citations. Committed and pushed as `dd6f204`; the branch is up to date with `origin/main` and its upstream.

No tests were run locally: this round repaired the CI findings without adding a test, and the requested test restriction permits running only a test written this round. The previous CI verdict reported **0 red tests written by this branch and 0 test regressions**; its failures were ESLint and spec-link checks. The next facet is the explicit public total-usage contract.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI findings in usage test setup and spec citations","tdd_next":"Make the public hook type explicitly describe total usage"}}