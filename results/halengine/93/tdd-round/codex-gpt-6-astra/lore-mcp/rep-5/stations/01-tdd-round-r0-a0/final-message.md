Committed and pushed `8b14beb`: usage accumulation with missing-round handling.

One new test went red, then green after implementation and refactoring. No regressions observed; CI verdict unavailable. Acceptance tests were not run. Branch is clean and synchronized with main and upstream.

Next: wire totals into the hook’s explicit public contract. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields while preserving undefined for unreported usage","tdd_next":"Wire accumulated usage into afterModelResponse with an explicit total-usage contract"}}