Committed and pushed `e22fff4` (`Name aggregated turn usage contract`). The branch is up to date with `origin/main`, and the working tree is clean.

The new aggregate contract test passed. The initial Jest run did not execute tests because it lacked the ESM flag; the corrected run passed. Jest did not report an initial red test for the type-only change. Red tests: **0 written, 0 regressions**. I also repaired the two CI findings by linking the missing-usage case to the spec and adding a changelog entry.

Facet closed: explicit public total-usage type. Next: preserve the no-tool regression guard, then finish the spec and changelog facet. No unrelated smells found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"Preserve the unchanged no-tool regression guard, then acceptance green"}}