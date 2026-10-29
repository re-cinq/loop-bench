Committed and pushed `8cdc01e`. Moving `beforeSession` inside the `try` lets its failure reach `onError` and `afterSession`; the spec and changelog now describe the cleanup path.

This round’s test went red, then green, and stayed green after refactor. Red tests written this round: **1**. Regressions reported: **0**. The acceptance test was not run locally; CI will judge it. The existing `onError` type gate and tool-round usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try; update spec and changelog","tdd_next":"acceptance green"}}