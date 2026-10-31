Added `undefined` rejection coverage, reanchored affected spec links, and pushed `354d2f2`.

Focused test passed. No acceptance tests, lint, typecheck, or build were run. CI red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify an undefined rejection calls onError with an Error whose cause remains undefined, while the caller receives that original value","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}