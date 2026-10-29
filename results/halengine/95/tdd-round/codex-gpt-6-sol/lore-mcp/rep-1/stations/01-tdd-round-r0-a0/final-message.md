Committed and pushed one red-green-refactor round. The new `undefined` rejection test failed before the change and passed afterward; `onError` now receives an `Error` with the original rejection as its `cause`, while the caller receives the original value.

Local result: 1 red test written this round, now green; 0 known regressions. Acceptance tests and existing `Error` tests await CI. The branch is up to date with `main` and has no unpushed commits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests remain green in CI"}}