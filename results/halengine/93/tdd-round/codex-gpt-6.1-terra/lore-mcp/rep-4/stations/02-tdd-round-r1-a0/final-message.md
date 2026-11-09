Repaired the CI finding by linking the missing-usage acceptance test from the hooks spec. Commit `59340b6` was pushed, the branch is current with `origin/main`, and it is not ahead of its upstream.

The attempted public-type test passed before the type existed because Jest transpiles without type-checking. I removed that ineffective test; the required red-green-refactor round remains incomplete. The public total-usage contract is the next facet.

Red tests: 0 mine, 0 regressions. The previous CI failure was a missing spec citation, not a test failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair missing acceptance-test spec citation","tdd_next":"Make the public usage type explicitly identify the turn total"}}