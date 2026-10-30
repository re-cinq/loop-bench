Committed and pushed one round. The new test failed before the fix and passed afterward; it verifies that `onError` receives an `Error` with an `undefined` cause while the caller receives the original rejection. The spec, changelog, and DoD are updated. The branch is current with `main` and has no unpushed commits.

Red tests observed: **1 mine, 0 regressions**. The next facet is CI confirmation that the existing `Error` instance tests remain green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections so onError always fires","tdd_next":"Confirm existing Error-instance tests remain green in CI"}}