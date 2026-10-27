Committed and pushed `f980e83`; the branch is even with `origin/loop-bench/95`.

The new Error-identity test passed. I fixed the typecheck and two lint findings in `onErrorUndefined.test.ts`, updated the spec trace, changelog, and checklist. I did not run acceptance tests. CI’s remaining lint finding is in the acceptance test; I left that file unchanged as required. Red tests written this round: 0; regressions confirmed: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm onError passes through an existing Error instance unchanged","tdd_next":"acceptance green"}}