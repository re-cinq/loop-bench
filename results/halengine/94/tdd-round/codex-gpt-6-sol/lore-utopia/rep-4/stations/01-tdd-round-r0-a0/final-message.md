Committed and pushed the round. Moving `beforeSession` into `try` makes a setup error reach `onError` and `afterSession`; the spec and changelog now describe the cleanup behavior. The one test I wrote failed before the change and passed afterward. The branch is up to date with `main` and its upstream.

Red tests in this round: 1 mine, 0 regressions. CI has not yet judged the acceptance test. The existing `onError` error-type gate and tool-round usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try and document failure-hook behavior","tdd_next":"acceptance green"}}