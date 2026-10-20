Committed and pushed `f960e88`. Usage now accumulates across rounds while preserving missing-usage behavior.

One new test failed, then passed after implementation and refactor; no regressions were reported. Acceptance tests remain CI’s responsibility. Formatting completed; branch is synchronized with origin and main.

Next: make aggregation explicit in the public hook type. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire usage accumulation into the round loop while preserving undefined usage","tdd_next":"Make aggregate usage explicit in the public hook type"}}