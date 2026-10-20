Committed and pushed `87855d6`. Added independent token-field summation, a linked spec statement, and spec stamps in test descriptors.

One new test went red, then passed after implementation and refactor review. No regressions observed; acceptance tests were not run. Branch is current with main and fully pushed.

Next: integrate summation into the round loop and preserve missing-usage behavior. No unrelated improvements identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each provider-reported token field independently","tdd_next":"Wire summation into the round loop while preserving undefined usage"}}