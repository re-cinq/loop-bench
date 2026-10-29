Committed and pushed `8668362` for the dynamic-schema caching facet. The focused test file passes after refactoring (2 tests). No tests I wrote remain red, and the prior CI brief reported 0 regressions. Acceptance tests were left to CI.

Next round: complete validation coverage and the remaining documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"cache validators for function-valued schemas by schema object reference","tdd_next":"validate rejected input and cover the remaining registry behavior"}}