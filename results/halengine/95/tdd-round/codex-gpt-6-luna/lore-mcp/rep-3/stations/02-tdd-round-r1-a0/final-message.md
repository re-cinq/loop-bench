Added `undefined` rejection coverage and updated the spec links, changelog, and DoD. Fixed the CI-reported timestamp and assertion-count issues.

The focused `onErrorCause.test.ts` run passed (2 tests). CI reported no test failures on the previous push; this round introduced 0 red tests and 0 regressions. The branch is committed and pushed as `e10d807`, and is up to date with `origin/main`.

No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm existing Error-instance behavior, document the change, and cover undefined rejection","tdd_next":"acceptance green"}}