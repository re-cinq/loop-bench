Committed and pushed `1484864`. Usage now accumulates across provider rounds.

One new test failed as expected, then passed after implementation and refactor. Regressions observed: 0. Repaired CI’s lint and changelog findings. Acceptance tests remain for CI.

Next: explicit public total-usage contract and MINOR bump. No unrelated smells identified. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire the accumulator into the provider round loop and pass its total to the hook","tdd_next":"Explicit public total-usage contract and MINOR version bump"}}