Implemented and pushed commit `ae6d919` (`fix: sum usage across provider rounds`). Usage now sums each reported round, skips missing usage, and remains `undefined` when no round reports usage. Updated the DoD and hooks spec.

The new test failed against the old behavior and passed after the change and refactor. Only that test file was run; no regressions were indicated. CI failures and trace data were unavailable because this session has no `lore_*` tools and there was no round brief. The branch is up to date with its upstream.

Next facet: give the hook’s aggregate usage contract a deliberately named public type.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}