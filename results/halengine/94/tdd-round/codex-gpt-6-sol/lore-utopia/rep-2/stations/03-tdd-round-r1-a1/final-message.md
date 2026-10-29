Committed and pushed the test repairs in `1192afc`. The focused Jest test passed; the acceptance test was not run locally. CI’s red tests were 2 of ours and 0 regressions. CI will judge the push.

The out-of-scope `instanceof Error` gate and tool-round usage accounting remain untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI's typecheck and assertion-limit findings in the hook tests","tdd_next":"acceptance green"}}