**Delivered** commit `c1ebecc` and pushed it to `loop-bench/93`. `origin/main` was already merged, and the branch is clean and even with its upstream.

The hook now exposes `TotalUsageMetadata`, documented as usage summed across provider calls for the turn. I updated the spec and changelog, and fixed the spec link CI flagged. The focused test passed; I ran no acceptance tests, lint, or typecheck. The new test doesn’t prove the type distinction at runtime because Jest transpiles it without typechecking.

Red tests: 0 of mine, 0 regressions identified. The previous CI findings were lint and changelog findings, and I addressed both.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"Preserve the unchanged no-tool regression guard"}}