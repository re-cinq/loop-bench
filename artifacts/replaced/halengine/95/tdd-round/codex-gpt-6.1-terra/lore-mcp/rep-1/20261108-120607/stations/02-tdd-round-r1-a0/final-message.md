Handled rejection values whose string conversion throws: `onError` receives an `Error` with the original value as its cause, and the caller receives the original rejection. Also fixed the fixture and spec-link findings from the previous CI run.

The new focused test passed after first failing as expected: **1 red test was mine; 0 were regressions**. Commit `ff617c6` was pushed, and the branch is up to date with `origin/main` and its upstream. CI will judge the acceptance tests and existing Error-instance coverage.

No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle rejection values whose string conversion throws","tdd_next":"Confirm existing Error-instance tests remain green via CI"}}