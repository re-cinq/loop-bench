Committed and pushed `831c099` (`Expose explicit total usage hook type`). The branch is up to date with `origin/main` and not ahead of its upstream.

The new focused test passes. It also passed before the implementation because Jest strips types without checking them, so this type-only change did not produce an observable red phase with the permitted runner. No test failures or regressions were reported; the prior CI brief listed ESLint, spec-names, and changelog failures. Lore could not retrieve a fresh verdict for this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit; update usage docs and changelog","tdd_next":"acceptance green"}}